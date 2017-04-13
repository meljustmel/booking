import {Component, HostBinding, OnInit} from "@angular/core";
// import {CalendarEvent} from "../schedule/utils/calendar-utils";
import {CalendarDateFormatter, CalendarMonthViewDay, DateFormatterParams} from "angular-calendar";
import * as CalendarUtils from "../core/utils/calendar.utils";
import {
  addDays,
  addHours,
  addMonths,
  addWeeks,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isSunday,
  isWeekend,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks
} from "date-fns";
import * as RootStore from "../store";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReservationsActions} from "../store/actions/res";
import {ReservationService} from "../core/service/res";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {routeFadeStateTrigger} from "../app.animations";


class CustomDateFormatter extends CalendarDateFormatter {

  public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {weekday: 'short'}).format(date); // use short week days

  }

  public timeSlotFormatter({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {weekday: 'short'}).format(date); // use short week days
  }

}


type CalendarPeriod = 'day' | 'week' | 'month';

@Component({
  selector: 'booking',
  template: `
    <hero [background]="'assets/hero.png'"></hero>
    <!--<banner></banner>-->
    <div class="u-foreground homeContainer-content u-marginAuto u-clearfix u-sizeViewHeightMin100">
      <div class="container">
        <section class="">
          <div class="wizard">
            <form-wizard [formGroup]="reservationForm" (onStepChanged)="onStepChanged($event)">
              <wizard-step [title]=" data?.service ||'Pick your Service'" (onNext)="onStep1Next($event)">
                <service-form [parent]="reservationForm" formControlName="service"></service-form>
              </wizard-step>
              <wizard-step [title]=" (data?.reservationDate | date)  ||'Pick your Day'" [isValid]="reservationForm.valid"
                           [showNext]="step2.showNext" [showPrev]="step2.showPrev" (onNext)="onStep2Next($event)">

                <calendar-form [parent]="reservationForm"
                               [dayModifier]="dayModifier"
                               [viewDate]="viewDate"
                               (dayClicked)="dayClicked($event.day)">
                </calendar-form>
              </wizard-step>
              <wizard-step [title]=" (data?.reservationTime | time) || 'Pick your Time'" (onNext)="onStep3Next($event)">
                <time-form formControlName="reservationTime" [times]='times | async'></time-form>
              </wizard-step>
              <wizard-step title='Confirm' (onComplete)="onComplete($event)">
                <div [ngSwitch]="isCompleted">
                  <div *ngSwitchDefault>
                    <action (action)='save(reservationForm)' [label]="'Reserve'" [tag]="'Booking Tag-line'"></action>
                  </div>
                  <div *ngSwitchCase="true">
                    <!--<h4>Thank you {{data.email}}! You have completed all the steps.</h4>-->
                    <confirm-form [user]="user | async" [data]='data'></confirm-form>
                  </div>
                </div>
              </wizard-step>
            </form-wizard>
          </div>
        </section>
      </div>
      <!--<pre>{{ filtered | json }}</pre>-->
      <!--<pre>Value: {{ reservationForm.value | json }}</pre>-->
    </div>

  `,
  styles: [`
    :host {
      display: block;
    }

    .wizard {
      min-height: 750px;
      height: 100%;
    }
  `],
  animations: [
    routeFadeStateTrigger
  ],
  providers: [{
    provide: CalendarDateFormatter,
    useClass: CustomDateFormatter
  }]
})
export class BookingComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = true;
  viewDate: Date = new Date();
  view: CalendarPeriod = 'month';

  reservations$;
  reservationForm: FormGroup;

  activeDayIsOpen = false;

  reservationDay;
  selectedDay;
  step2: any = {
    showNext: true,
    showPrev: true
  };

  times;
  user;
  data;

  minDate: Date = subDays(new Date(), 1);

  maxDate: Date = addWeeks(new Date(), 2);

  dayModifier: Function;

  prevBtnDisabled = false;

  nextBtnDisabled = false;

  isCompleted = false;

  filtered;

  constructor(private reservationsActions: ReservationsActions,
              private fb: FormBuilder,
              private reservationService: ReservationService,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<RootStore.AppState>) {
    this.dayModifier = function (day: CalendarMonthViewDay): void {
      if (!this.dateIsValid(day.date) || isSunday(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    }.bind(this);
    this.dateOrViewChanged();
  }

  setDay() {
    console.log('today is', this.viewDate);
    this.reservationService.updateDay(this.viewDate);
  }

  onStep1Next(event) {
    console.log('Step1 - Next');
  }

  onStep2Next(event) {
    console.log('Step2 - Next');
  }

  onStep3Next(event) {
    console.log('Step3 - Next');
  }

  onComplete(event) {
    this.isCompleted = true;
  }

  onStepChanged(step) {
    console.log('Changed to ' + step.title);
  }

  ngOnInit() {
    // this.store.dispatch(this.reservationsActions.loadReservations());
    this.slimLoadingBarService.start();
    this.times = this.reservationService.getAllSlots();
    this.filtered = this.getThisDay(this.viewDate);
    console.log('filtered is', this.filtered);

    this.user = this.store.select(state => state.authState.currentUser);


    this.reservationService.loadReservations();

    // this.slots$ = this.reservationService.getSlotsAvailable();

    this.reservations$ = this.store.select(state => state.reservationState.reservations);

    // const reservations$ = Observable.of(this.reservations$);
    //
    // const requestSlotFromKey = (key) => Observable.of({slot: key}).delay(1000); // mock users
    //
    //
    // const userListKeyMap$ = Observable.of([{key: 1}, {key: 2}, {key: 3}]); // mock keys
    // const requestUserFromKey = (key) => Observable.of({user: key}).delay(1000); // mock users
    //
    // const result$ = reservations$.switchMap((userKeys) =>
    //   Observable.forkJoin(userKeys.map(uk => requestSlotFromKey(uk.key))));
    //
    // result$.subscribe((users) => console.log('got some users: ', users));
    this.reservationForm = this.fb.group({
      service: ['', Validators.required],
      reservationDate: ['', Validators.required],
      reservationTime: ['', Validators.required],
      createdDate: [new Date()]
    });
    this.reservationForm.valueChanges.subscribe(data => {
      console.log('Form changes', data);
      this.data = {
        service: data.service,
        reservationDate: data.reservationDate,
        reservationTime: data.reservationTime,
        name: this.user.displayName,
        email: this.user.email,
      };
    });
    this.slimLoadingBarService.complete();
  }

  getThisDay(day) {
    return this.reservationService.loadReservationsOnDay(day);
  }


  save(form) {
    // console.log(form.value)

    this.reservationService.bookUserReservation(form.value)
      .subscribe(
        () => {
          form.reset();
          // this._router.navigate(['admin/calendar']);
        },
        err => console.log(`error creating reservation ${err}`)
      );

  }


  dayClicked(day: CalendarMonthViewDay): void {
    if (this.selectedDay) {
      delete this.selectedDay.cssClass;
    }
    this.setDay();
    day.cssClass = 'cal-day-selected';
    this.selectedDay = day;
    this.reservationDay = this.selectedDay.date;
    // console.log(this.selectedDay, this.reservationDay)
  }


  increment(): void {
    this.changeDate(CalendarUtils.addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(CalendarUtils.subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarPeriod): void {
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(CalendarUtils.endOfPeriod(this.view, CalendarUtils.subPeriod(this.view, this.viewDate, 1)));
    this.nextBtnDisabled = !this.dateIsValid(CalendarUtils.startOfPeriod(this.view, CalendarUtils.addPeriod(this.view, this.viewDate, 1)));
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }


}
