import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { USERS_API } from '@core-api/users';
import { UserDTO } from '@core-dtos/user';
import { ResultadosBusquedaDto } from '@gestion-tickets/dtos/resultados-busqueda.dto';
import { TicketDTO } from '@gestion-tickets/dtos/ticket.dto';
import { Observable } from 'rxjs';
import { TICKET_API } from '@gestion-tickets/core/api/ticket';

@Injectable({
  providedIn: 'root',
})
export class GestionTicketsService {
  private http = inject(HttpClient);

  public getTicketById(id: string): Observable<TicketDTO> {
    return this.http.get<TicketDTO>(TICKET_API.detail(id));
  }

  public createUsuario(user: Partial<UserDTO>): Observable<unknown> {
    return this.http.post<UserDTO>(USERS_API.create(), user);
  }

  public updateUsuario(user: Partial<UserDTO>): Observable<unknown> {
    return this.http.patch<UserDTO>(USERS_API.create(), user);
  }

  public getTickets(
    currentPage: number,
    pageSize: number,
    filtro: Partial<TicketDTO>,
    sort: string,
    order: 'ASC' | 'DESC',
  ): Observable<ResultadosBusquedaDto> {
    const sortParam = order === 'DESC' ? `-${sort}` : sort;

    let params = new HttpParams()
      .set('_page', currentPage.toString())
      .set('_per_page', pageSize.toString())
      .set('_sort', sortParam);

    if (filtro.ticket_title) {
      params = params.set('ticket_title:contains', filtro.ticket_title);
    }
    if (filtro.status_type_id) {
      params = params.set('status_type_id', filtro.status_type_id);
    }
    if (filtro.priority_level_id) {
      params = params.set('priority_level_id', filtro.priority_level_id);
    }

    console.log('Parámetros de consulta:', params.toString());

    return this.http.get<ResultadosBusquedaDto>(TICKET_API.list(), { params });
  }

  public createTicket(ticket: Partial<TicketDTO>): Observable<TicketDTO> {
    const creationDate = new Date();
    ticket.created_at = creationDate.getTime(); // Simulacion de que lo crea el backend
    return this.http.post<TicketDTO>(TICKET_API.create(), ticket);
  }

  public updateTicket(ticket: Partial<TicketDTO>): Observable<TicketDTO> {
    if (!ticket.id) throw new Error('El ID del ticket es requerido para actualizar');
    return this.http.patch<TicketDTO>(TICKET_API.update(ticket.id), ticket);
  }
}
