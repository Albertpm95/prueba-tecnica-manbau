import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  // El contador de peticiones activas
  private _count = signal(0);

  // Exponemos un booleano reactivo: si el contador > 0, estamos cargando
  public isLoading = computed(() => this._count() > 0);

  show(): void {
    this._count.update((c) => c + 1);
  }

  hide(): void {
    this._count.update((c) => Math.max(0, c - 1)); // Evitamos números negativos por seguridad
  }

  // Método de emergencia por si ocurre un error catastrófico y queremos resetear
  reset(): void {
    this._count.set(0);
  }
}
