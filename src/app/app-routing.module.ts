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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
