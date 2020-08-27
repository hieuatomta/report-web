import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {menuRole} from './pages-menu';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  constructor() {}

  formatListPractices(data, paren) {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      if (dataItem.parenId == paren) {
        const children = this.formatListPractices(data, dataItem.id);
        if (children.length > 0) {
          dataItem.children = children;
        }
        arr.push(dataItem);
      }
    }
    return arr;
  }


  menu: Array<any>;
  home: Object;

  ngOnInit(): void {
    this.menu = [];
    this.home = {
      title: 'Trang chủ',
      icon: 'home-outline',
      link: '/mic/pages/home',
    };
    this.menu.push(this.home);
    let menu1;
    try {
      const token = localStorage.getItem('httpHeaders');
      if (token.trim().length === 0 && token === null) {
        localStorage.setItem('objects', null);
      } else {
        const obj = JSON.parse(localStorage.getItem('objects'));
        for (let i = 0; i < obj.length; i++) {
          for (let j = 0; j < menuRole.length; j++) {
            if (obj[i].code == menuRole[j].code) {
              obj[i].link = menuRole[j].link;
              obj[i].icon = menuRole[j].icon;
            }
          }
        }
        // for (let i = 0; i < obj.length; i++) {
        //   const data = obj[i];
        //   const name = obj[i].title;
        //     if (data.link == null && data.parenId != 0) {
        //       obj[i].title = name + ' (Chưa triển khai)';
        //   }
        // }
        localStorage.setItem('objects', JSON.stringify(obj));
        menu1 = this.formatListPractices(obj, 0);
      }
      for (let i = 0; i < menu1.length; i++) {
        this.menu.push(menu1[i]);
      }
    } catch (e) {
      localStorage.setItem('objects', null);
    }
  }
}
