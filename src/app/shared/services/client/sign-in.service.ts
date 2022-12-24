import { ApiService } from './../../../core/services/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private apiService: ApiService) { }

  signIn() {
    console.log("Sign in!");
  }
}
