import { LoadingModule } from './modules/loading/loading.module';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AdminModule } from './modules/admin.module';
import { ClientModule } from './modules/client.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  {path: '',  loadChildren: () => ClientModule, canActivate: [AuthGuardService]},
  {path: 'admin', loadChildren: () => AdminModule, canActivate: [AuthGuardService]},
  {path: '404', component: NotFoundComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent, pathMatch: "full"},
  {path: "**", redirectTo: "/404", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, LoadingModule]
})
export class AppRoutingModule { }
