import {Component, OnInit, ViewEncapsulation} from '@angular/core';

// import { MENU_ITEMS } from './pages-menu';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'ngx-auths',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ngx-two-columns-layout>
      <router-outlet></router-outlet>
      </ngx-two-columns-layout>
  `,
})
export class AuthsComponent  {
}

