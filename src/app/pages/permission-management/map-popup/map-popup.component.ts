import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LayoutService} from '../../../@core/utils';
import {
  TreeviewConfig,
} from '../../../@theme/components/dropdown-treeview-select/ngx-treeview/src/lib/models/treeview-config';
import {ModuleService} from '../../../@core/service/module.service';
import {formatDataModule} from '../../../@core/utils/common';

@Component({
  selector: 'ngx-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapPopupComponent implements OnInit {
  title: string;
  data: any;
  dataItems = [];
  isCollapse: boolean = false;
  treeViewConfig = TreeviewConfig.create({
    hasFilter: true,
    hasAllCheckBox: false,
    maxHeight: undefined,
    hasCollapseExpand: false,
  });
  dataChoose = [];

  constructor(private layoutService: LayoutService,
              private moduleService: ModuleService) {
  }

  ngOnInit(): void {
    this.layoutService.onCollapse.subscribe(value => this.isCollapse = value);
    this.moduleService.doSearch({}, 1, 9999).subscribe(
      value => this.dataItems = formatDataModule(value.body.data, 0),
    );
  }

}
