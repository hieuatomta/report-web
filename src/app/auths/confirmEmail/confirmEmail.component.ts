import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RestApiService} from '../../@core/mock/rest-api.service';
import {ToastrService} from '../../@core/mock/toastr-service';
import {checkPass, getFormValidationErrors, getValueError, validEmail} from '../../validator';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {environment} from '../../../environments/environment.prod';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-login',
  templateUrl: './confirmEmail.component.html',
  styleUrls: ['./confirmEmail.component.scss'],
})


export class ConfirmEmailComponent implements OnInit {


  constructor(private http: RestApiService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  inputUser: FormGroup;
  data: any;
  isLoad: boolean;
  body: any;
  submitted = false;
  initForm() {
    this.inputUser = new FormGroup({
      email: new FormControl('', [validEmail, Validators.required]),
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
      this.http.post('/sendSimpleEmail', this.inputUser.value).subscribe(res => {
        if (res.status === 200) {
          this.submitted = false;
          this.isLoad = false;
          try {
            this.body = res.body.detail;
          } catch {
            this.body = '';
          }
          this.toastr.showToast('success', 'Thông báo', this.body);
          setTimeout(function () {
            window.location.href =  environment.url + '/auths/login';
          }, 1000);
        }
      }, err => {
        const title = 'Lỗi';
        let body: any;
        try {
          body = err.error.detail;
        } catch {
          body = '';
        } finally {
          this.isLoad = false;
          this.toastr.showToast('danger', title, body);
        }
      });
    } else {
      this.isLoad = false;
    }
  }
}
