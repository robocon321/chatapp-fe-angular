import { LocalStorageService } from './../local-storage/local-storage.service';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatUrl = environment.chatUrl;

  constructor(private http: HttpClient, private _token: LocalStorageService) { }

  search(searchText: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this._token.getUser().token);    

    return this.http
    .get(`${this.chatUrl}/api/user`, {
      headers,
      params: {
        email: searchText
      }
    })
    .pipe(catchError((error: any) => {
      return throwError(error.error)
    }));
  }
}
