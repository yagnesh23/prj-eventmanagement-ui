import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/index';

import {
  EventRegistrationDetailsComponent,
  EventRegistrationImageComponent,
  EventRegistrationIndexComponent,
  EventRegistrationRoutingModule,
} from '.';

import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { EventRegistrationThankYouScreenComponent } from './event-registration-thank-you-screen/event-registration-thank-you-screen.component';

@NgModule({
  declarations: [
    EventRegistrationIndexComponent,
    EventRegistrationImageComponent,
    EventRegistrationDetailsComponent,
    EventRegistrationThankYouScreenComponent,
  ],
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule,
    EventRegistrationRoutingModule,
  ],
})
export class EventRegistrationModule {}
