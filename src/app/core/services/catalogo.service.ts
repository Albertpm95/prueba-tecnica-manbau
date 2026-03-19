import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CatalogoDTO } from '../dtos/catalogo.dto';
import { UserDTO } from '../dtos/user.dto';
import { Observable, of, tap } from 'rxjs';
import { CATALOGOS_API } from '../api/catalogos';

@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private http = inject(HttpClient);
  private readonly _catalogoEstados = signal<CatalogoDTO[]>([]);
  private readonly _catalogoPrioridades = signal<CatalogoDTO[]>([]);
  private readonly _usuarios = signal<UserDTO[]>([]);

  public readonly estados = this._catalogoEstados.asReadonly();
  public readonly prioridades = this._catalogoPrioridades.asReadonly();
  public readonly usuarios = this._usuarios.asReadonly();

  public getCatalogoEstados(): Observable<CatalogoDTO[]> {
    if (this._catalogoEstados().length > 0) {
      return of(this._catalogoEstados());
    }
    return this.http.get<CatalogoDTO[]>(CATALOGOS_API.estados()).pipe(
      tap((dtos) => {
        this._catalogoEstados.set(dtos);
      }),
    );
  }

  public getCatalogoPrioridades(): Observable<CatalogoDTO[]> {
    if (this._catalogoPrioridades().length > 0) {
      return of(this._catalogoPrioridades());
    }
    return this.http.get<CatalogoDTO[]>(CATALOGOS_API.prioridades()).pipe(
      tap((dtos) => {
        this._catalogoPrioridades.set(dtos);
      }),
    );
  }
  public getUsuarios(): Observable<UserDTO[]> {
    if (this._usuarios().length > 0) {
      return of(this._usuarios());
    }
    return this.http.get<UserDTO[]>(`${CATALOGOS_API.base}/users`).pipe(
      tap((dtos) => {
        this._usuarios.set(dtos);
      }),
    );
  }
}
