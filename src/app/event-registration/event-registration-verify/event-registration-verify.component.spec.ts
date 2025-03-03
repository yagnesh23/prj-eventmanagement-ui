import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistrationVerifyComponent } from './event-registration-verify.component';

describe('EventRegistrationVerifyComponent', () => {
  let component: EventRegistrationVerifyComponent;
  let fixture: ComponentFixture<EventRegistrationVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventRegistrationVerifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventRegistrationVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
