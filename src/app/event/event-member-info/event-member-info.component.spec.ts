import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMemberInfoComponent } from './event-member-info.component';

describe('EventMemberInfoComponent', () => {
  let component: EventMemberInfoComponent;
  let fixture: ComponentFixture<EventMemberInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventMemberInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventMemberInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
