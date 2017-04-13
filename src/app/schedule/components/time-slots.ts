import {
  Component,
  Input,
  trigger,
  style,
  transition,
  animate,
  Output,
  EventEmitter
} from '@angular/core';
import { CalendarEvent } from '../utils/calendar-utils';

@Component({
  selector: 'timeslots',
  template: `
    <div class="cal-open-day-events" [@collapse] *ngIf="isOpen">
      <div
        *ngFor="let slot of slots"
        [ngClass]="slot?.cssClass"
        >
        <button>{{slot?.header}}</button>
        <span
          class="cal-event"
          [style.backgroundColor]="red">
        </span>
        <!--<event-title-->
          <!--[event]="slot"-->
          <!--view="month"-->
          <!--(click)="eventClicked.emit({event: event})">-->
        <!--</event-title>-->
        <!--<event-actions [event]="event"></event-actions>-->
      </div>
    </div>
  `,
  animations: [
    trigger('collapse', [
      transition('void => *', [
        style({height: 0}),
        animate('150ms linear', style({height: '*'}))
      ]),
      transition('* => void', [
        style({height: '*'}),
        animate('150ms linear', style({height: 0}))
      ])
    ])
  ]
})
export class TimeSlotsComponent {

  @Input() isOpen: boolean = false;

  @Input() events: CalendarEvent[];

  @Input() slots;

  @Output() eventClicked: EventEmitter<{event: CalendarEvent}> = new EventEmitter<{event: CalendarEvent}>();

}
