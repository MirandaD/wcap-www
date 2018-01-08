import { Component } from '@angular/core';

import {WechatAuthenticationService} from './wechat-authentication.service'
import { logging } from 'selenium-webdriver';
import { Time } from '@angular/common/src/i18n/locale_data_api';

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
  loggedIn = '';
  startCheckLogin: number;
  counter = 0;
  constructor(private wechatAuthenticationService: WechatAuthenticationService) {}
  getQRcode = function () {
    this.wechatAuthenticationService.getQRcode()
      .subscribe((res: Response) => {
        this.qrCodeUrl = res.text();
        console.log('qrCode returned')
      }
      // (error)=>{console.log(error);},
      // ()=>{
      //   this.startCheckLogin = window.setInterval(this.checkLogin, 5000);
      // }
    );
  }

  checkLogin = () => {
    console.log('start checking...')
      console.log('checke')
      this.wechatAuthenticationService.checkLogin(this.qrCodeUrl)
      .subscribe((res) => {
        this.loggedIn = res.text();
        console.log(this.loggedIn);
        // if(this.loggedIn === 'Succeed'){
        //   window.clearInterval(this.startCheckLogin);
        //   this.startCheckLogin = null;
        // } else if(this.counter > 5){
        //   window.clearInterval(this.startCheckLogin);
        //   this.startCheckLogin = null;
        // }
        this.counter++;
      })
    }

    
    recevingMsg = () => {
      console.log('recevingMsg...')
    }
}

