import { Component, Input } from '@angular/core';
import { CalendarEvent } from '../utils/calendar-utils';

@Component({
  selector: 'event-actions',
  template: `
    <span *ngIf="event.actions" class="cal-event-actions">
      <a
        class="cal-event-action"
        href="javascript:;"
        *ngFor="let action of event.actions"
        (click)="action.onClick({event: event})"
        [ngClass]="action.cssClass"
        [innerHtml]="action.label">
      </a>
    </span>
  `
})
export class EventActionsComponent {

  @Input() event: CalendarEvent;

}
