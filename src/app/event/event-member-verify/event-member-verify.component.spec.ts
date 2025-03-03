import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMemberVerifyComponent } from './event-member-verify.component';

describe('EventMemberVerifyComponent', () => {
  let component: EventMemberVerifyComponent;
  let fixture: ComponentFixture<EventMemberVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventMemberVerifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventMemberVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
