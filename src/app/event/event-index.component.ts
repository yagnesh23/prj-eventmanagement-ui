import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent, EVENTS } from '@app/shared';

@Component({
  selector: 'app-event-index',
  templateUrl: './event-index.component.html',
  styleUrl: './event-index.component.scss'
})
export class EventIndexComponent extends BaseComponent implements OnInit {
  public currentRoute: boolean;

  constructor(protected _injector: Injector) {
    super(_injector);
    this.currentRoute = false;
    this._router.events.subscribe((event: any) => {
      this.currentRoute = this._router.url?.includes(EVENTS.REGISTER);
    })
  }

  ngOnInit(): void {
  }

}
