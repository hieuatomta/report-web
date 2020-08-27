import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {MapPopupComponent} from './map-popup/map-popup.component';

@Component({
  template: `
    <div style="text-align: center; cursor: pointer" (click)="openMapComponent()">
      <img src="../../../assets/images/map.svg" width="24" height="24" />
    </div>
  `,
})
export class MapColumnComponent implements ViewCell {
  constructor(private dialogService: NbDialogService) { }
  renderValue: string;
  @Input() value: any; // This will be the value passed from the pathID column (see next code block)
  @Input() rowData: any;

  openMapComponent() {
    this.dialogService.open(MapPopupComponent, {
      context: {
        title: 'Thao tác quyền với module',
        data: this.rowData,
      },
      dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(
      value => {
        if (value) {
        }
      },
    );
  }
}
