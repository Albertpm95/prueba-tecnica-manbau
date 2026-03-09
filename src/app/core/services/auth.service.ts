import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environments';
import { UserDTO } from 'app/shared/dtos/user.dto';
import { UserDTOtoModel } from 'app/shared/mappers/user.mapper';
import { User } from 'app/shared/models/user';
import { ToastrService } from './toastr.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private currentUserSignal = signal<User | null>(null);
  public currentUser = computed(() => this.currentUserSignal());
  private toastrService = inject(ToastrService);
  private router = inject(Router);

  public login(username: string, password: string): Observable<boolean> {
    const params = new HttpParams().set('username', username).set('password', password);
    return this.http.get<UserDTO[]>(`${environment.apiUrl}/users`, { params }).pipe(
      map((users) => (Array.isArray(users) && users.length > 0 ? users[0] : null)), // Suponemos que el backend devuelve un array de usuarios, tomamos el primero
      map((userDto) => {
        if (userDto) {
          console.log('Respuesta del servidor:', userDto); // Debug: Ver la respuesta del servidor
          const mappedUser = UserDTOtoModel(userDto);
          this.currentUserSignal.set(mappedUser);
          sessionStorage.setItem('access_token', userDto.token);
          this.toastrService.show('Login exitoso', 'success');
          this.router.navigate(['']);
          return true;
        }
        this.toastrService.show('Credenciales incorrectas', 'error');
        return false;
      }),
    );
  }

  public logout(): void {
    this.currentUserSignal.set(null);
    this.toastrService.show('Sesion cerrada', 'info');
  }

  public hasRole(): boolean {
    const user = this.currentUser();
    return !!user?.userRole;
  }
}
