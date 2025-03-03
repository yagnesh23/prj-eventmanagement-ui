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
import { EventRegistrationVerifyComponent } from './event-registration-verify/event-registration-verify.component';
import { EventRegistrationExistedMemberComponent } from './event-registration-existed-member/event-registration-existed-member.component';
import { EventRegistrationThankYouScreenComponent } from './event-registration-thank-you-screen/event-registration-thank-you-screen.component';
import { EventRegistrationAlreadyMemberScreenComponent } from './event-registration-already-member-screen/event-registration-already-member-screen.component';

@NgModule({
  declarations: [
    EventRegistrationIndexComponent,
    EventRegistrationImageComponent,
    EventRegistrationDetailsComponent,
    EventRegistrationVerifyComponent,
    EventRegistrationExistedMemberComponent,
    EventRegistrationThankYouScreenComponent,
    EventRegistrationAlreadyMemberScreenComponent,
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
