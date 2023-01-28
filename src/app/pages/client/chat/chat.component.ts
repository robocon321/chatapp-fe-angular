import { Router } from '@angular/router';
import { LocalStorageService } from './../../../services/local-storage/local-storage.service';
import { AuthService } from './../../../services/auth/auth.service';
import { ChatService } from './../../../services/chat/chat.service';
import { RxStompService } from './../../../services/rx-stomp/rx-stomp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  name: string = '';
  selectedMembers: any[] = [];

  searchMembers: any[] = [];
  searchText: string = '';
  isOpenSearchDropdown: boolean = false;

  isOpenCreateNewGroupChatModal: boolean = false;
  error: string = '';

  constructor(
    private _rxStomp: RxStompService,
    private _chat: ChatService, 
    private _auth: AuthService, 
    private route: Router,
    private _localStorage: LocalStorageService) { }

  ngOnInit() {

  }

  closeCreateNewGroupChatModal() {
    this.isOpenCreateNewGroupChatModal = false;
  }

  openCreateNewGroupChatModal() {
    this.isOpenCreateNewGroupChatModal = true;
  }

  submitCreateNewGroup($event: any) {
    $event.preventDefault();
    // console.log(this.name, this.searchText);
  }

  onSearch() {
    if(this.searchText == '') {
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

  selectMember(user: any) {
    if(this.selectedMembers.find(item => item.id == user.id) == null) this.selectedMembers.push(user);
  }

  unselectMember(user: any) {
    if(this.selectedMembers.find(item => item.id == user.id) != null) 
      this.selectedMembers = this.selectedMembers.filter(item => item.id != user.id);    
  }

  checkExistMember(user: any) {
    return this.selectedMembers.find(item => item.id == user.id);
  }
}
