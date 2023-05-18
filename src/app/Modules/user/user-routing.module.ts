import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from '../dashboard/home/home.component';

const routes: Routes = [{
  path: 'register',
  component: RegistrationComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'home',
  component: HomeComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
