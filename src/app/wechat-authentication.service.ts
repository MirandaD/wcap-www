import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class WechatAuthenticationService {

  constructor(public http:Http) { 

  }
  userId = '5a5b3e0c5e2550c9cb500181'
  username = 'tester'
  email = 'email'
  getQRcode = function (){
    return this.http.get('http://localhost:3001/get-qrcode/' + this.userId)
  }
  checkLogin = function (qrcodeUrl, customReplyBody){
    const qrcodeUrlArray = qrcodeUrl.split('/');
    const uuid = qrcodeUrlArray[qrcodeUrlArray.length - 1];
    const option = {
      method: 'POST'
    }
    customReplyBody['userId'] = this.userId
    return this.http.post('http://localhost:3001/check-login/' + uuid, customReplyBody, option)
  }
  userLogin = function (email, password){
    const loginInfo = {
      email: email,
      password: password
    }
    console.log(loginInfo)
    return this.http.post('http://localhost:3001/login', loginInfo)
  }
  setUserId = function(user){
    this.userId = user._id
    this.username = user.username
    this.email = user.email
  }
}
