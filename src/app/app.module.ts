import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { QRCodeModule } from 'angular2-qrcode';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WechatAuthenticationService } from './wechat-authentication.service'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    QRCodeModule,
    FormsModule
  ],
  providers: [WechatAuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
