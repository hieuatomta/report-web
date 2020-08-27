import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../../../../@core/utils';
import {NbDialogRef} from '@nebular/theme';
import {UsersService} from '../../../../@core/service/users.service';
import {ToastrService} from '../../../../@core/mock/toastr-service';

@Component({
  selector: 'ngx-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {

  constructor(private layoutService: LayoutService,
              protected ref: NbDialogRef<DeleteUserComponent>,
              private usersService: UsersService,
              private toastrService: ToastrService) {
  }

  isCollapse: boolean = false;

  ngOnInit(): void {
    this.layoutService.onCollapse.subscribe(value => this.isCollapse = value);
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.usersService.delete(this.data).subscribe(
      value => this.ref.close(value),
      error => {
        let mess;
        if (error.status = 410 && error.error?.data) {
          mess = error.error.data;
        } else {
          mess = error.message;
        }
        this.toastrService.showToast('danger', 'Thông báo', mess);
      },
    );
  }

  title: string;
  data: any;
}
