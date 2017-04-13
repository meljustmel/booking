import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnChanges,
  OnInit,
  OnDestroy,
  LOCALE_ID,
  Inject,
  TemplateRef
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import {
  WeekDay,
  CalendarEvent,
  WeekViewEventRow,
  getWeekViewHeader,
  getWeekView
} from 'calendar-utils';
import { addDays } from 'date-fns';

@Component({
  selector: 'week-view',
  template: `
    <div class="cal-week-view" #weekViewContainer>
      <week-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayClicked)="dayClicked.emit($event)">
      </week-view-header>
      <div *ngFor="let eventRow of eventRows" #eventRowContainer>
        <div
          class="cal-event-container"
          #event
          [class.cal-draggable]="weekEvent.event.draggable"
          *ngFor="let weekEvent of eventRow.row"
          [style.width]="((100 / days.length) * weekEvent.span) + '%'"
          [style.marginLeft]="((100 / days.length) * weekEvent.offset) + '%'">
          <week-view-event
            [weekEvent]="weekEvent"
            [tooltipPlacement]="tooltipPlacement"
            [customTemplate]="eventTemplate"
            (eventClicked)="eventClicked.emit({event: weekEvent.event})">
          </week-view-event>
        </div>
      </div>
    </div>
  `
})
export class CalendarWeekViewComponent implements OnChanges, OnInit, OnDestroy {

  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * An array of events to display on view
   */
  @Input() events: CalendarEvent[] = [];

  /**
   * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
   */
  @Input() excludeDays: number[] = [];

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
  @Input() tooltipPlacement = 'bottom';

  /**
   * The start number of the week
   */
  @Input() weekStartsOn: number;

  /**
   * A custom template to use to replace the header
   */
  @Input() headerTemplate: TemplateRef<any>;

  /**
   * A custom template to use for week view events
   */
  @Input() eventTemplate: TemplateRef<any>;

  /**
   * Called when a header week day is clicked
   */
  @Output() dayClicked: EventEmitter<{date: Date}> = new EventEmitter<{date: Date}>();

  /**
   * Called when the event title is clicked
   */
  @Output() eventClicked: EventEmitter<{event: CalendarEvent}> = new EventEmitter<{event: CalendarEvent}>();

  /**
   * Called when an event is resized or dragged and dropped
   */
  // @Output() eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent> = new EventEmitter<CalendarEventTimesChangedEvent>();

  /**
   * @hidden
   */
  days: WeekDay[];

  /**
   * @hidden
   */
  eventRows: WeekViewEventRow[] = [];

  /**
   * @hidden
   */
  refreshSubscription: Subscription;


  constructor(private cdr: ChangeDetectorRef, @Inject(LOCALE_ID) locale: string) {
    this.locale = locale;
  }

  /**
   * @hidden
   */
  ngOnInit(): void {
    if (this.refresh) {
      this.refreshSubscription = this.refresh.subscribe(() => {
        this.refreshAll();
        this.cdr.markForCheck();
      });
    }
  }

  /**
   * @hidden
   */
  ngOnChanges(changes: any): void {

    if (changes.viewDate || changes.excludeDays) {
      this.refreshHeader();
    }

    if (changes.events || changes.viewDate || changes.excludeDays) {
      this.refreshBody();
    }

  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  getDayColumnWidth(eventRowContainer: HTMLElement): number {
    return Math.floor(eventRowContainer.offsetWidth / this.days.length);
  }

  private refreshHeader(): void {
    this.days = getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays
    });
  }

  private refreshBody(): void {
    this.eventRows = getWeekView({
      events: this.events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays
    });
  }

  private refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
  }

}
