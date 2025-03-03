import { NgModule } from '@angular/core';
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  TitleCasePipe,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonErrorMessageComponent, SharedRoutingModule } from '.';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { provideNgxMask } from 'ngx-mask';

const FORM_MODULE = [FormsModule, ReactiveFormsModule, RxReactiveFormsModule];

const PIPE = [DatePipe, DecimalPipe, TitleCasePipe];

const SERVICES = [...PIPE];

@NgModule({
  declarations: [CommonErrorMessageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ...FORM_MODULE,
    SharedRoutingModule,
  ],
  exports: [...FORM_MODULE, CommonErrorMessageComponent],
  providers: [...SERVICES, provideNgxMask()],
})
export class SharedModule {}
