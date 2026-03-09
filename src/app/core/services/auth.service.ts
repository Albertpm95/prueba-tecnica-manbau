import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject, signal, computed } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../../environments/environments";
import { UserDTO } from "app/shared/dtos/user.dto";
import { UserDTOtoModel } from "app/shared/mappers/user.mapper";
import { User } from "app/shared/models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private currentUserSignal = signal<User | null>(null);
  public currentUser = computed(() => this.currentUserSignal());


  public login(username: string, password: string): Observable<boolean> {
    let params = new HttpParams().set('username', username).set('password', password);
    return this.http.get<UserDTO>(`${environment.apiUrl}/users`, { params }).pipe(
      map(userDto => {
        if (userDto) {
          const mappedUser = UserDTOtoModel(userDto);
          this.currentUserSignal.set(mappedUser);
          sessionStorage.setItem('access_token', userDto.token);
          return true;
        }
        return false;
      })
    );
  }

  public logout(): void {
    this.currentUserSignal.set(null);
  }

  public hasRole(): boolean {
    const user = this.currentUser();
    return !!user?.userRole;
  }
}