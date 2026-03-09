import { Injectable, signal } from '@angular/core';
import { Toast } from 'app/shared/models/toast';

@Injectable({ providedIn: 'root' })
export class ToastrService {
  // Un Signal que contiene la lista de toasts activos
  private toastSignal = signal<Toast | null>(null);
  public toast = this.toastSignal.asReadonly();

  show(message: string, type: Toast['type'] = 'success') {
    this.toastSignal.set({ message, type });

    // Auto-limpieza a los 3 segundos
    setTimeout(() => {
      this.toastSignal.set(null);
    }, 3000);
  }
}
