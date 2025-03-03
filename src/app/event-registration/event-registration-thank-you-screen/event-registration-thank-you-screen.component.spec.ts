import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistrationThankYouScreenComponent } from './event-registration-thank-you-screen.component';

describe('EventRegistrationThankYouScreenComponent', () => {
  let component: EventRegistrationThankYouScreenComponent;
  let fixture: ComponentFixture<EventRegistrationThankYouScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventRegistrationThankYouScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventRegistrationThankYouScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
