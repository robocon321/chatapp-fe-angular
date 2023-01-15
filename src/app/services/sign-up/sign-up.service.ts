import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RegisterRequest } from 'src/app/core/models/RegisterRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private apiUrl: string = environment.authUrl;

  constructor(private http: HttpClient) { }

  register(register: RegisterRequest): Observable<any> {
    return this.http
    .post(`${this.apiUrl}/sign-up`, register)
    .pipe(catchError((error: any) => throwError(error.error)));
  }
}
