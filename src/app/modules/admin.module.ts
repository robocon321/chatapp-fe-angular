import { EditBlogComponent } from './../pages/admin/edit-blog/edit-blog.component';
import { LoadingModule } from './loading/loading.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateBlogComponent } from './../pages/admin/create-blog/create-blog.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AdminRoutes } from './../routes/admin.routing';
import { BlogComponent } from './../pages/admin/blog/blog.component';
import { DashboardComponent } from './../pages/admin/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DashboardComponent, BlogComponent, CreateBlogComponent, EditBlogComponent],
  imports: [
    CKEditorModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule,
    AdminRoutes
  ]
})
export class AdminModule { }
