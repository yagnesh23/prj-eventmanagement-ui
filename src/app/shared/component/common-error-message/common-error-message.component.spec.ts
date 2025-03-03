import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonErrorMessageComponent } from './common-error-message.component';

describe('CommonErrorMessageComponent', () => {
  let component: CommonErrorMessageComponent;
  let fixture: ComponentFixture<CommonErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonErrorMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
