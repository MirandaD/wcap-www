import { Injectable } from '@angular/core';
import {Http, Request, RequestMethod, HttpModule} from '@angular/http';

@Injectable()
export class WechatAuthenticationService {

  constructor(public http:Http) { }
  getQRcode = function (){
    return this.http.get('http://localhost:3001/get-qrcode')
  }
  checkLogin = function (qrcodeUrl){
    const qrcodeUrlArray = qrcodeUrl.split('/');
    const uuid = qrcodeUrlArray[qrcodeUrlArray.length - 1];
    return this.http.get('http://localhost:3001/check-login/' + uuid)
  }
}
