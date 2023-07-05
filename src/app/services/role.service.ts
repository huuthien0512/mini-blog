import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { environment } from 'src/environments/environment';

@Injectable()
export class RoleService {
  private readonly roleUrl = `${environment.baseUrl}`;
  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.roleUrl}/admin/roles`);
  }
}
