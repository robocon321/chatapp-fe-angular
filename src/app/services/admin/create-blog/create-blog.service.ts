import { LocalStorageService } from './../../local-storage/local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateBlogRequest } from './../../../core/models/CreateBlogRequest';

@Injectable({
  providedIn: 'root'
})
export class CreateBlogService {
  private blogUrl: string = environment.blogUrl;

  constructor(private http: HttpClient, private _token: LocalStorageService) { }

  save($createBlog : CreateBlogRequest): Observable<any> {    
    const formData =  new FormData();

    formData.append('title', $createBlog.title!);
    formData.append('image', $createBlog.image!);
    formData.append('description', $createBlog.description!);


    return this.http
    .post(`${this.blogUrl}/api/blog`, formData)
    .pipe(catchError((error: any) => {
      return throwError(error.error)
    }));

  }

}
