import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoryService {
  private readonly categoryUrl = `${environment.baseUrl}/categories`;
  constructor(private http: HttpClient) {}

  getCategories(keywords: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoryUrl}`, {
      params: {
        keywords: keywords,
      },
    });
  }

  addCategory(name: string): Observable<Category> {
    return this.http.post<Category>(`${this.categoryUrl}`, name);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.categoryUrl}`, category);
  }

  deleteCategories(ids: number[]): Observable<void> {
    return this.http.delete<void>(`${this.categoryUrl}`, {
      params: {
        ids: ids,
      },
    });
  }
}
