import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ActionsComponent} from './actions.component';
import {ActionComponent} from '../actions/action/action.component';

const routes: Routes = [{
  path: '',
  component: ActionsComponent,
  children: [{
    path: '',
    component: ActionComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionsRoutingModule {
}

export const routedComponents = [
  ActionsComponent,
];
