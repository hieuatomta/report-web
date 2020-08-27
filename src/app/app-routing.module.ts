import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {AuthGuardService} from './@core/mock/auth-guard.service';

export const routes: Routes = [
  {
    canActivate: [AuthGuardService],
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auths',
    loadChildren: () => import('./auths/auths.module')
      .then(m => m.AuthsModule),
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
  { path: 'auths', redirectTo: 'auths/login', pathMatch: 'full' },

];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}