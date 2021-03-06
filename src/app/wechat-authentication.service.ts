import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class WechatAuthenticationService {

  constructor(public http:Http) { 

  }
  userId = '5a5b3e0c5e2550c9cb500181'
  username = 'tester'
  email = 'email'
  backendBase = 'https://wcap-backend.herokuapp.com/'
  customReplyArray = []
  getQRcode = function (){
    return this.http.get(this.backendBase + 'get-qrcode/' + this.userId)
  }
  checkLogin = function (qrcodeUrl){
    const qrcodeUrlArray = qrcodeUrl.split('/');
    const uuid = qrcodeUrlArray[qrcodeUrlArray.length - 1];
    const option = {
      method: 'POST'
    }
    const customReplyBody = {'customReply': this.customReplyArray }
    customReplyBody['userId'] = this.userId
    return this.http.post(this.backendBase + 'check-login/' + uuid, customReplyBody, option)
  }
  userLogin = function (email, password){
    const loginInfo = {
      email: email,
      password: password
    }
    console.log(loginInfo)
    return this.http.post(this.backendBase + 'login', loginInfo)
  }
  setUserId = function(user){
    this.userId = user._id
    this.username = user.username
    this.email = user.email
  }
  setCustomReply = function(customReplyArray){
    this.customReplyArray = customReplyArray
  }
}
