import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class StorageService {
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getLoggedInUser(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  removeLoggedInUser() {
    localStorage.removeItem('user');
  }

  getBasicAuth(): string {
    return localStorage.getItem('basicAuth')!;
  }

  removeBasicAuth() {
    localStorage.removeItem('basicAuth');
  }
}
