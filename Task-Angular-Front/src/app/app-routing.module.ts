import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideMainNavComponent } from './layouts/side-main-nav/side-main-nav.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule) }
    ],
    component: SideMainNavComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
