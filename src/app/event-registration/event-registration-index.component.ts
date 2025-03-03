import { Component } from '@angular/core';

@Component({
  selector: 'app-event-registration-index',
  template: `
    <div class="event-registration">
      <div class="event-registration__wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrl: './event-registration-index.component.scss'
})
export class EventRegistrationIndexComponent {
}
