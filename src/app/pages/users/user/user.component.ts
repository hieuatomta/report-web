import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastrService} from '../../../@core/mock/toastr-service';
import {RestApiService} from '../../../@core/mock/rest-api.service';
import {ShareService} from '../../../@core/mock/share.service';
import {NbDialogService} from '@nebular/theme';
import {AddUserComponent} from './addUser/addUser.component';
import {FormControl, FormGroup} from '@angular/forms';

/* tslint:disable */
import {TreeviewItem} from '../../../@theme/components/dropdown-treeview-select/ngx-treeview/src/lib/models/treeview-item';
import {TreeviewConfig} from "../../../@theme/components/dropdown-treeview-select/ngx-treeview/src/lib/models/treeview-config";
import {LocalDataSource} from "ng2-smart-table";
import {UsersService} from "../../../@core/service/users.service";
import {DeptService} from "../../../@core/service/dept.service";
import {formatDataDept} from '../../../@core/utils/common';
import {DeleteUserComponent} from "./delete-user/delete-user.component";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private http: RestApiService,
    private dialogService: NbDialogService,
    private userService: UsersService,
    private deptService: DeptService,
    private shareService: ShareService) {
    this.shareService.currentMessage.subscribe(message => this.message = message);
console.log(this.message);
  }
  message: any;
  item: TreeviewItem[] = [];
  inputForm = new FormGroup({
    userName: new FormControl('', []),
    fullName: new FormControl('', []),
    tel: new FormControl('', []),
    email: new FormControl('', []),
    status: new FormControl('', []),
    deptId: new FormControl('', []),
  });
  treeViewConfig = TreeviewConfig.create({
    hasFilter: true,
    hasAllCheckBox: false,
    maxHeight: 500,
    hasCollapseExpand: true,
  })
  source: LocalDataSource = new LocalDataSource();
  sizeData = 0;
  page = 1;
  dataSearch = {};
  listPageSize = [5, 10, 15, 20];
  pageSizeSelect = this.listPageSize[1];

  ngOnInit(): void {
    this.doSearch();
    this.getAllDept();
  }

  pageSizeChange(){
    this.page = 1;
    this.doSearch();
  }

  pageChange(value) {
    this.page = Math.ceil(value);
    this.doSearch();
  }

  getMaxPage() {
    return Math.ceil(this.sizeData/ this.pageSizeSelect);
  }

  search() {
    this.dataSearch = this.inputForm.value;
    this.page = 1;
    this.doSearch()
  }

  doSearch = () => {
    this.userService.doSearch(this.dataSearch, this.page, this.pageSizeSelect).subscribe(
      (value => {
        this.source.load(value.body.data);
        this.sizeData = value.body.total;
      }),
    );
  }

  getAllDept = () => {
    this.deptService.getAllDept().subscribe(value => this.item = formatDataDept(value.body, null))
  }

  deptIdChange($event) {
    this.inputForm.get('deptId').setValue($event);
  }

  dataChange(value, isDelete) {
    if (value?.status === 200) {
      if (this.source.count() == 1 && isDelete && this.page !== 1) {
        this.page = this.page - 1;
      }
      this.doSearch();
    }
  }

  editUsers(data) {
    let title;
    if (data == null) {
      title = 'Thêm mới người dùng';
    } else {
      title = 'Sửa thông tin người dùng'
    }
    this.dialogService.open(AddUserComponent, {
      context: {
        title: title,
        data: data,
      },
      dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(
      value => {
        if (value) {
          this.dataChange(value, false);
          if (data == null) {
            this.toastr.showToast("success", 'Thông báo', 'Thêm người dùng thành công')
          } else {
            this.toastr.showToast("success", "Thông báo", "Sửa thông tin thành công")
          }
        }
      }
    );
  }

  deleteUsers(data) {
    this.dialogService.open(DeleteUserComponent, {
      context: {
        title: 'Xóa người dùng',
        data: data,
      },
      dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(
      value => {
        if (value) {
          this.dataChange(value, true);
          this.toastr.showToast("success", "Thông báo", "Xóa người dùng thành công")
        }
      }
    );
  }

  tools($event) {
    switch ($event.action) {
      case 'Edit':
        this.editUsers($event.data);
        break;
      case 'Delete':
        this.deleteUsers($event.data)
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
          return '<div class="text-right">' + ( ((this.page -1) * this.pageSizeSelect) + cell.row.index + 1) + '</div>';
        },
      },
      userName: {
        title: 'Tên đăng nhập',
        type: 'string',
        sort: false,
        width: '15%',
      },
      fullName: {
        title: 'Tên đầy đủ',
        type: 'string',
        sort: false,
        width: '15%',
      },
      email: {
        title: 'E-mail',
        type: 'string',
        sort: false,
        width: '20%',
      },
      tel: {
        title: 'Số điện thoại',
        type: 'string',
        sort: false,
        width: '13%'
      },
      deptName: {
        title: 'Phòng ban',
        type: 'string',
        sort: false,
        width: '15%'
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
        width: '10%'
      },
    },
  };

}

export interface IPaging {
  page: number;
  perPage: number;
}
