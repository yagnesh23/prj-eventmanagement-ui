import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventMemberVerifyComponent } from './event-member-verify/event-member-verify.component';
import { EventIndexComponent } from './event-index.component';
import { EventMemberInfoComponent } from './event-member-info/event-member-info.component';
import { EventMemberRegisterComponent } from './event-member-register/event-member-register.component';
import { EventRegisterSuccessfullComponent } from './event-register-successfull/event-register-successfull.component';
import { SharedModule } from '@app/shared';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { EventAlreadyRegisteredComponent } from './event-already-registered/event-already-registered.component';

@NgModule({
  declarations: [
    EventMemberVerifyComponent,
    EventIndexComponent,
    EventMemberInfoComponent,
    EventMemberRegisterComponent,
    EventRegisterSuccessfullComponent,
    EventAlreadyRegisteredComponent,
  ],
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule,
    EventRoutingModule,
  ],
})
export class EventModule {}
