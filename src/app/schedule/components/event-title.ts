import { Component, Input } from '@angular/core';
import { CalendarEvent } from '../utils/calendar-utils';

@Component({
  selector: 'event-title',
  template: `
    <div class="postMetaInline-avatar u-flex0">
      <a class="link avatar u-baseColor--link"
         href="javascript:;">
        <img alt="Go to the profile of" 
             class="avatar-image u-size24x24" 
             [src]="event?.client.avatar"> <p> {{ event.client.name | first:' ' }} @ {{ event.time | time }}</p>
        <!--{{ event.reservation.reservationFullDate | date: 'short' }}-->
        <!--{{ event.reservations.reservationTime | calendarEventTitle:view:event }}-->
       <!--{{ event.time | calendarEventTitle:view:event }}-->
       
      </a>
    </div>
  `,
  styles: [`
    p {
      margin-bottom: 10px;
      display: inline-block;
      margin-left: 10px;
      padding: .5em;
    }
  `]
})
export class CalendarEventTitleComponent {

  @Input() event: CalendarEvent;

  @Input() view: string;

}
