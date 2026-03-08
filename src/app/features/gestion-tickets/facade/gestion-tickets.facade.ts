import { Injectable, inject, signal, computed } from "@angular/core";
import { take, map, tap, catchError, finalize, of } from "rxjs";
import { GestionTicketsService } from "../core/services/gestion-tickets.service";
import { mapTicketDtoToModel } from "../mappers/ticket.mapper";
import { PaginationInfo } from "../models/pagination";
import { TicketFilters } from "../models/ticket-filter";
import { TicketState } from "../models/ticket.state";
import { Ticket } from "../models/ticket.model";
import { TicketDTO } from "../dtos/ticket.dto";

@Injectable()
export class GestionTicketsFacade {
  private readonly service = inject(GestionTicketsService);

  // Exponemos los signals de solo lectura del servicio
  public readonly estados = this.service.estados;
  public readonly prioridades = this.service.prioridades;

  // Objetos cacheados
  public readonly listState = signal<TicketState>({
    currentPageItems: [],
    cachedPagesItems: new Map(),
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    filters: {},
    sort: 'id',
    sortDirection: 'asc',
    mensajeError: '',
  });
  private readonly MAX_PAGES_CACHED = 4;

  public readonly detallesTicketState = signal<Ticket | undefined>(undefined);

  readonly loading = signal(false);

  public loadCatalogos(): void {
    // Disparamos la carga. El tap del servicio actualizará los signals.
    this.service.getCatalogoEstados().subscribe();
    this.service.getCatalogoPrioridades().subscribe();
  }

  public setFilters(filters: TicketFilters): void {
    this.listState.update(state => ({
      ...state,
      filters,
      currentPage: 1 // Reiniciamos a la primera página al cambiar filtros
    }));
    this.buscarTickets();
  }
  public setPagination(pagination: Partial<PaginationInfo>): void {
    this.listState.update(state => ({
      ...state,
      currentPage: pagination.currentPage?? 1,
      pageSize: pagination.pageSize?? 10
    }));
    this.buscarTickets();
  }
  public buscarTickets() {
    const state = this.listState();
    const pageNumber = state.currentPage;

    const cached = state.cachedPagesItems.get(pageNumber);

    if (cached) {
      this.listState.update((s) => ({
        ...s,
        currentPageItems: cached.items,
        cachedPagesItems: new Map(s.cachedPagesItems).set(pageNumber, {
          items: cached.items,
          lastAccess: Date.now(),
        }),
      }));
      return;
    }
    this.loading.set(true);

    this.service
      .getTickets(
        state.currentPage,
        state.pageSize,
        state.filters,
        state.sort,
        state.sortDirection.toUpperCase() as 'ASC' | 'DESC',
      )
      .pipe(
        tap((response: TicketDTO[]) => {
          this.updateCacheState(pageNumber, response);
        }),
        catchError((err) => {
          console.error('Error cargando el listado de mascotas', err);
          this.listState.update((state) => ({ ...state, err, currentPageItems: [] }));
          return of([]);
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe();
  }

  private updateCacheState(pageNumber: number, ticketsListDTO: TicketDTO[]) {
    const newMappedPage = ticketsListDTO.map(dto => mapTicketDtoToModel(dto));
    this.listState.update((s: TicketState): TicketState => {
      const newCache = new Map(s.cachedPagesItems);
      newCache.set(pageNumber, { items: newMappedPage, lastAccess: Date.now() });

      if (newCache.size > this.MAX_PAGES_CACHED) {
        let oldestKey: number | null = null;
        let oldestAccess = Infinity;
        newCache.forEach((v, k) => {
          if (v.lastAccess < oldestAccess) {
            oldestAccess = v.lastAccess;
            oldestKey = k;
          }
        });
        if (oldestKey !== null) newCache.delete(oldestKey);
      }

      return {
        ...s,
        currentPageItems: newMappedPage,
        cachedPagesItems: newCache,
      };
    });
  }
  public abrirDetalles(id: number){
    this.service.getTicketById(id).pipe(map(dto => mapTicketDtoToModel(dto)), tap(), take(1)).subscribe();
  }
}