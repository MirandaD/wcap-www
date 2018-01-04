import { Component } from '@angular/core';
import {Http, Request, RequestMethod, HttpModule} from '@angular/http';

import {WechatAuthenticationService} from './wechat-authentication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeChat Assistant';
  logo = '../assets/logo-blue.png';
  logo_mini = '../assets/logo-mini.png';
  qrCodeUrl = '';
  loggedIn = false
  constructor(private wechatAuthenticationService: WechatAuthenticationService) {}
  getQRcode = function () {
    this.wechatAuthenticationService.getQRcode()
      .subscribe((res: Response) => {
        this.qrCodeUrl = res.text();
        this.startCheckLogin();
      });
  }

  startCheckLogin = () => {
    this.loggedIn = false
    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    while(!this.loggedIn){
      this.wechatAuthenticationService.checkLogin(this.qrCodeUrl)
      .subscribe((res: Response) => {
        console.log(res);
      });
      this.loggedIn = true;
      delay(20000);
    }
  }
}
