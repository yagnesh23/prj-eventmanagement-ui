import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMemberRegisterComponent } from './event-member-register.component';

describe('EventMemberRegisterComponent', () => {
  let component: EventMemberRegisterComponent;
  let fixture: ComponentFixture<EventMemberRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventMemberRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventMemberRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
