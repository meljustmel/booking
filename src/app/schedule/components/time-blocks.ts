import {
  Component,
  Input,
  trigger,
  style,
  transition,
  animate,
  ChangeDetectorRef,
  OnChanges,
  OnInit,
  OnDestroy,
  LOCALE_ID,
  Inject, Output, EventEmitter, forwardRef
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { WeekDay,
  CalendarEvent,
  WeekViewEvent,
  WeekViewEventRow,
  getWeekViewHeader,
  getWeekView } from '../utils/calendar-utils';
import {CalendarEventTimesChangedEvent} from "../interfaces/calendarEventTimesChangedEvent.interface";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";

const TIME_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimePickerComponent),
  multi: true
};
@Component({
  selector: 'time-picker',
  template: `
    <div class="cal-week-view" #weekViewContainer [@collapse] *ngIf="isOpen">
      <div class="cal-day-headers">
        <view-header (click)="onTimeSelect(slot.hour)"
          *ngFor="let slot of slots"
          [day]="slot"
          [locale]="locale"
          (click)="dayClicked.emit({date: slot.date})"
          >
        </view-header>
      </div>
      <!--<div *ngFor="let eventRow of eventRows" #eventRowContainer>-->
        <!--<div-->
          <!--class="cal-event-container"-->
          <!--#event-->
          <!--*ngFor="let weekEvent of eventRow.row"-->
          <!--[style.width]="((100 / 7) * weekEvent.span) + '%'"-->
          <!--[style.marginLeft]="((100 / 7) * weekEvent.offset) + '%'"-->
          <!--&gt;shit-->
      <!---->
        <!--</div>-->
      <!--</div>-->
    </div>
  `,
  styles: [`
    
  `],
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
  ],
  providers: [TIME_VALUE_ACCESSOR]
})
export class TimePickerComponent implements OnChanges, OnInit, OnDestroy, ControlValueAccessor {

  @Input() isOpen = false;

  @Input() slots;

  // @Input() events: CalendarEvent[];
  //
  // @Output() eventClicked: EventEmitter<{event: CalendarEvent}> = new EventEmitter<{event: CalendarEvent}>();
  /**
   * The current view date
   */
  @Input() viewDate: Date;

  /**
   * An array of events to display on view
   */
  @Input() events: CalendarEvent[] = [];

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
  @Output() eventTimesChanged: EventEmitter<CalendarEventTimesChangedEvent> = new EventEmitter<CalendarEventTimesChangedEvent>();

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

  /**
   * @hidden
   */
  currentResize: {
    originalOffset: number,
    originalSpan: number,
    edge: string
  };

  /**
   * @hidden
   */
  validateDrag: Function;

  /**
   * @hidden
   */
  validateResize: Function;

  /**
   * @hidden
   */
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

  onModelChange: Function = (_: any) => {
  };
  onModelTouched: Function = () => {
  };


  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  writeValue(value) {
    this.value = value || 0;
  }

  value: any = Date.now();

  onTimeSelect(time: Date) {
    if (this.value !== time) {
      this.writeValue(time);
      this.onModelChange(this.value);

    }
    this.onModelTouched();
  }

  /**
   * @hidden
   */
  ngOnChanges(changes: any): void {

    if (changes.viewDate) {
      this.refreshHeader();
    }

    if (changes.events || changes.viewDate) {
      this.refreshBody();
    }

  }

  /**
   * @hidden
   */
  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }


  getDayColumnWidth(eventRowContainer: HTMLElement): number {
    return Math.floor(eventRowContainer.offsetWidth / 7);
  }

  /**
   * @hidden
   */

  private refreshHeader(): void {
    this.days = getWeekViewHeader({
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn
    });
  }

  private refreshBody(): void {
    this.eventRows = getWeekView({
      events: this.events,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn
    });
  }

  private refreshAll(): void {
    this.refreshHeader();
    this.refreshBody();
  }

}
