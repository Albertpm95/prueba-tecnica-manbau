import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from '../user-login/user-login.component';
import { ToastrService } from 'app/core/services/toastr.service';
import { LoadingService } from 'app/core/services/loading.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, UserLoginComponent],
  template: `
    <header
      style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background-color: #f8f9fa; border-bottom: 1px solid #dee2e6;"
    >
      <div style="font-weight: bold;">Gestion IT</div>
      <div style="font-size: 1.5rem; font-weight: bold;">Manbau</div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <app-user-login></app-user-login>
      </div>
    </header>
    @if (loading.isLoading()) {
      <div
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
      >
        <div
          class="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"
        ></div>
      </div>
    }
    @if (toastService.toast(); as t) {
      <div class="fixed top-5 right-5 z-[99] animate-fade-in">
        <div
          [class]="{
            'bg-green-600': t.type === 'success',
            'bg-red-600': t.type === 'error',
            'bg-blue-600': t.type === 'info',
          }"
          class="px-6 py-3 text-white rounded-xl shadow-2xl flex items-center gap-2"
        >
          <span>{{ t.message }}</span>
        </div>
      </div>
    }
  `,
  styles: [],
})
export class HeaderComponent {
  public toastService = inject(ToastrService);
  public loading = inject(LoadingService);
}
