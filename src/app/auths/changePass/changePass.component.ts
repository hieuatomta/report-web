import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestApiService} from '../../@core/mock/rest-api.service';
import {ToastrService} from '../../@core/mock/toastr-service';
import {
  checkPass,
  getFormValidationErrors,
  getValueError, notSpace,
  passwordsMatchValidator,
  validPassword,
} from '../../validator';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment.prod';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-login',
  templateUrl: './changePass.component.html',
  styleUrls: ['./changePass.component.scss'],
})


export class ChangePassComponent implements OnInit {

  inputUser: FormGroup;
  data: any;
  body: any;
  submitted = false;
  isLoad: boolean;


  constructor(private http: RestApiService,
              private toastr: ToastrService,
              private router: Router) {

  }

  showPassword = false;
  showPassword1 = false;

  getInputType(a: number) {
    if (a === 1) {
      if (this.showPassword) {
        return 'text';
      }
    }
    if (a === 2) {
      if (this.showPassword1) {
        return 'text';
      }
    }
    return 'password';
  }

  toggleShowPassword(a: number) {
    if (a === 1) {
      this.showPassword = !this.showPassword;
    }
    if (a === 2) {
      this.showPassword1 = !this.showPassword1;
    }
  }

  initForm() {
    this.inputUser = new FormGroup({
        userName: new FormControl(this.data?.userName, [Validators.required]),
        oldPass: new FormControl('', [checkPass, notSpace, Validators.minLength(6), Validators.required]),
        newPass: new FormControl('', [checkPass, notSpace, Validators.minLength(6), Validators.required]),
        comPass: new FormControl('', [checkPass, notSpace, Validators.minLength(6), Validators.required]),
      },
      {
        validators: validPassword,
      });
  }

  ngOnInit() {
    this.initForm();
  }


  getError(control: string) {
    const key = Object.keys(this.inputUser.get(control).errors).shift();
    return getValueError(control, key);
  }

  onSubmit() {
    this.isLoad = true;
    this.submitted = true;
    if (this.inputUser.valid) {
      this.http.post('/changePass', this.inputUser.value).subscribe(res => {
        if (res.status === 200) {
          this.submitted = false;
          try {
            this.body = res.body.data;
          } catch {
            this.body = '';
          } finally {
            this.isLoad = false;
          }
          this.toastr.showToast('success', 'Thông báo', this.body);
          setTimeout(function () {
            window.location.href =  environment.url + '/auths/login';
          }, 1000);
        }
      }, err => {
        const title = 'Lỗi';
        try {
          this.body = err.error.detail;
        } catch {
          this.body = '';
        } finally {
          this.isLoad = false;
        }
        this.toastr.showToast('danger', title, this.body);
      });
    } else {
      const error = getFormValidationErrors(this.inputUser.controls).shift();
      //
      // if (error.errorName === 'notMatchPassword') {
      //   console.log("Das");
      // }
      // this.toastrService.showToast("danger", 'Thông báo',  getValueError(error.controlName, error.errorName));
      // this.inputUser.get('comPass').setValue(null);
      this.isLoad = false;
    }
  }

}
