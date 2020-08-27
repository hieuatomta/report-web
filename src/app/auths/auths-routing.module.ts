import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';


import {LoginComponent} from './logins/login.component';
import {AuthsComponent} from './auths.component';
import {ChangePassComponent} from './changePass/changePass.component';
import {ConfirmEmailComponent} from './confirmEmail/confirmEmail.component';
import {ChangePassEmailComponent} from './changePassEmail/changePassEmail.component';

const routes: Routes = [
  {
    path: '',
    component: AuthsComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'changePass',
        component: ChangePassComponent,
      },
      {
        path: 'changePass/:key',
        component: ChangePassEmailComponent,
      },
      {
        path: 'confirmEmail',
        component: ConfirmEmailComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthsRoutingModule {
}
