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
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._token.getUser().token);
    const formData = new FormData();

    formData.append('id', $updateBlog.id!);
    formData.append('title', $updateBlog.title!);
    if($updateBlog.image != null) formData.append('image', $updateBlog.image!);
    formData.append('description', $updateBlog.description!);


    return this.http
      .put(`${this.blogUrl}/api/blog`, formData, { headers })
      .pipe(catchError((error: any) => {
        return throwError(error.error)
      }));
  }

  loadBlog(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._token.getUser().token);
    return this.http
      .get(`${this.blogUrl}/api/blog/${id}`, { headers })
      .pipe(catchError((error: any) => {
        return throwError(error.error)
      }));
  }
}
