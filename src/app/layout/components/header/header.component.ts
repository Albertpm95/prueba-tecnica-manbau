import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, UserLoginComponent],
  template: `
    <header style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background-color: #f8f9fa; border-bottom: 1px solid #dee2e6;">
      <div style="font-weight: bold;">Gestion IT</div>
      <div style="font-size: 1.5rem; font-weight: bold;">Manbau</div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <app-user-login></app-user-login>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent {
}