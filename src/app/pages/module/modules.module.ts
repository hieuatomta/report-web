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
import {ModulesRoutingModule, routedComponents} from './modules-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddModuleComponent} from './modules/addModule/addModule.component';
import {ModuleComponent} from './modules/module.component';
import {DeleteModuleComponent} from './modules/deleteModule/deleteModule.component';

const ENTRY_COMPONENTS = [
  AddModuleComponent,
];

@NgModule({
    imports: [
        ThemeModule,
        ModulesRoutingModule,
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
  declarations: [...routedComponents, ModuleComponent, AddModuleComponent, DeleteModuleComponent],
})
export class ModulesModule {
}
