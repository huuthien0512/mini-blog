import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminUserService {
  private readonly userUrl = `${environment.baseUrl}/admin/users`;

  constructor(private http: HttpClient) {}

  getUsers(keywords: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`, {
      params: {
        keywords: keywords,
      },
    });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  enableUser(enabled: boolean, id: number): Observable<void> {
    return this.http.put<void>(`${this.userUrl}`, {
      id: id,
      enabled: enabled,
    });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.userUrl}/${id}`);
  }
}
