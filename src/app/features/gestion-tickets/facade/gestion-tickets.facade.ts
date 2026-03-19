import { Injectable, computed, inject, signal } from '@angular/core';
import { take, map, tap, catchError, finalize, of, Observable, forkJoin } from 'rxjs';
import { GestionTicketsService } from '../core/services/gestion-tickets.service';
import {
  mapTicketDtoToModel,
  mapTicketFiltersModelToDto,
  mapTicketModelToDto,
} from '../mappers/ticket.mapper';
import { PaginationInfo } from '../../../shared/models/pagination';
import { TicketFilters } from '../models/ticket-filter';
import { TicketState } from '../models/ticket.state';
import { Ticket } from '../models/ticket.model';
import { ResultadosBusquedaDto } from '../dtos/resultados-busqueda.dto';
import { UserDTOtoModel } from 'app/core/mappers/user.mapper';
import { TicketDTO } from '../dtos/ticket.dto';
import { Router } from '@angular/router';
import { CatalogoService } from 'app/core/services/catalogo.service';
import { tick } from '@angular/core/testing';

@Injectable({ providedIn: 'root' })
export class GestionTicketsFacade {
  private readonly apiService = inject(GestionTicketsService);
  private readonly catalogService = inject(CatalogoService);
  private readonly router = inject(Router);

  public readonly estados = this.catalogService.estados;
  public readonly prioridades = this.catalogService.prioridades;
  public readonly usuarios = computed(() =>
    this.catalogService.usuarios().map((u) => UserDTOtoModel(u)),
  );

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

  public loadCatalogos() {
    this.loading.set(true);
    return forkJoin({
      estados: this.catalogService.getCatalogoEstados(),
      prioridades: this.catalogService.getCatalogoPrioridades(),
      usuarios: this.catalogService.getUsuarios(),
    }).pipe(finalize(() => this.loading.set(false)));
  }

  public setFilters(filters: TicketFilters): void {
    this.listState.update((state) => ({
      ...state,
      filters,
      cachedPagesItems: new Map(),
      currentPage: 1,
    }));
    this.buscarTickets();
  }
  public setPagination(pagination: Partial<PaginationInfo>): void {
    this.listState.update((state) => ({
      ...state,
      currentPage: pagination.currentPage ?? 1,
      cachedPagesItems: new Map(),
      pageSize: pagination.pageSize ?? 10,
    }));
    this.buscarTickets();
  }
  public buscarTickets(nuevaBusqueda: boolean = false) {
    const state = this.listState();
    const pageNumber = state.currentPage;

    const cached = state.cachedPagesItems.get(pageNumber);
    if (cached && !nuevaBusqueda) {
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

    this.apiService
      .getTickets(
        state.currentPage,
        state.pageSize,
        mapTicketFiltersModelToDto(state.filters),
        state.sort,
        state.sortDirection.toUpperCase() as 'ASC' | 'DESC',
      )
      .pipe(
        tap((response: ResultadosBusquedaDto) => {
          this.updateCacheState(pageNumber, response);
        }),
        catchError((err) => {
          console.error('Error cargando el listado de tickets', err);
          this.listState.update((state) => ({ ...state, err, currentPageItems: [] }));
          return of([]);
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe();
  }

  private updateCacheState(pageNumber: number, response: ResultadosBusquedaDto) {
    const ticketsListDTO = response.data ?? [];
    const newMappedPage = ticketsListDTO.map((dto) => mapTicketDtoToModel(dto));
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
        totalPages: response.items,
        pageSize: response.items,
      };
    });
  }
  public abrirDetalles(id: string) {
    this.apiService
      .getTicketById(id)
      .pipe(
        map((dto) => mapTicketDtoToModel(dto)),
        tap((ticket) => this.detallesTicketState.set(ticket)),
        take(1),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/gestion-tickets', 'detalle', id]);
        },
      });
  }
  public crearTicket(ticket: Partial<Ticket>): Observable<TicketDTO> {
    return this.apiService.createTicket(mapTicketModelToDto(ticket));
  }
  public actualizarTicket(ticket: Partial<Ticket>): Observable<TicketDTO> {
    return this.apiService.updateTicket(mapTicketModelToDto(ticket));
  }
}
