import {Component, EventEmitter, Input, Output} from "@angular/core";
import {
  trigger,
  style,
  transition,
  animate
} from '@angular/animations';
import {CalendarEvent} from "../utils/calendar-utils";

@Component({
  selector: 'calendar-open-day',
  template: `
    <div [@collapse] class="cal-open-day-events" *ngIf="isOpen">
      <div *ngFor="let event of events"
        [ngClass]="event?.cssClass">
        <!--<span-->
          <!--class="cal-event"-->
          <!--[style.backgroundColor]="event.color.primary">-->
        <!--</span>-->
        <event-title
          [event]="event"
          view="month"
          (click)="eventClicked.emit({event: event})">
        </event-title>
        <event-actions [event]="event"></event-actions>
      </div>
    </div>
  `,
  animations: [
    trigger('collapse', [
      transition('void => *', [
        style({height: 0}),
        animate('150ms ease-in-out', style({height: '*'}))
      ]),
      transition('* => void', [
        style({height: '*'}),
        animate('150ms ease-in', style({height: 0}))
      ])
    ])
  ]
})
export class CalendarOpenDayEventsComponent {

  @Input() isOpen = false;

  @Input() events: CalendarEvent[];

  @Output() eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{ event: CalendarEvent }>();

}
