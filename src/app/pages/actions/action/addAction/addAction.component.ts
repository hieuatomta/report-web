import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LayoutService} from '../../../../@core/utils';
import {RestApiService} from '../../../../@core/mock/rest-api.service';
import {ToastrService} from '../../../../@core/mock/toastr-service';
import {
  getFormValidationErrors,
  getValueError,
} from '../../../../validator';
import {ActionService} from '../../../../@core/service/action.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-add-action',
  templateUrl: 'addAction.component.html',
  styleUrls: ['addAction.component.scss'],
})
export class AddActionComponent implements OnInit {
  title: string;
  isCollapse: boolean;
  inputAction: FormGroup;
  data: any;
  source: {
    id: null,
    code: null,
    name: null,
    status: null,
    description: null,
  };

  constructor(protected ref: NbDialogRef<AddActionComponent>,
              private layoutService: LayoutService,
              private http: RestApiService,
              private actionService: ActionService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.layoutService.onCollapse.subscribe(value => this.isCollapse = value);
  }

  getError(control: string) {
    const key = Object.keys(this.inputAction.get(control).errors).shift();
    return getValueError(control, key);
  }

  initForm() {
    this.inputAction = new FormGroup({
      id: new FormControl(this.data?.id, []),
      code: new FormControl(this.data?.code, [Validators.required]),
      name: new FormControl(this.data?.name, [Validators.required]),
      status: new FormControl(this.data?.status | 1, [Validators.required]),
      description: new FormControl(this.data?.description, []),
    }, {});
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    if (this.inputAction.valid) {
      if (this.data == null) {
        this.actionService.insert(this.inputAction.value).subscribe(
          (value) => this.ref.close(value),
          (error) => this.toastrService.showToast('danger', 'Thông báo', error.error.data));
      } else {
        this.actionService.update(this.inputAction.value).subscribe(
          (value) => this.ref.close(value),
          (error) => this.toastrService.showToast('danger', 'Thông báo', error.error.data));
      }
    } else {
      const error = getFormValidationErrors(this.inputAction.controls).shift();
      this.toastrService.showToast('danger', 'Thông báo', getValueError(error.controlName, error.errorName));
    }
  }
}

