import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-common-error-message',
  templateUrl: './common-error-message.component.html',
})
export class CommonErrorMessageComponent implements OnInit, OnChanges {
  @Input() submitted: boolean;
  @Input() formName: string;
  // tslint:disable-next-line
  @Input() formControlErrors!: any;
  @Input() customMessage?: string;
  constructor() {
    this.submitted = false;
    this.formName = '';
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['submitted']?.currentValue) {
      this.submitted = changes['submitted'].currentValue;
    }
  }
}
