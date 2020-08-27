import {NgModule} from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule, NbInputModule,
  NbOptionModule, NbRadioModule,
  NbSelectModule, NbUserModule,
} from '@nebular/theme';

import {ThemeModule} from '../../@theme/theme.module';

import {ActionsRoutingModule, routedComponents} from './actions-routing.module';
import {ActionComponent} from '../actions/action/action.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddActionComponent} from '../actions/action/addAction/addAction.component';
import {DeleteActionComponent} from '../actions/action/deleteAction/deleteAction.component';

const ENTRY_COMPONENTS = [
  AddActionComponent,
];

@NgModule({
    imports: [
        ThemeModule,
        ActionsRoutingModule,
        NbInputModule,
        NbCardModule,
        NbButtonModule,
        NbActionsModule,
        NbUserModule,
        NbCheckboxModule,
        NbRadioModule,
        NbDatepickerModule,
        NbSelectModule,
        NbIconModule,
        ngFormsModule,
        Ng2SmartTableModule,
        NbFormFieldModule,
        ReactiveFormsModule,
    ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
  declarations: [...routedComponents, ActionComponent, AddActionComponent, DeleteActionComponent],
})
export class ActionsModule {
}
