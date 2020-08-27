import {NgModule} from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule, NbInputModule,
  NbRadioModule,
  NbSelectModule, NbUserModule,
} from '@nebular/theme';

import {ThemeModule} from '../../@theme/theme.module';

import {UsersRoutingModule, routedComponents} from './users-routing.module';
import {UserComponent} from './user/user.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddUserComponent} from './user/addUser/addUser.component';
import {DropdownTreeviewSelectModule} from '../../@theme/components/dropdown-treeview-select';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';

const ENTRY_COMPONENTS = [
  AddUserComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    UsersRoutingModule,
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
    DropdownTreeviewSelectModule,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
  declarations: [...routedComponents, UserComponent, AddUserComponent, DeleteUserComponent],
})
export class UsersModule {
}

