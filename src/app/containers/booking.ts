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
import swal from 'sweetalert2';
import { Router } from '@angular/router'
//declare swal: any;
//declare var swal:any;
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
    <hero [background]="'assets/hands.jpg'"></hero>
    <!--<banner></banner>-->
    <div class="u-foreground homeContainer-content u-marginAuto u-clearfix u-sizeViewHeightMin100">
      <div class="container">
        <section class="">
          <div class="root" [style.paddingTop.em]="2">
            <h4 class="label">{{step?.stepTitle}}</h4>
            <h3 class="">{{step?.stepTagline}}</h3>
            <h1 class="title">{{step?.stepHeading}}</h1>
          </div>
          <loadingspinner *ngIf="loading"></loadingspinner>
          <div class="wizard">
            <form-wizard [formGroup]="reservationForm" (onStepChanged)="onStepChanged($event)">
              <wizard-step
                [isValid]="!reservationForm.controls['service'].untouched"
                [title]=" data?.service ||'Pick your Service'"
                [stepTitle]="'Step One'"
                [stepTagline]="'Select the method you prefer'"
                [stepHeading]="'All Three are Organic'"
                (onNext)="onStep1Next($event)">
                <service-form [parent]="reservationForm" formControlName="service"></service-form>
              </wizard-step>
              <wizard-step
                [isValid]="!reservationForm.controls['reservationDate'].untouched"
                [title]=" (data?.reservationDate | date)  ||'Pick your Day'"
                [stepTitle]="'Step Two'"
                [stepTagline]="'What day would you like'"
                [stepHeading]="'Everyday but Sunday'"
                [showNext]="step2.showNext"
                [showPrev]="step2.showPrev"
                (onNext)="onStep2Next($event)">

                <calendar-form [parent]="reservationForm"
                               [dayModifier]="dayModifier"
                               [viewDate]="viewDate"
                               (dayClicked)="dayClicked($event.day)">
                </calendar-form>
              </wizard-step>
              <wizard-step
                [isValid]="!reservationForm.controls['reservationTime'].untouched"
                [title]=" (data?.reservationTime | time) || 'Pick your Time'"
                [stepTitle]="'Step Three'"
                [stepTagline]="'What time would you like'"
                [stepHeading]="'Sessions are an hour long'"
                (onNext)="onStep3Next($event)">
                <time-form formControlName="reservationTime" [times]='times | async' [bookedTimes]='bookedTimes'></time-form>
              </wizard-step>
              <wizard-step
                [isValid]="this.data && this.data.creditDetail && this.data.creditDetail.valid"
                [title]="'Payment'"
                [stepTitle]="'Step Four'"
                [stepTagline]="'Review your answers and Pay with Credit Card'"
                [stepHeading]="'Payment Is Secure'"
                >
                <div [ngSwitch]="isCompleted">
                  <div *ngSwitchDefault>
                    <credit-form formControlName="creditDetail" [user]="user | async" [data]='data' (onComplete)="onComplete($event)"></credit-form>
                  </div>
                  <div *ngSwitchCase="true">
                    <!--<h4>Thank you {{data.email}}! You have completed all the steps.</h4>-->
                    <success-form [user]="user | async" [data]='data'></success-form>
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

  step = {
    stepTitle : 'Step One',
    stepTagline : 'Select the method you prefer',
    stepHeading : 'All Three are Organic',
  };

  reservations$;
  reservationForm: FormGroup;

  activeDayIsOpen = false;

  reservationDay;
  selectedDay;
  step2: any = {
    showNext: true,
    showPrev: true
  };

  loading: boolean = false;
  times;
  bookedTimes = [];
  user;
  data: any = {};

  minDate: Date = subDays(new Date(), 1);

  maxDate: Date = addWeeks(new Date(), 2);

  dayModifier: Function;

  prevBtnDisabled = false;

  nextBtnDisabled = false;

  isCompleted = false;

  filtered;

  constructor(private reservationsActions: ReservationsActions,
              private fb: FormBuilder,
              private _router: Router,
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
    // this.stepNumber = 'Step Two';
    //console.log("HALA ISIVISIBLE", swal.isVisible());
    //swal.showLoading();
    //if(swal.isVisible()) { // instant regret
    //  swal.close();
    //}
    //sweetAlert.swal.showLoading();
  }

  onStep2Next(event) {
    console.log('Step2 - Next');
    // this.stepNumber = 'Step Three';
    // This is after selecting day
    this.reservationService.getReservationsForDay(this.data.reservationDate).subscribe(reservations => {
      this.bookedTimes = reservations.map(reservation => {
        return reservation.reservationTime;
      })
    })
  }

  onStep3Next(event) {
    console.log('Step3 - Next');
    // this.stepNumber = 'Step Four';
  }
  onStep4Next(event) {
    console.log('Step4 - Next');
    // this.stepNumber = 'Step Four';
  }
  onComplete(event) {
    this.slimLoadingBarService.start();
    let _this = this;
    this.loading = true;
    (<any>window).Stripe.card.createToken({
      number: this.reservationForm.value['creditDetail'].cardNumber,
      exp: this.reservationForm.value['creditDetail'].expireDate,
      cvc: this.reservationForm.value['creditDetail'].cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        console.log(`Success! Card token ${response.card.id}.`);
        console.log('card  response',response);
        _this.reservationService.bookUserReservation(_this.reservationForm.value, response.id, 100)
          .subscribe(
            () => {
              _this.loading = false;
              _this.isCompleted = true;
              _this.slimLoadingBarService.complete();
              swal('Awesome', 'Booking have been successful', 'success');
              _this.reservationForm.reset();
              _this._router.navigate(['/']);
            },
            err => {
              //this.isCompleted = true;
              console.log(`error creating reservation ${err}`);
              _this.loading = false;
              swal('Oops...', err.message, 'error');
              _this.slimLoadingBarService.complete();
            }
          );
        //this.save(this.reservationForm);
      } else {
        console.log("ERROR", response.error);
        _this.loading = false;
        swal('Oops...', response.error.message, 'error');
        _this.slimLoadingBarService.complete();
      }
    });
  }

  onStepChanged(step) {
    this.step.stepTitle = step.stepTitle;
    this.step.stepTagline = step.stepTagline;
    this.step.stepHeading = step.stepHeading;
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

    this.reservationForm = this.fb.group({
      service: ['', Validators.required],
      reservationDate: ['', Validators.required],
      reservationTime: ['', Validators.required],
      creditDetail: ['', Validators.required],
      createdDate: [new Date()]
    });
    this.reservationForm.valueChanges.subscribe(data => {
      this.data = {
        service: data.service,
        reservationDate: data.reservationDate,
        reservationTime: data.reservationTime,
        creditDetail: data.creditDetail,
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

    //this.reservationService.bookUserReservation(form.value)
    //  .subscribe(
    //    () => {
    //      form.reset();
    //      // this._router.navigate(['admin/calendar']);
    //    },
    //    err => console.log(`error creating reservation ${err}`)
    //  );

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
