import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCustomReplyComponent } from './set-custom-reply.component';

describe('SetCustomReplyComponent', () => {
  let component: SetCustomReplyComponent;
  let fixture: ComponentFixture<SetCustomReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetCustomReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCustomReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
