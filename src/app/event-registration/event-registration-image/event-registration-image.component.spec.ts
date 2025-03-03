import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegistrationImageComponent } from './event-registration-image.component';

describe('EventRegistrationImageComponent', () => {
  let component: EventRegistrationImageComponent;
  let fixture: ComponentFixture<EventRegistrationImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventRegistrationImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventRegistrationImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
