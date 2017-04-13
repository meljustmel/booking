import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CalendarEvent, WeekDay } from 'calendar-utils';

@Component({
  selector: 'week-view-header',
  template: `
    <ng-template #defaultTemplate>
      <div class="cal-day-headers">
        <div
          class="cal-header"
          *ngFor="let day of days"
          [class.cal-past]="day.isPast"
          [class.cal-today]="day.isToday"
          [class.cal-future]="day.isFuture"
          [class.cal-weekend]="day.isWeekend"
          (click)="dayClicked.emit({date: day.date})">
          <b>{{ day.date | calendarDate:'weekViewColumnHeader':locale }}</b><br>
          <span>{{ day.date | calendarDate:'weekViewColumnSubHeader':locale }}</span>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{days: days, locale: locale, dayClicked: dayClicked}">
    </ng-template>
  `
})
export class CalendarWeekViewHeaderComponent {

  @Input() days: WeekDay[];

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

  @Output() dayClicked: EventEmitter<{date: Date}> = new EventEmitter<{date: Date}>();


}
