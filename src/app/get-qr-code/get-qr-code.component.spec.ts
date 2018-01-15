import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetQrCodeComponent } from './get-qr-code.component';

describe('GetQrCodeComponent', () => {
  let component: GetQrCodeComponent;
  let fixture: ComponentFixture<GetQrCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetQrCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
