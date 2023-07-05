import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly userUrl = `${environment.baseUrl}/users`;

  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) {}

  register(username: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.userUrl}`, {
      username: username,
      password: password,
    });
  }

  isAdmin(): boolean {
    return this.storageService.getLoggedInUser().roleName === 'ADMIN';
  }
}
