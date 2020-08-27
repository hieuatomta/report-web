import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastrService} from '../../../@core/mock/toastr-service';
import {DatePipe} from '@angular/common';
import {RestApiService} from '../../../@core/mock/rest-api.service';
import {NbDialogService} from '@nebular/theme';
import {LocalDataSource} from 'ng2-smart-table';
import {AddModuleComponent} from './addModule/addModule.component';
import {DeleteModuleComponent} from './deleteModule/deleteModule.component';
import {FormControl, FormGroup} from '@angular/forms';
import {ModuleService} from '../../../@core/service/module.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-module',
  styleUrls: ['./module.component.scss'],
  templateUrl: './module.component.html',
})
export class ModuleComponent implements OnInit {
  @Input() value: any;
  dataParent;
  paramSearch = {
    id: null,
    code: null,
    name: null,
    description: null,
    status: null,
    tanentId: null,
    updateTime: null,
    parentId: null,
  };
  listPageSize = [5, 10, 15, 20];
  pageSizeSelect = this.listPageSize[1];
  item: LocalDataSource = new LocalDataSource();
  sizeData = 0;
  page = 1;
  dataSearch = {};

  constructor(
    private toastr: ToastrService,
    private http: RestApiService,
    private moduleService: ModuleService,
    private dialogService: NbDialogService) {
  }

  inputForm = new FormGroup({
    code: new FormControl('', []),
    name: new FormControl('', []),
    status: new FormControl('', []),
    parentId: new FormControl('', []),
  });

  ngOnInit(): void {
    this.doSearch();
    this.moduleService.getParent().subscribe(data => this.dataParent = data.body);
  }

  search() {
    this.dataSearch = Object.assign({}, this.paramSearch);
    this.page = 1;
    this.doSearch();
  }

  doSearch() {
    this.moduleService.doSearch(this.dataSearch, this.page, this.pageSizeSelect)
      .subscribe((value => {
          this.item.load(value.body.data);
          this.sizeData = value.body.total;
        }),
      );
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

  dataChange(value, isDelete) {
    if (value?.status === 200) {
      if (this.item.count() === 1 && isDelete && this.page !== 1) {
        this.page = this.page - 1;
      }
      this.doSearch();
    }
  }

  open(data) {
    let title;
    if (data == null) {
      title = 'Thêm mới action';
    } else {
      title = 'Sửa thông tin action';
    }
    this.dialogService.open(AddModuleComponent, {
      context: {
        title: title,
        data: data,
      },
      dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(
      value => {
        if (value) {
          this.dataChange(value , false);
          if (data == null) {
            this.toastr.showToast('success', 'Thông báo', 'Thêm người dùng thành công');
          } else {
            this.toastr.showToast('success', 'Thông báo', 'Sửa thông tin thành công');
          }
        }
      },
    );
  }


  delete(data) {
    this.dialogService.open(DeleteModuleComponent, {
      context: {
        title: 'Xóa action',
        data: data,
      },
      dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(
      value => {
        if (value) {
          this.dataChange(value, true);
          this.toastr.showToast('success', 'Thông báo', 'Xóa action thành công');
        }
      },
    );
  }

  myFunction(event) {
    switch (event.action) {
      case 'Edit':
        this.open(event.data);
        break;
      case 'Delete':
        this.delete(event.data);
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
            title: '<i class="ion-edit" style="color: #0000ff; display: none;" title="Sửa" ></i>',
          },
          {
            name: 'Delete',
            title: '<i class="ion-android-delete" style="color: #ff0000" title="Xoá"></i>',

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
        width: '3%',
        valuePrepareFunction: (value, row, cell) => {
          return '<div class="text-right">' +
            (((this.page - 1) * this.pageSizeSelect) + cell.row.index + 1) +
            '</div>';
        },
      },
      code: {
        title: 'Mã Action',
        type:
          'long',
        sort: false,
      },
      name: {
        title: 'Tên action',
        type:
          'string',
        sort: false,
      },
      updateTime: {
        title: 'Ngày tạo',
        type: Date,
        filter: false,
        valuePrepareFunction: (date: any) => {
          return new DatePipe('en-US').transform(date, 'dd/MM/yyyy');
        },
        sort: false,
      },
      status: {
        title: 'Trạng thái',
        type:
          'string',
        sort: false,
        valuePrepareFunction: (status: any) => {
          if (status === 1) {
            return 'Hoạt động';
          } else if (status === 0) {
            return 'Không Hoạt động';
          } else {
            return '';
          }
        },
      },
      action: {
        title: 'Map Action',
        type:
          'string',
        sort: false,
      },

    },
    'width': '600px',
  };

}


export interface IPaging {
  page: number;
  perPage: number;
}
