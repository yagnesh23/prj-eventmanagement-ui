import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegisterSuccessfullComponent } from './event-register-successfull.component';

describe('EventRegisterSuccessfullComponent', () => {
  let component: EventRegisterSuccessfullComponent;
  let fixture: ComponentFixture<EventRegisterSuccessfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventRegisterSuccessfullComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventRegisterSuccessfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
