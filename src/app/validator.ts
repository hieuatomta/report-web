import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export interface AllValidationErrors {
  controlName: string;
  errorName: string;
  errorValue: any;
}

export interface FormGroupControls {
  [key: string]: AbstractControl;
}

export function trimRequired(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control?.value.toString().trim().length;
  }
  if (value == null || value === 0) {
    return {'required': true};
  }
  return null;
}

export function notSpace(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value;
    const regex = /^.*\s+.*$/;
    if (regex.test(value)) {
      return {'space': true};
    }
  }
  return null;
}

export function validEmail(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value;
    if (value == null || value.trim().length === 0) {
      return {'required': true};
    }
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const regex = /^.*\s+.*$/;
    if (!regex.test(value)) {
      return {'validEmail': true};
    }
  }
  return null;
}

export function checkPass(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value;
    if (value == null || value.trim().length === 0) {
      return {'required': true};
    }
    if (value.trim().length > 0 && value.trim().length < 6) {
      return {'minlength': true};
    }
    if (value.trim().length > 60) {
      return {'loginmaxlength': true};
    }
    return null;
  }
}

  export function validPassword(form: FormGroup) {
    if (form.get('newPass') && form.get('comPass')) {
      if (form.get('newPass').value === form.get('comPass').value) {
        form.get('comPass').setErrors(null);
        return null;
      }
      form.get('comPass').setErrors({notMatchPassword: true});
    }
    return null;
  }

  export function passwordsMatchValidator(form: FormGroup) {
    if (form.get('passwordHash') && form.get('rePassword')) {
      if (form.get('passwordHash').value === form.get('rePassword').value) {
        form.get('rePassword').setErrors(null);
        return null;
      }
      form.get('rePassword').setErrors({notMatchPassword: true});
    }
    return null;
  }

  export function checkPass1(form: FormGroup) {
    if (form.get('passwordHash')) {
      if (form.get('passwordHash').value.trim().length === 0) {
        form.get('passwordHash').setErrors({required: true});
      }
      if (form.get('passwordHash').value.trim().length > 0 && form.get('passwordHash').value.trim().length < 6) {
        form.get('passwordHash').setErrors({minlength: true});
      }
      if (form.get('passwordHash').value.trim().length > 60) {
        form.get('passwordHash').setErrors({maxlength: true});
      }
    }
    return null;
  }

//
// function checkpasswordHash(form: FormGroup, pass) {
//   if (form.get(pass)) {
//     if (form.get(pass).value.trim().length === 0 && form.get(pass).touched) {
//       form.get(pass).setErrors({required: true});
//     }
//     if (form.get(pass).value.trim().length > 0 && form.get(pass).value.trim().length < 6
//       && form.get(pass).touched) {
//       form.get(pass).setErrors({minlength: true});
//     }
//   }
// }

// export function checkPassConfirm(form: FormGroup) {
//   if (form.get('passwordHash')) {
//     if (checkpasswordHash(form.get('passwordHash').value) == 1) {
//       form.get('passwordHash').setErrors({required: true});
//     }
//     if (checkpasswordHash(form.get('passwordHash').value) == 2) {
//       form.get('passwordHash').setErrors({minlength: true});
//     }
//   }
//   return null;
// }

  export function getFormValidationErrors(controls: FormGroupControls): AllValidationErrors[] {
    let errors: AllValidationErrors[] = [];
    Object.keys(controls).forEach(key => {
      const control = controls[key];
      if (control instanceof FormGroup) {
        errors = errors.concat(getFormValidationErrors(control.controls));
      }
      const controlErrors: ValidationErrors = controls[key].errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push({
            controlName: key,
            errorName: keyError,
            errorValue: controlErrors[keyError],
          });
        });
      }
    });
    return errors;
  }

  export function getValueError(control: string, key: string): string {
    let controlName = '';
    let errorValue = '';
    switch (control) {
      case 'userName':
        controlName = 'Tên đăng nhập';
        break;
      case 'fullName':
        controlName = 'Tên đầy đủ';
        break;
      case 'tel':
        controlName = 'Số điện thoại';
        break;
      case 'email':
        controlName = 'Email';
        break;
      case 'password':
        controlName = 'Password';
        break;
      case 'passwordHash':
        controlName = 'Mật khẩu';
        break;
      case 'oldPass':
        controlName = 'Mật khẩu cũ';
        break;
      case 'newPass':
        controlName = 'Mật khẩu mới';
        break;
      case 'comPass':
        controlName = 'Nhập lại mật khẩu';
        break;
      case 'rePassword':
        controlName = 'Nhập lại mật khẩu';
        break;
      case 'imageUrl':
        controlName = 'Đường dẫn ảnh';
        break;
      case 'deptId':
        controlName = 'Phòng ban';
        break;
      case 'author':
        controlName = 'Quyền người dùng';
        break;
      case 'status':
        controlName = 'Trạng thái';
        break;
      case 'code':
        controlName = 'Mã action';
        break;
      case 'name':
        controlName = 'Tên action';
        break;
      case 'status':
        controlName = 'Trạng thái';
        break;
      default:
        controlName = '';
        break;
    }
    switch (key) {
      case 'validEmail':
        errorValue = 'không đúng định dạng';
        break;
      case 'required':
        errorValue = 'không được để trống';
        break;
      case 'maxlength':
        errorValue = 'vượt quá ký tự cho phép';
        break;
      case 'loginmaxlength':
        errorValue = 'nhập tối đa 60 ký tự';
        break;
      case 'minlength':
        errorValue = 'tối thiểu 6 ký tự';
        break;
      case 'notMatchPassword':
        errorValue = 'không đúng';
        break;
      case 'email':
        errorValue = 'không đúng định dạng';
        break;
      case 'space':
        errorValue = 'không được chứa dấu cách';
        break;
      default:
        errorValue = '';
        break;
    }
    return controlName + ' ' + errorValue;
  }
