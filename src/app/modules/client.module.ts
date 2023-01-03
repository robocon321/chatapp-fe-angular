import { ClientRoutes } from './../routes/client.routing';
import { HomeComponent } from '../pages/client/home/home.component';
import { ChatComponent } from '../pages/client/chat/chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ChatComponent, HomeComponent],
  imports: [
    CommonModule,
    ClientRoutes
  ]
})
export class ClientModule { }
