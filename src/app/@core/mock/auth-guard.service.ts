import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRoute} from '@angular/router';
import {RestApiService} from './rest-api.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: RestApiService) {
  }
  canActivate(): boolean {
    const token = localStorage.getItem('httpHeaders');
    if (token === undefined || token === null) {
      this.router.navigate(['/auths/login']);
    }
    let checkRole = false;
    const obj = JSON.parse(localStorage.getItem('objects'));
    try {
      if (obj === undefined || obj === null) {
        this.router.navigate(['/auths/login']);
      }
      for (let i = 0; i < obj?.length; i++) {
        if (obj[i].link === location.pathname) {
          checkRole = true;
        }
      }
      if (location.pathname === '/pages/home' || location.pathname === '/'
        || location.pathname === '/pages' || location.pathname ===  '/auths/login') {
        return true;
      }
      if (!checkRole) {
        this.router.navigate(['/pages/home']);
        return false;
      }
    } catch (e) {
      this.router.navigate(['/auths/login']);
    }
    return true;
  }
}
