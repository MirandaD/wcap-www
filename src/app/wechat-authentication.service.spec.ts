import { TestBed, inject } from '@angular/core/testing';

import { WechatAuthenticationService } from './wechat-authentication.service';

describe('WechatAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WechatAuthenticationService]
    });
  });

  it('should be created', inject([WechatAuthenticationService], (service: WechatAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
