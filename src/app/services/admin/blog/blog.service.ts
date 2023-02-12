import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageRequest } from './../../../core/models/PageRequest';
import { LocalStorageService } from './../../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogUrl: string = environment.blogUrl;

  constructor(private http: HttpClient, private _token: LocalStorageService) { }

  loadBlog(pageRequest: PageRequest, filter: any): Observable<any> {
    let params = {
      ...pageRequest.pageable,
      page: pageRequest.pageable.page - 1,
      ...filter
    };
    
    return this.http
    .get(`${this.blogUrl}/api/blog`, { params })
    .pipe(catchError((error: any) => {
      return throwError(error.error)
    }));
  }

  deleteBlog(id: string): Observable<any> {
    return this.http
    .delete(`${this.blogUrl}/api/blog`, {body: id})
    .pipe(catchError((error: any) => {
      return throwError(error.error)
    }));
  }
}
