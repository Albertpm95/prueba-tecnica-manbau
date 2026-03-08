import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (!authService.currentUser()) {
      <form (ngSubmit)="onLogin()" style="display: flex; gap: 0.5rem;">
        <input type="text" [(ngModel)]="username" name="username" placeholder="Usuario" required style="padding: 0.5rem; border: 1px solid #ccc;">
        <input type="password" [(ngModel)]="password" name="password" placeholder="Contraseña" required style="padding: 0.5rem; border: 1px solid #ccc;">
        <button type="submit" style="padding: 0.5rem 1rem; background-color: #007bff; color: white; border: none; cursor: pointer;">Iniciar sesión</button>
      </form>
      @if (loginError) {
        <div style="color: red; font-size: 0.8rem;">{{ loginError }}</div>
      }
    } @else {
      <span>Bienvenido, {{ authService.currentUser()?.fullName }}</span>
      <button (click)="onLogout()" style="margin-left: 1rem; padding: 0.5rem 1rem; background-color: #dc3545; color: white; border: none; cursor: pointer;">Cerrar sesión</button>
    }
  `,
  styles: []
})
export class UserLoginComponent {
  public readonly authService = inject(AuthService);

  public username: string = '';
  public password: string = '';
  public loginError: string = '';

  public onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        if (success) {
          this.loginError = '';
          this.username = '';
          this.password = '';
        } else {
          this.loginError = 'Credenciales incorrectas';
        }
      },
      error: () => {
        this.loginError = 'Error al conectar con el servidor';
      }
    });
  }

  public onLogout(): void {
    this.authService.logout();
  }
}