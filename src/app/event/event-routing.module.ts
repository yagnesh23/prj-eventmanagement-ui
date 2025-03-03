import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { COMMON_ROUTE_URL, EVENTS } from '@app/shared';
import { EventMemberVerifyComponent } from './event-member-verify/event-member-verify.component';
import { EventIndexComponent } from './event-index.component';
import { EventMemberInfoComponent } from './event-member-info/event-member-info.component';
import { EventMemberRegisterComponent } from './event-member-register/event-member-register.component';
import { EventRegisterSuccessfullComponent } from './event-register-successfull/event-register-successfull.component';
import { EventAlreadyRegisteredComponent } from './event-already-registered/event-already-registered.component';

const routes: Routes = [
  {
    path: COMMON_ROUTE_URL.EMPTY,
    component: EventIndexComponent,
    children: [
      {
        path: COMMON_ROUTE_URL.EMPTY,
        pathMatch: 'full',
        redirectTo: EVENTS.VERIFY,
      },
      {
        path: EVENTS.VERIFY,
        component: EventMemberVerifyComponent,
      },
      {
        path: EVENTS.MEMBER,
        component: EventMemberInfoComponent,
      },
      {
        path: EVENTS.REGISTER,
        component: EventMemberRegisterComponent,
      },
      {
        path: EVENTS.REGISTER_SUCCESSFULL,
        component: EventRegisterSuccessfullComponent,
      },
      {
        path: EVENTS.ALREADY_REGISTER,
        component: EventAlreadyRegisteredComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
