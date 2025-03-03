import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MODULES_NAME } from '@shared/constants/constants';

const routes: Routes = [
  { path: '', redirectTo: MODULES_NAME.EVENT_REGISTRATION, pathMatch: 'full' },
  {
    path: MODULES_NAME.EVENT_REGISTRATION,
    loadChildren: () =>
      import('./event-registration/event-registration.module').then(
        (event) => event.EventRegistrationModule
      ),
  },
  {
    path: MODULES_NAME.EVENTS,
    loadChildren: () =>
      import('./event/event.module').then(
        (events) => events.EventModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
