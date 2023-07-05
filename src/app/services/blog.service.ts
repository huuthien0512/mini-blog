import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blog, BlogRecord } from '../models/blog';
import { ImageData } from '../models/image-data';

@Injectable()
export class BlogService {
  private readonly blogUrl = `${environment.baseUrl}/blogs`;

  // listen actions and update Published Tab
  private readonly _updatePublishedTab: Subject<void> = new Subject<void>();
  $updatePublishedTab = this._updatePublishedTab.asObservable();

  // listen actions and update Draft Tab
  private readonly _updateDraftTab: Subject<void> = new Subject<void>();
  $updateDraftTab = this._updateDraftTab.asObservable();

  // listen actions and update Dustbin Tab
  private readonly _updateDustbinTab: Subject<void> = new Subject<void>();
  $updateDustbinTab = this._updateDustbinTab.asObservable();

  // listen actions and update Blogs Tab
  private readonly _updateBlogs: Subject<void> = new Subject<void>();
  $updateBlogs = this._updateBlogs.asObservable();

  constructor(private http: HttpClient) {}

  getBlogs(
    state: number,
    page: number,
    count: number,
    keywords: string,
    userId: number = -1
  ): Observable<BlogRecord> {
    return this.http.get<BlogRecord>(`${this.blogUrl}`, {
      params: {
        state: state,
        page: page,
        count: count,
        keywords: keywords,
        userId: userId,
      },
    });
  }

  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${this.blogUrl}`, blog);
  }

  deleteBlogsToDustbin(ids: number[], state: number): Observable<void> {
    return this.http.put<void>(`${this.blogUrl}`, {
      ids: ids,
      state: state,
    });
  }

  deleteBlogs(ids: number[]): Observable<void> {
    return this.http.delete<void>(`${this.blogUrl}`, {
      params: {
        ids: ids,
      },
    });
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.blogUrl}/${id}`);
  }

  restoreBlogs(blogIds: number[]): Observable<void> {
    return this.http.put<void>(`${this.blogUrl}/restore`, blogIds);
  }

  uploadFileRequest(formdata: FormData) {
    return this.http.post<ImageData>(`${this.blogUrl}/upload-image`, formdata, {
      observe: 'response',
    });
  }

  setUpdatePublishedTab() {
    this._updatePublishedTab.next();
  }

  setUpdateDraftTab() {
    this._updateDraftTab.next();
  }

  setUpdateBlogs() {
    this._updateBlogs.next();
  }

  setUpdateDustbinTab() {
    this._updateDustbinTab.next();
  }
}
