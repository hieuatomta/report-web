import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestApiService} from '../../@core/mock/rest-api.service';
import {ToastrService} from '../../@core/mock/toastr-service';
import {getValueError, checkPass, notSpace} from '../../validator';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {

  constructor(private http: RestApiService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
  }

  inputUser: FormGroup;
  data: any;
  isLoad: boolean;
  submitted = false;

  initForm() {
    this.inputUser = new FormGroup({
      userName: new FormControl(this.data?.userName, [Validators.required]),
      passwordHash: new FormControl('', [checkPass, notSpace, Validators.required]),
    });
  }

  trimValue(event) {
    event.target.value = event.target.value.trim();
  }


  ngOnInit() {
    this.initForm();
  }

  getError(control: string) {
    const key = Object.keys(this.inputUser.get(control).errors).shift();
    return getValueError(control, key);
  }

  showPassword = false;

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.isLoad = true;
    this.submitted = true;
    if (this.inputUser.valid) {
      this.http.post('/login', this.inputUser.value).subscribe(res => {
        this.submitted = false;
        if (res.status === 200) {
          window.location.href = 'http://localhost:4200/report-web/pages/home';
          // this.router.navigate([res.body.path]);

          localStorage.setItem('objects', JSON.stringify(res.body.listObjects));
          localStorage.setItem('httpHeaders', res.body.httpHeaders.Authorization);
          localStorage.setItem('users', res.body.customUserDetails.fullName);
          this.isLoad = false;
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

  onReset() {
    this.submitted = false;
    this.inputUser.reset();
  }
}
