import { effect, Injectable, signal, untracked } from '@angular/core';
import { Toast } from 'app/shared/models/toast';

@Injectable({ providedIn: 'root' })
export class ToastrService {
  private toastSignal = signal<Toast | null>(null);
  public toast = this.toastSignal.asReadonly();

  constructor() {
    effect((onCleanup) => {
      const current = this.toastSignal();
      if (current) {
        const timer = setTimeout(() => {
          untracked(() => this.toastSignal.set(null));
        }, 3000);
        onCleanup(() => clearTimeout(timer));
      }
    });
  }

  show(message: string, type: Toast['type'] = 'success') {
    this.toastSignal.set({ message, type });
  }
}
