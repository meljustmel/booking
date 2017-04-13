import { Component, Input } from '@angular/core';
import { DayViewHourSegment } from '../utils/calendar-utils';

@Component({
  selector: 'day-view-hour-segment',
  template: `
    <div class="cal-hour-segment" [ngClass]="segment.cssClass">
      <div [hidden]="!segment.isStart" class="cal-time">
        {{ segment.date | calendarDate:'dayViewHour':locale }}
      </div>
    </div>
  `
})
export class CalendarDayViewHourSegmentComponent {

  @Input() segment: DayViewHourSegment;

  @Input() locale: string;

}
