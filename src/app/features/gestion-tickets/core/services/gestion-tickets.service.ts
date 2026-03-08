import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { TicketDTO } from '../../dtos/ticket.dto';
import { CATALOGOS_API, TICKET_API } from '../api/ticket.api';
import { TicketFilters } from '../../models/ticket-filter';
import { CatalogoDTO } from '../../../../shared/dtos/catalogo.dto';

@Injectable({
  providedIn: 'root'
})
export class GestionTicketsService {
  private http = inject(HttpClient);
  private readonly _catalogoEstados = signal<CatalogoDTO[]>([]);
  private readonly _catalogoPrioridades = signal<CatalogoDTO[]>([]);

  // 2. Públicos y READONLY para el Facade y componentes
  // Al usar .asReadonly(), el compilador impide usar .set() o .update() fuera de aquí
  public readonly estados = this._catalogoEstados.asReadonly();
  public readonly prioridades = this._catalogoPrioridades.asReadonly();

  public getCatalogoEstados(): Observable<CatalogoDTO[]> {
    if (this._catalogoEstados().length > 0) {
      return of(this._catalogoEstados());
    }
    return this.http.get<CatalogoDTO[]>(CATALOGOS_API.estados()).pipe(
      tap(dtos => {
        this._catalogoEstados.set(dtos);
      })
    );
  }

  public getCatalogoPrioridades(): Observable<CatalogoDTO[]> {
    if (this._catalogoPrioridades().length > 0) {
      return of(this._catalogoPrioridades());
    }
    return this.http.get<CatalogoDTO[]>(CATALOGOS_API.prioridades()).pipe(
      tap(dtos => {
        this._catalogoPrioridades.set(dtos);
      })
    );
  }

  public getTicketById(id: number): Observable<TicketDTO> {
    return this.http.get<TicketDTO>(TICKET_API.detail(id));
  }

  public getTickets(currentPage: number, pageSize: number, filtro: TicketFilters, sort: string, p0: string): Observable<TicketDTO[]>{
    return this.http.post<TicketDTO[]>(TICKET_API.list(), { params: filtro });
  }
}