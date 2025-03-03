import { HostListener, Directive } from '@angular/core';
import { UnsavedChangesGuard } from '../guard/unsaved-changes-gaurd.guard';
/**
 * Usage example:
 *
 * @Component({
 *  //
 * })
 * export class MyComponent extends ComponentWithUnsavedChangesGuard {
 *           canDeactive() {
 *              // custom implementation
 *           }
 * }
 *
 * ................
 *
 * Importannt: dont forget to add the {@link UnsavedChangesGuard} to the route.
 *
 */
// tslint:disable: directive-class-suffix
@Directive()
export abstract class ComponentWithUnsavedChangesGuard {
  /**
   * Returns whether or not the component can be deactivated without showing a confirm box.
   * When false -> the user will ve confornted with a confirm message.
   * When true -> deactivated will continue.
   */
  abstract canDeactive(): boolean;

  /**
   * This will ensure that the canDeactive logic will apply when closing the browser tab.
   * @param  {} ['$event']
   */
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (!this.canDeactive()) {
      $event.returnValue = true;
    }
  }
}
