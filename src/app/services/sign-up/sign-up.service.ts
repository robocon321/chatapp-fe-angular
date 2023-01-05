import { Observable, map } from 'rxjs';
import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { RegisterRequest } from 'src/app/core/models/RegisterRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private apiUrl: string = environment.apiUrl;

  constructor(private _api: ApiService) { }

  register(register: RegisterRequest): Observable<any> {
    return this._api.post(`${this.apiUrl}/sign-up`, register);
  }
}
