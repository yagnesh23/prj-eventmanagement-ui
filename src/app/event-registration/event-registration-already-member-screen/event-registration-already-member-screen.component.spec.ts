import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistrationAlreadyMemberScreenComponent } from './event-registration-already-member-screen.component';

describe('EventRegistrationAlreadyMemberScreenComponent', () => {
  let component: EventRegistrationAlreadyMemberScreenComponent;
  let fixture: ComponentFixture<EventRegistrationAlreadyMemberScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventRegistrationAlreadyMemberScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventRegistrationAlreadyMemberScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
