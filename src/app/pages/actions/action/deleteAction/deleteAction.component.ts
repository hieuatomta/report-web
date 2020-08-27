import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../../../../@core/utils';
import {NbDialogRef} from '@nebular/theme';
import {ToastrService} from '../../../../@core/mock/toastr-service';
import {RestApiService} from '../../../../@core/mock/rest-api.service';
import {ActionService} from '../../../../@core/service/action.service';

@Component({
  selector: 'ngx-delete-action',
  templateUrl: './deleteAction.component.html',
  styleUrls: ['./deleteAction.component.scss'],
})
export class DeleteActionComponent implements OnInit {

  constructor(private layoutService: LayoutService,
              protected ref: NbDialogRef<DeleteActionComponent>,
              private http: RestApiService,
              private actionService: ActionService,
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
    this.actionService.delete(this.data).subscribe(
      value => this.ref.close(value),
      error => this.toastrService.showToast('danger', 'Thông báo', error.data));
  }

  title: string;
  data: any;
}
