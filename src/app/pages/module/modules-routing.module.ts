import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModulesComponent } from './modules.component';
import {ActionComponent} from '../actions/action/action.component';
import {ModuleComponent} from './modules/module.component';

const routes: Routes = [{
  path: '',
  component: ModulesComponent,
  children: [
    {
      path: '',
      component: ModuleComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule { }

export const routedComponents = [
  ModulesComponent,
];
