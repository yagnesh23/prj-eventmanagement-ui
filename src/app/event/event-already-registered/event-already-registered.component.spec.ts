import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAlreadyRegisteredComponent } from './event-already-registered.component';

describe('EventAlreadyRegisteredComponent', () => {
  let component: EventAlreadyRegisteredComponent;
  let fixture: ComponentFixture<EventAlreadyRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventAlreadyRegisteredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventAlreadyRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
