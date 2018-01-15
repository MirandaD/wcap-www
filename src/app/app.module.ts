import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { QRCodeModule } from 'angular2-qrcode';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WechatAuthenticationService } from './wechat-authentication.service';
import { SetCustomReplyComponent } from './set-custom-reply/set-custom-reply.component';
import { GetQrCodeComponent } from './get-qr-code/get-qr-code.component'


@NgModule({
  declarations: [
    AppComponent,
    SetCustomReplyComponent,
    GetQrCodeComponent
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
