import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WechatAuthenticationService } from '../wechat-authentication.service';
@Component({
  selector: 'app-set-custom-reply',
  templateUrl: './set-custom-reply.component.html',
  styleUrls: ['./set-custom-reply.component.css']
})
export class SetCustomReplyComponent implements OnInit {
  @Input() isCustomMsgSetup
  @Output() isCustomMsgSetupChange = new EventEmitter<boolean>();
  customReply={
    default: 'Welcome!',
    new_friend: 'Nice to meet you!'
  };
  constructor(private wechatAuthenticationService: WechatAuthenticationService) { }

  ngOnInit() {
    console.log(this.isCustomMsgSetup)
  }
  setUpCustomReply = () => {
    const customReplyMsgArray = []
    for (let key in this.customReply) {
      const customMsg = { key: key, value: this.customReply[key] }
      customReplyMsgArray.push(customMsg)
    }
    this.wechatAuthenticationService.setCustomReply(customReplyMsgArray)
    this.isCustomMsgSetup = true
    this.isCustomMsgSetupChange.emit(true)
    console.log('set',customReplyMsgArray)
  }
}

