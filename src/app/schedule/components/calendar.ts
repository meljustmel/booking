import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  LOCALE_ID,
  Inject,
  OnChanges,
  OnInit,
  OnDestroy
} from "@angular/core";
import {CalendarEvent, WeekDay, MonthView, getWeekViewHeader, getMonthView, MonthViewDay} from "calendar-utils";
import {isSameDay} from "date-fns";
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import {FormGroup} from "@angular/forms";
// import {CalendarEventTimesChangedEvent} from "../interfaces/calendarEventTimesChangedEvent.interface";


/**
 * Shows all events on a given month. Example usage:
 *
 * ```
 * <calendar
 *  [viewDate]="viewDate"
 *  [events]="events"
 * calendar>
 * ```
 */
@Component({
  selector: 'calendar',
  template: `
    <div  class="cal-month-view chrome">
      <div class="cal-cell-row cal-header">
        <div
          class="cal-cell"
          *ngFor="let header of columnHeaders"
          [class.cal-past]="header.isPast"
          [class.cal-today]="header.isToday"
          [class.cal-future]="header.isFuture"
          [class.cal-weekend]="header.isWeekend">
          {{ header.date | calendarDate:'monthViewColumnHeader':locale }}
        </div>
      </div>
      <div class="cal-days">
        <div *ngFor="let rowIndex of view.rowOffsets">
          <div class="cal-cell-row">
            <month-cell
              ngDefaultControl
              *ngFor="let day of view.days | slice : rowIndex : rowIndex + 7"
              [day]="day"
              [openDay]="openDay"
              [locale]="locale"
              [tooltipPlacement]="tooltipPlacement"
              (click)="dayClicked.emit({day: day})"
              (highlightDay)="toggleDayHighlight($event.event, true)"
              (unhighlightDay)="toggleDayHighlight($event.event, false)"
              
              (eventClicked)="eventClicked.emit({event: $event.event})">
            </month-cell>
          </div>
        
          <calendar-open-day
            (select)="onDateSelect($event)"
            [isOpen]="openRowIndex === rowIndex"
            [events]="openDay?.events"
            
            (eventClicked)="eventClicked.emit({event: $event.event})">
          </calendar-open-day>
        </div>
      </div>
    </div>
  `,
})
export class CalendarComponent implements OnChanges, OnInit, OnDestroy {

  // @Input() parent: FormGroup;

  @Output() select = new EventEmitter<Date>();

  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * An array of events to display on view
   */
  @Input() events: CalendarEvent[] = [];
  /**
   * An array of events to display on view
   */
  @Input() slots;
  /**
   * An array of slots to display on view
   */
  @Input() availability;

  /**
   * Whether the events list for the day of the `viewDate` option is visible or not
   */
  @Input() activeDayIsOpen = false;

  /**
   * A function that will be called before each cell is rendered. The first argument will contain the calendar cell.
   * If you add the `cssClass` property to the cell it will add that class to the cell in the template
   */
  @Input() dayModifier: Function;

  /**
   * An observable that when emitted on will re-render the current view
   */
  @Input() refresh: Subject<any>;

  /**
   * The locale used to format dates
   */
  @Input() locale: string;

  /**
   * The placement of the event tooltip
   */
  @Input() tooltipPlacement = 'top';

  /**
   * The start number of the week
   */
  @Input() weekStartsOn: number;

  /**
   * Called when the day cell is clicked
   */
  @Output() dayClicked: EventEmitter<{day: MonthViewDay}> = new EventEmitter<{day: MonthViewDay}>();

  /**
   * Called when the event title is clicked
   */
  @Output() eventClicked: EventEmitter<{event: CalendarEvent}> = new EventEmitter<{event: CalendarEvent}>();

  /**
   * Called when an event is dragged and dropped
   */
  // @Output() eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent> = new EventEmitter<CalendarEventTimesChangedEvent>();


  columnHeaders: WeekDay[];


  view: MonthView;


  openRowIndex: number;


  openDay: MonthViewDay;


  refreshSubscription: Subscription;


  constructor(private cdr: ChangeDetectorRef, @Inject(LOCALE_ID) locale: string) {
    this.locale = locale;
  }


  ngOnInit(): void {
    // this.slots$ = this._reservations.getAllSlots();
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.refreshAll();
        this.cdr.markForCheck();
      });
    }
  }


  ngOnChanges(changes: any): void {

    if (changes.viewDate) {
      this.refreshHeader();
    }

    if (changes.viewDate || changes.events) {
      this.refreshBody();
    }

    if (changes.activeDayIsOpen || changes.viewDate || changes.events) {
      this.checkActiveDayIsOpen();
    }

  }


  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }


  toggleDayHighlight(event: CalendarEvent, isHighlighted: boolean): void {
    this.view.days.forEach(day => {
      if (isHighlighted && day.events.indexOf(event) > -1) {
        day.backgroundColor = event.color.secondary;
      } else {
        delete day.backgroundColor;
      }
    });
  }

  private refreshHeader(): void {
    this.columnHeaders = getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn
    });
  }

  private refreshBody(): void {
    this.view = getMonthView({
      events: this.events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn
    });
    if (this.dayModifier) {
      this.view.days.forEach(day => this.dayModifier(day));
    }
  }

  private checkActiveDayIsOpen(): void {
    if (this.activeDayIsOpen === true) {
      this.openDay = this.view.days.find(day => isSameDay(day.date, this.viewDate));
      const index: number = this.view.days.indexOf(this.openDay);
      this.openRowIndex = Math.floor(index / 7) * 7;
    } else {
      this.openRowIndex = null;
      this.openDay = null;
    }
  }

  private refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
    this.checkActiveDayIsOpen();
  }

}
