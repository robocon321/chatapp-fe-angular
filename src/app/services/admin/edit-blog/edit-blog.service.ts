import { EditBlogRequest } from './../../../core/models/EditBlogRequest';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateBlogRequest } from '../../../core/models/CreateBlogRequest';

@Injectable({
  providedIn: 'root'
})
export class EditBlogService {

  private blogUrl: string = environment.blogUrl;

  constructor(private http: HttpClient, private _token: LocalStorageService) { }

  update($updateBlog: EditBlogRequest, imgTemp: any): Observable<any> {
    const formData = new FormData();

    formData.append('id', $updateBlog.id!);
    formData.append('title', $updateBlog.title!);
    if($updateBlog.image != null) formData.append('image', $updateBlog.image!);
    formData.append('description', $updateBlog.description!);


    return this.http
      .put(`${this.blogUrl}/api/blog`, formData)
      .pipe(catchError((error: any) => {
        return throwError(error.error)
      }));
  }

  loadBlog(id: string): Observable<any> {
    return this.http
      .get(`${this.blogUrl}/api/blog/${id}`)
      .pipe(catchError((error: any) => {
        return throwError(error.error)
      }));
  }
}
