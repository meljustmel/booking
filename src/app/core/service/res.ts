import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { Reservation } from '../model/index';
import * as RootStore from '../../store';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Http, RequestOptionsArgs, RequestOptions } from '@angular/http';
import {firebaseConfig} from '../config/firebase';
import {CalendarEvent, MonthViewDay, colors} from '../../core/utils/calendar.utils';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
  setHours
} from 'date-fns';
import 'rxjs/add/operator/map';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ReservationStatus } from '../../core/model/index';
import { User } from '../model/index';
import { Store } from '@ngrx/store';
import { ReservationsActions } from '../../store/actions/res';
import { AngularFireAuth } from 'angularfire2/auth';

interface ReservationEvent extends CalendarEvent {
  reservation: Reservation;
}

interface Slot {
  hour: number;
  header: string;
  available: boolean;
}

@Injectable()
export class ReservationService {

  sdkDb: any;
  getUser$: any;
  user$;
  token;
  private daySource = new BehaviorSubject<string>(null);

  selectedDay$ = this.daySource.asObservable();

  reservations$: Observable<ReservationEvent[]>;

  constructor(private db: AngularFireDatabase,
              private http: Http, private af: FirebaseApp, public auth$: AngularFireAuth,
              private reservationsActions: ReservationsActions,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<RootStore.AppState>) {

    this.sdkDb = this.af.database().ref();

    this.getUser$ = this.auth$.authState.subscribe(user => {
      if (user) {
        // console.log('auth', user);
        this.user$ = user;
        this.user$.getToken().then(token => {
          this.token = token;
        });
        // console.log('uid', user.uid);
      }
    });

  }

  updateDay(day) {
    this.daySource.next(day);
  }

  loadReservationsOnDay(selectedDay$) {
    return this.db.list('reservations')
      .subscribe(action => this.store.dispatch(this.reservationsActions.loadReservationsSuccess(action)));
  }


  loadReservations() {
    // this.slimLoadingBarService.start();
    return this.db.list('reservations')
      .map((res: Reservation[]) => {
        return res.map((reservation: Reservation) => {
          return {
            title: reservation.client.displayName,
            client: reservation.client,
            time: reservation.reservationTime,
            start: new Date(reservation.reservationFullDate),
            color: colors.pink,
            incrementsBadgeTotal: true,
            reservation
          };
        });
      })
      .subscribe(action => this.store.dispatch(this.reservationsActions.loadReservationsSuccess(action)));
  }
  loadUserReservations(userId) {
    // this.slimLoadingBarService.start();
    return this.db.list('reservations', {
        query: {
          orderByChild: 'userId',
          equalTo: userId
        }
    }).map((res: Reservation[]) => {
        return res.map((reservation: Reservation) => {
          return {
            title: reservation.client.displayName,
            client: reservation.client,
            time: reservation.reservationTime,
            start: new Date(reservation.reservationFullDate),
            color: colors.pink,
            incrementsBadgeTotal: true,
            reservation
          };
        });
      })
  }
  filteredReservations(day) {
    return this.db.list('reservations', {
      query: {
        orderByChild: 'reservationDate',
        equalTo: day
      }
    });

  }

  getAllSlots() {
    return this.db.list('slots')
      .map((slots: Slot[]) => {
        // console.log(res)
        return slots.map((slot: Slot) => {
          return {
            hour: slot.hour,
            // start: new Date(slot.slotDate),
            header: slot.header,
            available: slot.available,
            slot
          };
        });
      });
  }

  getSlotsAvailable() {
    return this.db.list('slots')
      .map((slots: Slot[]) => {
        // console.log(res)
        return slots.map((slot: Slot) => {
          return {
            hour: slot.hour,
            // start: new Date(slot.slotDate),
            header: slot.header,
            available: slot.available,
            slot
          };
        }).filter(slot => slot.available === true);
      });
  }

  getReservationsForDay(day) {
    return this.db.list('reservations', {
      query: {
        orderByChild: 'reservationDate',
        equalTo: day
      }
    });
  }

  bookUserReservation(reservation: any, cardToken: string, amount: number): Observable<any> {
    const userId = this.user$.uid;
    // const newReservationKey = this.sdkDb.child('reservations').push().key;
    const compiledReservation = {
      type: reservation.service,
      status: ReservationStatus.active,
      createdDate: reservation.createdDate,
      reservationDate: reservation.reservationDate,
      reservationTime: reservation.reservationTime,
      reservationFullDate: setHours(new Date(reservation.reservationDate), reservation.reservationTime)
    };


    const option: any =  {
      headers: {
        'Content-Type': 'Application/JSON',
        'Authorization': 'Bearer ' + this.token
      }
    };
    console.log("User Token: ", this.token);
    console.log("Stripe token: ", cardToken);

    return this.http.post(`${firebaseConfig.cloudFunctionsURL}/bookservice`, { reservation: compiledReservation, token: cardToken, amount: amount }, option);
  }
  firebaseUpdate(dataToSave) {
    this.slimLoadingBarService.start();
    const subject = new Subject();

    this.sdkDb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();

        },
        err => {
          subject.error(err);
          subject.complete();
        }
      );
    this.slimLoadingBarService.complete();

    return subject.asObservable();

  }

  updateStatus(reservation, newStatus) {
    reservation.status = newStatus;
    this.db.database.ref(`reservations/${reservation.$key}/status`).set(newStatus);
  }


  kill(id) {
    this.slimLoadingBarService.start();
    // console.log('im here now', id)
    const subject = new Subject();
    this.sdkDb.child(`reservations/${id}`)
      .remove();
    this.slimLoadingBarService.complete();
    return subject.asObservable();

  }

}
