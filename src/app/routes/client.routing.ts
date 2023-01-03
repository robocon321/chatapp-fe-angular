import { ChatComponent } from './../pages/client/chat/chat.component';
import { HomeComponent } from './../pages/client/home/home.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'chat', component: ChatComponent}
];

export const ClientRoutes = RouterModule.forChild(routes);
