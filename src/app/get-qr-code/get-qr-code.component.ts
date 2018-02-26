import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { WechatAuthenticationService } from '../wechat-authentication.service';

@Component({
  selector: 'app-get-qr-code',
  templateUrl: './get-qr-code.component.html',
  styleUrls: ['./get-qr-code.component.css']
})
export class GetQrCodeComponent implements OnInit {
  logo = '../../assets/logo-blue.png';
  startingChatbot = false;
  loggedIn = {};
  errorMessage = '';
  @Input() qrCodeUrl

  constructor(private wechatAuthenticationService: WechatAuthenticationService) { }

  ngOnInit() {
  }
  checkLogin = () => {
    this.startingChatbot = true;
    const customReplyMsgArray = [];
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

}
