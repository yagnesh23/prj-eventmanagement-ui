import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { COMMON_ROUTE_URL, EVENT_REGISTRATION_MODULE } from '@shared/index';
import {
  EventRegistrationDetailsComponent,
  EventRegistrationImageComponent,
  EventRegistrationIndexComponent,
} from '.';
import { EventRegistrationThankYouScreenComponent } from './event-registration-thank-you-screen/event-registration-thank-you-screen.component';
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
        path: EVENT_REGISTRATION_MODULE.THANK_YOU,
        component: EventRegistrationThankYouScreenComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRegistrationRoutingModule { }
