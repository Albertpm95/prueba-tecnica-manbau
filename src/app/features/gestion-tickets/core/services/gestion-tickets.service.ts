import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { TicketDTO } from '../../dtos/ticket.dto';
import { CATALOGOS_API, TICKET_API } from '../api/ticket.api';
import { CatalogoDTO } from '../../../../shared/dtos/catalogo.dto';
import { ResultadosBusquedaDto } from '../../dtos/resultados-busqueda.dto';

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

  public getTickets(
    currentPage: number,
    pageSize: number,
    filtro: Partial<TicketDTO>,
    sort: string,
    order: 'ASC' | 'DESC'
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
    if (filtro.priority_level) {
      params = params.set('priority_level', filtro.priority_level);
    }

    console.log('Parámetros de consulta:', params.toString());

    console.log('URL de consulta:', `${TICKET_API.list()}?${params.toString()}`);

    // 3. Tipamos la respuesta para poder extraer 'data' con seguridad
    return this.http.get<ResultadosBusquedaDto>(TICKET_API.list(), { params }).pipe(
      tap(tickets => console.log('Tickets recibidos con éxito:', tickets))
    );
  }
}