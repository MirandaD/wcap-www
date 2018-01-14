import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WechatAuthenticationService} from './wechat-authentication.service';
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
  errorMessage = '';

  email = '';
  password = '';
  userLoggedIn = true;

  canCheckLogin = false;
  customReply={
    default: 'Welcome!',
    new_friend: 'Nice to meet you!'
  };
  constructor(private wechatAuthenticationService: WechatAuthenticationService) {}
  getQRcode = function () {
    this.wechatAuthenticationService.getQRcode()
      .subscribe((res: Response) => {
        this.qrCodeUrl = res.text();
        console.log('qrCode returned')
        this.canCheckLogin = true
      },
      (error)=>{console.log(error);},
    );
  }

  checkLogin = () => {
    const customReplyMsgArray = []
    for (let key in this.customReply) {
      const customMsg = {key: key, value: this.customReply[key]}
      customReplyMsgArray.push(customMsg)
    }
      this.wechatAuthenticationService.checkLogin(this.qrCodeUrl, {customReply: customReplyMsgArray})
      .subscribe((res) => {
        this.loggedIn = res.text();
      },
      (error)=>{
        console.log(error)
        const errorStatus = error.status
        switch (errorStatus) {
          case 400:
            this.errorMessage = 'Please scan the qr code below and login from your phone.'
            break;
          case 408:
            this.errorMessage = 'Please scan the qr code and confirm login on the phone.'
            break;
          case 404:
          case 0:
            this.errorMessage = 'Please obtain the qr code first by clicking on the button.'
          break;
          case 500:
            this.errorMessage = 'Server Error. Please retry.'
            break;
          default:
            this.errorMessage = 'Unknow error'
            break;
        }
      }
    )
    }

    userLogin = ()=>{
      this.wechatAuthenticationService.userLogin(this.email, this.password)
      .subscribe((res) => {
        console.log(res.json())
        this.wechatAuthenticationService.setUserId(res.json())
        this.userLoggedIn = true
      },
      (error)=>{
        const errorStatus = error.status
        switch (errorStatus) {
          case 401:
            this.errorMessage = 'Wrong username/password'
            break;
          case 404:
          case 0:
            this.errorMessage = 'Unable to login.'
          break;
          case 500:
            this.errorMessage = 'Server Error. Please retry.'
            break;
          default:
            this.errorMessage = 'Unknow error'
            break;
        }
      })
    }

    closeAlert = ()=>{
      this.errorMessage = ''
    }
}

