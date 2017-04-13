import {Injectable, Inject} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs/Rx";
import {Reservation} from "../model";
import * as RootStore from "../../store";
import {AngularFireDatabase, FirebaseRef, FirebaseObjectObservable, AngularFire} from "angularfire2";
import {Http} from "@angular/http";
import {firebaseConfig} from "../config/firebase";
import {CalendarEvent, MonthViewDay, colors} from "../../core/utils/calendar.utils";
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
} from "date-fns";
import "rxjs/add/operator/map";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ReservationStatus } from '../../core/model';
import {User} from "../model";
import {Store} from "@ngrx/store";
import {ReservationsActions} from "../../store/actions/res";

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
  private daySource = new BehaviorSubject<string>(null);

  selectedDay$ = this.daySource.asObservable();

  reservations$: Observable<ReservationEvent[]>;

  constructor(private db: AngularFireDatabase, @Inject(FirebaseRef) fb,
              private http: Http, private af: AngularFire,
              private reservationsActions: ReservationsActions,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<RootStore.AppState>) {

    this.sdkDb = fb.database().ref();

    this.getUser$ = this.af.auth.subscribe(authState => {
      console.log('auth', authState.auth);
      this.user$ = authState.auth;
      console.log('uid', authState.auth.uid);
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
            start: new Date(reservation.reservationDate),
            color: colors.pink,
            incrementsBadgeTotal: true,
            reservation
          };
        });
      })
      .subscribe(action => this.store.dispatch(this.reservationsActions.loadReservationsSuccess(action)));
  }
  //
  // getAllReservations() {
  //
  //   return this.af.database.list('reservations')
  //     .map((res: Reservation[]) => {
  //       // console.log(res)
  //       return res.map((reservation) => {
  //         return {
  //           title: reservation.service,
  //           start: new Date(reservation.reservationFullDate),
  //           color: colors.pink,
  //           incrementsBadgeTotal: true,
  //           reservation
  //         }
  //       })
  //     })
  //
  // }

  getAllSlots() {
    return this.af.database.list('slots')
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
    return this.af.database.list('slots')
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
  // getSlotsTaken() {
  //   return this.af.database.list('slots')
  //     .map((slots: Slot[]) => {
  //       // console.log(res)
  //       return slots.map((slot: Slot) => {
  //         return {
  //           hour: slot.hour,
  //           // start: new Date(slot.slotDate),
  //           header: slot.header,
  //           available: slot.available,
  //           slot
  //         }
  //       }).filter(slot => slot.available == false)
  //     })
  // }
  bookUserReservation(reservation: any): Observable<any> {
    const userId = this.user$.uid;
    const newReservationKey = this.sdkDb.child('reservations').push().key;
    const compiledReservation = {
      client: {
        uid: this.user$.uid,
        email: this.user$.email,
        name: this.user$.displayName,
        avatar: this.user$.photoURL
      },
      type: reservation.service,
      key: newReservationKey,
      status: ReservationStatus.booked,
      createdDate: reservation.createdDate,
      reservationDate: reservation.reservationDate,
      reservationTime: reservation.reservationTime,
      reservationFullDate: setHours(new Date(reservation.reservationDate), reservation.reservationTime)
    };

    const reservationToSave = Object.assign(compiledReservation, {userId});
    const dataToSave = {};

    dataToSave[`reservations/${newReservationKey}`] = reservationToSave;
    dataToSave[`users/${userId}/reservations/${newReservationKey}`] = true;

    console.log(dataToSave);
    return this.firebaseUpdate(dataToSave);
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

  // deleteRecipe(recipe_id: string, recipebook_id: string) {
  //
  //   this.sdkDb.update({
  //     `recipes/${recipe_id}`: null,
  //     `recipesPerRecipebook/${recipebook_id}/${recipe_id}`: null
  // })
  // }


  kill(id) {
    this.slimLoadingBarService.start();
    console.log('im here now', id)
    const subject = new Subject();
    this.sdkDb.child(`reservations/${id}`)
      .remove();
    this.slimLoadingBarService.complete();
    return subject.asObservable();

  }

}
