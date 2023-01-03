import { DashboardComponent } from './../pages/admin/dashboard/dashboard.component';
import { BlogComponent } from './../pages/admin/blog/blog.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'manage-blog', component: BlogComponent}      
];

export const AdminRoutes = RouterModule.forChild(routes);
