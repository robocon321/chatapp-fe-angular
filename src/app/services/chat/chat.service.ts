import { MessageRequest } from './../../core/models/MessageRequest';
import { CreateRoomRequest } from './../../core/models/CreateRoomRequest';
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
    return this.http
    .get(`${this.chatUrl}/api/user`, {
      params: {
        email: searchText
      }
    })
    .pipe(catchError((error: any) => {
      return throwError(error.error)
    }));
  }

  createNewRoom(request: CreateRoomRequest) {
    return this.http
    .post(`${this.chatUrl}/api/chat/room`, request)
    .pipe(catchError((error: any) => {
      return throwError(error.error)
    }));
  }

  loadRoom() {
    return this.http
    .get(`${this.chatUrl}/api/chat/room`)
    .pipe(catchError((error: any) => {
      return throwError(error.error)
    }));
  }

  sendMessage(request: MessageRequest) {
    return this.http
    .post(`${this.chatUrl}/api/chat/chat-line`, request)
    .pipe(catchError((error: any) => {
      return throwError(error.error)
    }));
  }

  loadMessages(roomId: string) {
    return this.http
    .get(`${this.chatUrl}/api/chat/chat-line`, {
      params: {
        roomId
      }
    })
    .pipe(catchError((error: any) => {
      return throwError(error.error)
    }));
  }
}
