import { HttpClient, HttpParams } from '@angular/common/http';
import { CatalogoDTO } from 'app/core/dtos/catalogo.dto';
import { UserDTO } from 'app/core/dtos/user.dto';
import { Observable, of, tap } from 'rxjs';
import { ResultadosBusquedaDto } from '../../dtos/resultados-busqueda.dto';
import { TicketDTO } from '../../dtos/ticket.dto';
import { Injectable, inject, signal } from '@angular/core';
import { CATALOGOS_API } from 'app/core/api/catalogos';
import { USERS_API } from 'app/core/api/users';
import { TICKET_API } from '../api/ticket.api';

@Injectable({
  providedIn: 'root',
})
export class GestionTicketsService {
  private http = inject(HttpClient);

  public getTicketById(id: number): Observable<TicketDTO> {
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
    // 1. Construimos los parámetros base según la documentación v1
    // El signo '-' delante del campo en _sort indica orden descendente
    const sortParam = order === 'DESC' ? `-${sort}` : sort;

    let params = new HttpParams()
      .set('_page', currentPage.toString())
      .set('_per_page', pageSize.toString()) // Cambiado de _limit a _per_page
      .set('_sort', sortParam); // v1 usa +/- para el orden

    // 2. Aplicamos filtros usando la sintaxis field:operator=value
    if (filtro.ticket_title) {
      // Si quieres buscar en el título (ajusta 'ticket_title' al nombre de tu campo)
      params = params.set('ticket_title:contains', filtro.ticket_title);
    }
    if (filtro.status_type_id) {
      params = params.set('status_type_id', filtro.status_type_id);
    }
    if (filtro.priority_level_id) {
      params = params.set('priority_level_id', filtro.priority_level_id);
    }

    console.log('Parámetros de consulta:', params.toString());

    console.log('URL de consulta:', `${TICKET_API.list()}?${params.toString()}`);

    // 3. Tipamos la respuesta para poder extraer 'data' con seguridad
    return this.http
      .get<ResultadosBusquedaDto>(TICKET_API.list(), { params })
      .pipe(tap((tickets) => console.log('Tickets recibidos con éxito:', tickets)));
  }

  public createTicket(ticket: Partial<TicketDTO>): Observable<TicketDTO> {
    return this.http.post<TicketDTO>(TICKET_API.create(), ticket);
  }

  public updateTicket(ticket: Partial<TicketDTO>): Observable<TicketDTO> {
    if (!ticket.id) throw new Error('El ID del ticket es requerido para actualizar');
    return this.http.patch<TicketDTO>(TICKET_API.update(ticket.id), ticket);
  }
}
