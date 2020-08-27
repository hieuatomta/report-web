import { NgModule } from '@angular/core';
import {
    NbAlertModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbMenuModule, NbSpinnerModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { AuthsRoutingModule } from './auths-routing.module';
import { LoginComponent } from './logins/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthsComponent} from './auths.component';
import {ModalOverlaysModule} from '../pages/modal-overlays/modal-overlays.module';
import {ChangePassComponent} from './changePass/changePass.component';
import {ConfirmEmailComponent} from './confirmEmail/confirmEmail.component';
import {ChangePassEmailComponent} from './changePassEmail/changePassEmail.component';

@NgModule({
    imports: [
        AuthsRoutingModule,
        ThemeModule,
        NbMenuModule,
        NbCardModule,
        NbAlertModule,
        FormsModule,
        NbInputModule,
        NbCheckboxModule,
        NbIconModule,
        ReactiveFormsModule,
        NbLayoutModule,
        ModalOverlaysModule,
        NbSpinnerModule,
    ],
  declarations: [
    LoginComponent,
    AuthsComponent,
    ChangePassComponent,
    ConfirmEmailComponent,
    ChangePassEmailComponent,
  ],
})
export class AuthsModule {
}
