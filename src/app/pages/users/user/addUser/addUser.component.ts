import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LayoutService} from '../../../../@core/utils';
/* tslint:disable */
import {TreeviewItem} from '../../../../@theme/components/dropdown-treeview-select/ngx-treeview/src/lib/models/treeview-item';
import {TreeviewConfig} from "../../../../@theme/components/dropdown-treeview-select/ngx-treeview/src/lib/models/treeview-config";
import {
  DefaultTreeviewEventParser,
  TreeviewEventParser
} from "../../../../@theme/components/dropdown-treeview-select/ngx-treeview/src/lib/helpers/treeview-event-parser";
import {
  getFormValidationErrors,
  getValueError, notSpace,
  passwordsMatchValidator, trimRequired
} from "../../../../validator";
import {DeptService} from "../../../../@core/service/dept.service";
import {RoleService} from "../../../../@core/service/role.service";
import {formatDataDept} from '../../../../@core/utils/common';
import {ToastrService} from "../../../../@core/mock/toastr-service";
import {UsersService} from "../../../../@core/service/users.service";
import validate = WebAssembly.validate;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-add-user',
  templateUrl: 'addUser.component.html',
  styleUrls: ['addUser.component.scss'],
  providers: [TreeviewConfig,
    {provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser}
  ],
})
export class AddUserComponent implements OnInit {
  title: string;
  data: any;
  itemDept: TreeviewItem[] = [];
  itemRoles;
  inputUser: FormGroup;
  isCollapse: boolean;
  treeViewConfig = TreeviewConfig.create({
    hasFilter: true,
    hasAllCheckBox: false,
    maxHeight: 500,
    hasCollapseExpand: true,
  })

  constructor(protected ref: NbDialogRef<AddUserComponent>,
              private layoutService: LayoutService,
              private usersService: UsersService,
              private deptService: DeptService,
              private roleService: RoleService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.layoutService.onCollapse.subscribe(value => this.isCollapse = value);
    this.deptService.getAllDept().subscribe(value => this.itemDept = formatDataDept(value.body, null));
    this.roleService.getAllRole().subscribe(value => this.itemRoles = value.body);
  }

  initForm() {
    let roleID = null;
    if (this.data && this.data.roleId) {
      roleID = this.data.roleId.split(',').map(item => parseInt(item))
    }
    this.inputUser = new FormGroup({
      userName: new FormControl(this.data?.userName, [trimRequired]),
      fullName: new FormControl(this.data?.fullName, [trimRequired]),
      tel: new FormControl(this.data?.tel, []),
      email: new FormControl(this.data?.email, [Validators.email]),
      passwordHash: new FormControl('', [notSpace, Validators.minLength(6)]),
      rePassword: new FormControl('', []),
      imageUrl: new FormControl(this.data?.imageUrl, []),
      status: new FormControl(this.data?.status | 1, []),
      deptId: new FormControl(this.data?.deptId, [Validators.required]),
      roleId: new FormControl(roleID, []),
    }, {
      validators: passwordsMatchValidator
    });
    if (this.data == null) {
      this.inputUser.get('passwordHash').setValidators([notSpace, Validators.minLength(6), Validators.required]);
    }
  }

  getError(control: string) {
    const key = Object.keys(this.inputUser.get(control).errors).shift();
    return getValueError(control, key);
  }

  touchDropdown() {
    this.inputUser.get('deptId').markAsTouched();
  }

  deptIdChange($event) {
    this.inputUser.get('deptId').setValue($event);
  }

  cancel() {
    this.ref.close();
  }

  messangeError(error) {
    let mess;
    if (error.status = 410 && error.error?.data) {
      mess = error.error.data;
    } else {
      mess = error.message;
    }
    this.toastrService.showToast('danger', 'Thông báo', mess);
  };

  submit() {
    this.inputUser.markAllAsTouched();
    if (this.inputUser.valid) {
      let data = Object.assign({}, this.inputUser.value);
      if (data?.roleId != null) {
        data.roleId = data?.roleId.toString();
      } else {
        data.roleId = null;
      }
      data.id = this.data?.id;
      if (this.data == null) {
        this.usersService.insert(data).subscribe(
          (value) => this.ref.close(value),
          error => this.messangeError(error),
        )
      } else {
        this.usersService.update(data).subscribe(
          (value) => this.ref.close(value),
          (error) => this.messangeError(error),
        )
      }
    } else {
      const error = getFormValidationErrors(this.inputUser.controls).shift();
      this.toastrService.showToast("danger", 'Thông báo', getValueError(error.controlName, error.errorName));
    }
  }
}

