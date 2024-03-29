import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [

  {

    path: '',
    component: LoginComponent

  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {

    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
