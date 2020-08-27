import { NgModule } from '@angular/core';
import { PermissionManagementComponent } from './permission-management.component';
import {PermissionManagementRoutingModule} from './permission-management-routing.module';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MapColumnComponent} from './map-column.component';
import { MapPopupComponent } from './map-popup/map-popup.component';
import {TreeviewModule} from '../../@theme/components/dropdown-treeview-select/ngx-treeview/src/lib/treeview.module';

@NgModule({
  imports: [
    PermissionManagementRoutingModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    Ng2SmartTableModule,
    NbIconModule,
    CommonModule,
    FormsModule,
    TreeviewModule,
  ],
  declarations: [PermissionManagementComponent, MapColumnComponent, MapPopupComponent],
})
export class PermissionManagementModule { }
