import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '@core-dtos/user';
import { UserDTOtoModel } from '@core-mappers/user';
import { environment } from '@env/environments';
import { Observable, of, map } from 'rxjs';
import { ToastrService } from './toastr.service';
import { User } from '@core-models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private toastrService = inject(ToastrService);
  private router = inject(Router);

  private currentUserSignal = signal<User | null>(this.getUserFromStorage());

  public currentUser = computed(() => this.currentUserSignal());

  public login(username: string, password: string): Observable<boolean> {
    if (this.currentUserSignal()) {
      this.router.navigate(['gestion-tickets']);
      return of(true);
    }

    const params = new HttpParams().set('username', username).set('password', password);

    return this.http.get<UserDTO[]>(`${environment.apiUrl}/users`, { params }).pipe(
      map((users) => (Array.isArray(users) && users.length > 0 ? users[0] : null)),
      map((userDto) => {
        if (userDto) {
          const mappedUser = UserDTOtoModel(userDto);

          this.currentUserSignal.set(mappedUser);
          sessionStorage.setItem('access_token', userDto.token);
          sessionStorage.setItem('current_user', JSON.stringify(mappedUser));

          this.toastrService.show('Login exitoso', 'success');
          this.router.navigate(['gestion-tickets']);
          return true;
        }

        this.toastrService.show('Credenciales incorrectas', 'error');
        return false;
      }),
    );
  }

  public logout(): void {
    this.currentUserSignal.set(null);
    sessionStorage.clear();
    this.toastrService.show('Sesión cerrada', 'info');
    this.router.navigate(['login']);
  }

  public hasRole(): boolean {
    const user = this.currentUser();
    return !!user?.userRole;
  }

  private getUserFromStorage(): User | null {
    const userJson = sessionStorage.getItem('current_user');
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }
}
