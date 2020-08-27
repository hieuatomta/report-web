import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';
import {RoleService} from '../../@core/service/role.service';
import {MapColumnComponent} from './map-column.component';

@Component({
  selector: 'ngx-permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PermissionManagementComponent implements OnInit {
  sizeData = 0;
  page = 1;
  dataSearch = {};
  listPageSize = [5, 10, 15, 20];
  pageSizeSelect = this.listPageSize[1];
  source: LocalDataSource = new LocalDataSource();
  input = {
    name: '', code: '', status: null,
  };

  constructor(private datePipe: DatePipe,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.doSearch();
  }

  pageSizeChange() {
    this.page = 1;
    this.doSearch();
  }

  pageChange(value) {
    this.page = Math.ceil(value);
    this.doSearch();
  }

  getMaxPage() {
    return Math.ceil(this.sizeData / this.pageSizeSelect);
  }

  search() {
    this.dataSearch = Object.assign({}, this.input);
    this.page = 1;
    this.doSearch();
  }

  doSearch = () => {
    this.roleService.doSearch(this.dataSearch, this.page, this.pageSizeSelect).subscribe(
      (value => {
        this.source.load(value.body.data);
        this.sizeData = value.body.total;
      }),
    );
  }

  tools($event) {
    switch ($event.action) {
      case 'Edit':
        break;
      case 'Delete':
        break;
    }
  }

  settings = {
    pager: {
      display: false,
    },
    actions:
      {
        columnTitle: 'Thao tác',
        custom: [
          {
            name: 'Edit',
            title: '<i class="ion-edit" style="color: blue; cursor: pointer" title="Sửa"></i>',
          },
          {
            name: 'Delete',
            title: '<i class="ion-android-delete" style="color: red; cursor: pointer" title="Xoá"></i>',
          },
        ],
        position: 'right',
        add: false,
        edit: false,
        delete: false,
        sort: false,
      },
    hideSubHeader: true,
    noDataMessage: `Không có kết quả tìm kiếm`,
    columns: {
      stt: {
        title: 'STT',
        type:
          'html',
        filter: false,
        sort: false,
        sortDirection: false,
        width: '2%',
        valuePrepareFunction: (value, row, cell, data) => {
          return '<div class="text-right">'
            + (((this.page - 1) * this.pageSizeSelect) + cell.row.index + 1)
            + '</div>';
        },
      },
      code: {
        title: 'Mã quyền',
        type: 'string',
        sort: false,
        width: '20%',
      },
      name: {
        title: 'Tên quyền',
        type: 'string',
        sort: false,
        width: '20%',
      },
      updateTime: {
        title: 'Ngày tạo',
        type: 'html',
        sort: false,
        width: '20%',
        valuePrepareFunction: (value, row, cell) => {
          return this.datePipe.transform(value, 'dd/MM/yyyy');
        },
      },
      authorized: {
        title: 'Thao tác quyền với module',
        type: 'custom',
        sort: false,
        width: '15%',
        renderComponent: MapColumnComponent,
      },
      status: {
        title: 'Trạng thái',
        type: 'number',
        sort: false,
        valuePrepareFunction: (status: number) => {
          if (status === 1) {
            return 'Hoạt động';
          } else if (status === 0) {
            return 'Khóa';
          } else {
            return '';
          }
        },
        width: '15%',
      },
    },
  };

}
