import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistrationExistedMemberComponent } from './event-registration-existed-member.component';

describe('EventRegistrationExistedMemberComponent', () => {
  let component: EventRegistrationExistedMemberComponent;
  let fixture: ComponentFixture<EventRegistrationExistedMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventRegistrationExistedMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventRegistrationExistedMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
