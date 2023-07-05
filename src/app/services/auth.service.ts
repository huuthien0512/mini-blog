import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authUrl = `${environment.baseUrl}`;

  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) {}

  login(username: string, password: string): Observable<User> {
    const queryParamsString = `username=${username}&password=${password}`;
    return this.http
      .post<User>(`${this.authUrl}/login?${queryParamsString}`, null)
      .pipe(
        tap((loggedInUser: User) => {
          if (loggedInUser) {
            this.storageService.setItem(
              'basicAuth',
              `Basic ${window.btoa(username + ':' + password)}`
            );
            this.storageService.setItem('user', JSON.stringify(loggedInUser));
          }
        })
      );
  }

  logout() {
    this.storageService.removeLoggedInUser();
    this.storageService.removeBasicAuth();
  }
}
