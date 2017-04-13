import {Component, HostBinding, OnInit} from "@angular/core";
import {CalendarEvent, CalendarMonthViewDay } from "angular-calendar";
import * as RootStore from "../store";
import {
  addHours,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  isWeekend
} from "date-fns";
import {Store} from "@ngrx/store";
import {FormBuilder} from "@angular/forms";
import {ReservationsActions} from "../store/actions/res";
import {ReservationService} from "../core/service/res";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

import {routeFadeStateTrigger} from "../app.animations";

@Component({
  selector: 'schedule',
  template: `
    <hero [background]="'assets/hero.png'">
    </hero>
    <div class="container">
      <div class="spacer">
        <calendar-header [(view)]="view"
                         [(viewDate)]="viewDate">
        </calendar-header>
      </div>
      <div class="" [ngSwitch]="view">
        <calendar *ngSwitchCase="'month'"
                  [viewDate]="viewDate"
                  [events]="(reservations$ | async) || []"
                  [availability]="(slots$ | async) || []"
                  [activeDayIsOpen]="activeDayIsOpen"
                  (dayClicked)="dayClicked($event.day)"
                  [dayModifier]="addBadgeTotal">
        </calendar>
        <week-view *ngSwitchCase="'week'"
                   [viewDate]="viewDate"
                   [events]="(reservations$ | async) || []">

        </week-view>
        <day-view *ngSwitchCase="'day'"
                  [viewDate]="viewDate"
                  [events]="(reservations$ | async) || []"
        ></day-view>

      </div>

    </div>

  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  animations: [
    routeFadeStateTrigger
  ]
})
export class ScheduleComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;
  view = 'month';
  viewDate: Date = new Date();
  reservations$;

  activeDayIsOpen = false;

  slots$;
  addBadgeTotal;
  user$;
  reservationDay;
  selectedDay;
  addCssClass: (day: CalendarMonthViewDay) => void;


  constructor(private reservationsActions: ReservationsActions,
              private fb: FormBuilder,
              private reservationService: ReservationService,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<RootStore.AppState>) {  }

  ngOnInit() {
    // this.store.dispatch(this.reservationsActions.loadReservations());
    this.slimLoadingBarService.start();

    this.reservationService.loadReservations();

    this.reservations$ = this.store.select(state => state.reservationState.reservations);

    this.slimLoadingBarService.complete();
  }

  dayClicked({date, events}: { date: Date, events: CalendarEvent[] }): void {
    if (this.selectedDay) {
      delete this.selectedDay.cssClass;
    }

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  // eventClicked(event: FilmEvent): void {
  //   window.open(`https://www.themoviedb.org/movie/${event.film.id}`, '_blank');
  // }

}
