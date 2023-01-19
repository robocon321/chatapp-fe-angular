import { EditBlogComponent } from './../pages/admin/edit-blog/edit-blog.component';
import { CreateBlogComponent } from './../pages/admin/create-blog/create-blog.component';
import { DashboardComponent } from './../pages/admin/dashboard/dashboard.component';
import { BlogComponent } from './../pages/admin/blog/blog.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'manage-blog', component: BlogComponent},
  {path: 'create-blog', component: CreateBlogComponent},
  {path: 'edit-blog/:id', component: EditBlogComponent}
];

export const AdminRoutes = RouterModule.forChild(routes);
