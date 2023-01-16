import { AdminRoutes } from './../routes/admin.routing';
import { BlogComponent } from './../pages/admin/blog/blog.component';
import { DashboardComponent } from './../pages/admin/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DashboardComponent, BlogComponent],
  imports: [
    CommonModule,
    AdminRoutes    
  ],
})
export class AdminModule { }
