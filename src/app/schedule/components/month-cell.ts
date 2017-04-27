import {Component, Input, Output, EventEmitter, forwardRef} from "@angular/core";
import {MonthViewDay, CalendarEvent} from "../utils/calendar-utils";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";

const CALENDAR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CalendarMonthCellComponent),
  multi: true
};

@Component({
  selector: 'month-cell',
  template: `
<div (click)="onDateSelect(day.date)">
<div class="cal-cell-top">
      <span class="cal-day-badge" *ngIf="day.badgeTotal > 0">{{ day.badgeTotal }}</span>
      <span class="cal-day-number">{{ day.date | calendarDate:'monthViewDayNumber':locale }}</span>
    </div>
    <div *ngIf="day.events" class="cal-events" >
      <div
        class="cal-event"
        *ngFor="let event of day.events"
        [style.backgroundColor]="event.color.primary"
        [ngClass]="event?.cssClass"
        (mouseenter)="highlightDay.emit({event: event})"
        (mouseleave)="unhighlightDay.emit({event: event})"
        [mwlCalendarTooltip]="event.title | calendarEventTitle:'monthTooltip':event"
        [tooltipPlacement]="tooltipPlacement"
        
        (click)="$event.stopPropagation(); eventClicked.emit({event: event})">
      </div>
    </div>
</div>
    
  `,
  host: {
    '[class]': '"cal-cell cal-day-cell " + day?.cssClass',
    '[class.cal-past]': 'day.isPast',
    '[class.cal-today]': 'day.isToday',
    '[class.cal-future]': 'day.isFuture',
    '[class.cal-weekend]': 'day.isWeekend',
    '[class.cal-in-month]': 'day.inMonth',
    '[class.cal-out-month]': '!day.inMonth',
    '[class.cal-has-events]': 'day.events.length > 0',
    '[class.cal-open]': 'day === openDay',
    '[style.backgroundColor]': 'day.backgroundColor'
  },
  providers: [CALENDAR_VALUE_ACCESSOR]
})
export class CalendarMonthCellComponent implements ControlValueAccessor {
  value: any = Date.now();

  @Input() day: MonthViewDay;

  @Input() openDay: MonthViewDay;

  @Input() locale: string;

  @Input() tooltipPlacement: string;

  @Output() highlightDay: EventEmitter<any> = new EventEmitter();

  @Output() unhighlightDay: EventEmitter<any> = new EventEmitter();

  @Output() eventClicked: EventEmitter<{event: CalendarEvent}> = new EventEmitter<{event: CalendarEvent}>();

  onModelChange: Function = (_: any) => {
  }
  onModelTouched: Function = () => {
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  writeValue(value) {
    this.value = value || 0;
  }

  onDateSelect(day: Date) {
    if (this.value !== day) {

      let selectedDay = new Date(day).toDateString();
      selectedDay = selectedDay.split(' ').slice(0, 4).join(' ')
      console.log(selectedDay);
      this.writeValue(selectedDay);
      this.onModelChange(this.value);

    }
    this.onModelTouched();
  }




}
