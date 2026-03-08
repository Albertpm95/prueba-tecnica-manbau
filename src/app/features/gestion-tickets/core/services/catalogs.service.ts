import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CatalogoDTO } from '../../../../shared/dtos/base.dto';
import { TicketDTO } from '../../dtos/ticket.dto';
import { CATALOGOS_API, TICKET_API } from '../api/ticket.api';

@Injectable({
  providedIn: 'root'
})
export class GestionTicketsService {
  private http = inject(HttpClient);
  private catalogoPrioridades = signal<CatalogoDTO[]>([]);
  private catalogoEstados = signal<CatalogoDTO[]>([]);

  public getCatalogoEstados(): Observable<CatalogoDTO[]> {
    if (this.catalogoEstados().length > 0) {
      return of(this.catalogoEstados());
    }
    return this.http.get<CatalogoDTO[]>(CATALOGOS_API.estados()).pipe(
      tap(dtos => {
        this.catalogoEstados.set(dtos);
      })
    );
  }

  public getCatalogoPrioridades(): Observable<CatalogoDTO[]> {
    if (this.catalogoPrioridades().length > 0) {
      return of(this.catalogoPrioridades());
    }
    return this.http.get<CatalogoDTO[]>(CATALOGOS_API.prioridades()).pipe(
      tap(dtos => {
        this.catalogoPrioridades.set(dtos);
      })
    );
  }

  public getTicketById(id: number): Observable<TicketDTO> {
    return this.http.get<TicketDTO>(TICKET_API.detail(id));
  }

  public getTickets(filtro: unknown): Observable<TicketDTO[]>{
    return this.http.post<TicketDTO[]>(TICKET_API.list(), { params: filtro });
  }
}