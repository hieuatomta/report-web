import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestApiService} from '../../@core/mock/rest-api.service';
import {ToastrService} from '../../@core/mock/toastr-service';
import {checkPass, getValueError, notSpace, passwordsMatchValidator, validPassword} from '../../validator';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {environment} from '../../../environments/environment.prod';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-login',
  templateUrl: './changePassEmail.component.html',
  styleUrls: ['./changePassEmail.component.scss'],
})


export class ChangePassEmailComponent implements OnInit {

  inputUser: FormGroup;
  data: any;
  body: any;
  token1: string;
  submitted = false;
  isLoad: boolean;

  showPassword = false;
  showPassword1 = false;
  showPassword2 = false;

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
    if (a === 3) {
      if (this.showPassword2) {
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
    if (a === 3) {
      this.showPassword2 = !this.showPassword2;
    }
  }

  constructor(private http: RestApiService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private route: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.token1 = params['key'];
    });
  }
  initForm() {
    this.inputUser = new FormGroup({
      newPass: new FormControl('', [checkPass, notSpace, Validators.minLength(6), Validators.required]),
      comPass: new FormControl('', [checkPass, notSpace, Validators.minLength(6), Validators.required]),
      key: new FormControl(),
    }, {
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
    this.inputUser.value.key = this.token1;
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
        if (err.status === 401) {
          setTimeout(function () {
            window.location.href =  environment.url + '/auths/login';
          }, 1000);
        }
      });
    } else {
      this.isLoad = false;
    }
  }

}
