import { MessageRequest } from './../../../core/models/MessageRequest';
import { CreateRoomRequest } from './../../../core/models/CreateRoomRequest';
import { LocalStorageService } from './../../../services/local-storage/local-storage.service';
import { AuthService } from './../../../services/auth/auth.service';
import { ChatService } from './../../../services/chat/chat.service';
import { RxStompService } from './../../../services/rx-stomp/rx-stomp.service';

import { Component, OnInit } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  // new room
  name: string = '';
  selectedMembers: any[] = [];

  searchMembers: any[] = [];
  searchText: string = '';
  isOpenSearchDropdown: boolean = false;

  isOpenCreateNewRoomChatModal: boolean = false;

  // general
  rooms: any;
  error: string = '';
  tab: any;


  constructor(
    private _rxStomp: RxStompService,
    private _chat: ChatService,
    private _auth: AuthService,
    private route: Router,
    private _localStorage: LocalStorageService) 
  { }

  ngOnInit() {
    var user = this._localStorage.getUser();
    this._rxStomp.watch('/user/' + user.id + '/new-room/private').subscribe((message: Message) => {
      this.rooms.push(JSON.parse(message.body));
    });
    this.loadRoom();    
  }

  closeCreateNewRoomChatModal() {
    this.isOpenCreateNewRoomChatModal = false;
  }

  openCreateNewRoomChatModal() {
    this.isOpenCreateNewRoomChatModal = true;
  }

  submitCreateNewRoom($event: any) {
    $event.preventDefault();
    var roomRequest = new CreateRoomRequest();
    roomRequest.name = this.name;
    roomRequest.members = this.selectedMembers.map(item => item.id);

    this._chat.createNewRoom(roomRequest).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        if (error.status == 401) {
          this._auth.refreshToken().subscribe({
            next: (res) => {
              this._localStorage.setUser({ ...this._localStorage.getUser(), token: res });
              this._chat.createNewRoom(roomRequest).subscribe({
                next: (res) => {
                  console.log(res);
                },
                error: (error) => {
                  console.error(error);
                }
            })},
            error: (error) => this.route.navigate(['/sign-in'])
          })
        }
      }
    });

  }

  onSearch() {
    if (this.searchText == '') {
      this.searchMembers = [];
    } else {
      this._chat.search(this.searchText).subscribe({
        next: (res) => {
          this.searchMembers = res.content
        },
        error: (error) => {
          if (error.status == 401) {
            this._auth.refreshToken().subscribe({
              next: (res) => {
                this._localStorage.setUser({ ...this._localStorage.getUser(), token: res });
                this._chat.search(this.searchText).subscribe({
                  next: (res) => {
                    this.searchMembers = res.content
                  }
                });
              },
              error: (error) => this.route.navigate(['/sign-in'])
            })

          }
        }
      });
    }
  }

  loadRoom() {
    this._chat.loadRoom().subscribe({
      next: (res) => {
        this.rooms = res;
        if(this.rooms.length) {
          this.chooseTab(this.rooms[0]);
        }
      },
      error: (error) => {
        if (error.status == 401) {
          this._auth.refreshToken().subscribe({
            next: (res) => {
              this._localStorage.setUser({ ...this._localStorage.getUser(), token: res });
              this._chat.loadRoom().subscribe({
                next: (res) => {
                  this.rooms = res;
                  if(this.rooms.length) {
                    this.chooseTab(this.rooms[0]);
                  }
                },
                error: (error) => {
                  console.error(error);
                }
            })},
            error: (error) => this.route.navigate(['/sign-in'])
          })
        }
      }
    });
    
  }

  selectMember(user: any) {
    if (this.selectedMembers.find(item => item.id == user.id) == null) this.selectedMembers.push(user);
  }

  unselectMember(user: any) {
    if (this.selectedMembers.find(item => item.id == user.id) != null)
      this.selectedMembers = this.selectedMembers.filter(item => item.id != user.id);
  }

  checkExistMember(user: any) {
    return this.selectedMembers.find(item => item.id == user.id);
  }

  sendMessage($event: any) {    
    var request = new MessageRequest();
    request.message = $event.target.value;
    request.receiverName = this.tab?.id;
    this._rxStomp.publish({ destination: '/app/message', body: JSON.stringify(request) });
    // this._rxStomp.publish({ destination: '/app/private-message', body: JSON.stringify(request) });
  }

  chooseTab(tab: any) {
    this.tab = tab;
    // this._rxStomp.watch('/user/' + this.tab.id+'/private').subscribe((message: Message) => {
    //   console.log('Tab ' + this.tab.id + ' received ' + message.body);
    // });
  }
}
