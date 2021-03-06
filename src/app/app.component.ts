import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WechatAuthenticationService} from './wechat-authentication.service';
import { Time } from '@angular/common/src/i18n/locale_data_api';
import { SetCustomReplyComponent } from './set-custom-reply/set-custom-reply.component'

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

  qrCodeReturned = false;
  customReply={
    default: 'Welcome!',
    new_friend: 'Nice to meet you!'
  };
  startingChatbot = false;
  isCustomMsgSetup = false
  constructor(private wechatAuthenticationService: WechatAuthenticationService) {}
  getQRcode = function () {
    this.wechatAuthenticationService.getQRcode()
      .subscribe((res: Response) => {
        this.qrCodeUrl = res.text();
        console.log('qrCode returned')
        this.qrCodeReturned = true
      },
      (error)=>{console.log(error);},
    );
  }

  checkLogin = () => {
    this.startingChatbot = true;
    const customReplyMsgArray = [];
    for (let key in this.customReply) {
      const customMsg = { key: key, value: this.customReply[key] }
      customReplyMsgArray.push(customMsg)
    }
    this.wechatAuthenticationService.checkLogin(this.qrCodeUrl)
      .subscribe((res) => {
        this.loggedIn = res.text();
      },
      (error) => {
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
      },
      () => {
        this.startingChatbot = false
      }
      )
  }

    userLogin = ()=>{
      this.wechatAuthenticationService.userLogin(this.email, this.password)
      .subscribe((res) => {
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

    enableCheckLogin = ()=>{
      // when will the check login button showable?
      // 1. qrcode returned 2. checking not started 3. not loggedin already
      return this.qrCodeReturned && !this.startingChatbot && !this.loggedIn
    }

    closeAlert = ()=>{
      this.errorMessage = ''
    }
}

