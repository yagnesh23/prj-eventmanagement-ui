import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { COMMON_ROUTE_URL, EVENT_REGISTRATION_MODULE } from '@shared/index';
import {
  EventRegistrationDetailsComponent,
  EventRegistrationImageComponent,
  EventRegistrationIndexComponent,
} from '.';
import { EventRegistrationVerifyComponent } from './event-registration-verify/event-registration-verify.component';
import { EventRegistrationExistedMemberComponent } from './event-registration-existed-member/event-registration-existed-member.component';
import { EventRegistrationThankYouScreenComponent } from './event-registration-thank-you-screen/event-registration-thank-you-screen.component';
import { EventRegistrationAlreadyMemberScreenComponent } from './event-registration-already-member-screen/event-registration-already-member-screen.component';
const routes: Routes = [
  {
    path: COMMON_ROUTE_URL.EMPTY,
    component: EventRegistrationIndexComponent,
    children: [
      {
        path: COMMON_ROUTE_URL.EMPTY,
        pathMatch: 'full',
        redirectTo: EVENT_REGISTRATION_MODULE.INFO,
      },
      {
        path: EVENT_REGISTRATION_MODULE.INFO,
        component: EventRegistrationImageComponent,
      },
      {
        path: EVENT_REGISTRATION_MODULE.DETAILS,
        component: EventRegistrationDetailsComponent,
      },
      {
        path: EVENT_REGISTRATION_MODULE.VERIFY,
        component: EventRegistrationVerifyComponent,
      },
      {
        path: EVENT_REGISTRATION_MODULE.EXISTED_MEMBER,
        component: EventRegistrationExistedMemberComponent,
      },
      {
        path: EVENT_REGISTRATION_MODULE.THANK_YOU,
        component: EventRegistrationThankYouScreenComponent,
      },
      {
        path: EVENT_REGISTRATION_MODULE.ALREADY_MEMBER,
        component: EventRegistrationAlreadyMemberScreenComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRegistrationRoutingModule { }
