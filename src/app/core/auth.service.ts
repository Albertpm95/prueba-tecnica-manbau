import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../shared/models/user';
import { UserDTO } from '../shared/dtos/user.dto';
import { UserMapper } from './mappers/user.mapper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private currentUserSignal = signal<User | null>(null);
  public currentUser = computed(() => this.currentUserSignal());

  // Simular usuario logueado para mockup, por ejemplo, Alan Turing
  // En una app real, esto vendría de localStorage o token
  // this.currentUserSignal.set({ id: 101, fullName: 'Alan Turing', userRole: 'Senior Dev' });

  // Esta funcion seria lo que haria el backend, por tenerlo separado. En login solo llamaria y aplicaria el mapeo
  private fetchUserFromBackend(username: string, password: string): Observable<UserDTO | null> {
    return this.http.get<UserDTO[]>('http://localhost:3000/users').pipe(
      map(users => users.find(u => u.username === username && u.password === password) || null)
    );
  }

  public login(username: string, password: string): Observable<boolean> {
    return this.fetchUserFromBackend(username, password).pipe(
      map(userDto => {
        if (userDto) {
          const mappedUser = UserMapper.toModel(userDto);
          this.currentUserSignal.set(mappedUser);
          return true;
        }
        return false;
      })
    );
  }

  public logout(): void {
    this.currentUserSignal.set(null);
  }
}