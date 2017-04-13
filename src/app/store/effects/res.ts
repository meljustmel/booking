import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AuthService, UserService, ReservationService } from '../../core/service';
import { ReservationsActions } from '../actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReservationEffects {

  @Effect() loadReservation$ = this.actions$
    .ofType(ReservationsActions.LOAD_RESERVATIONS_RECEIVED)
    .map(toPayload)
    .switchMap(payload =>
      Observable.of(this.reservationService.loadReservations())
        .switchMap((reservations) => Observable.of(this.reservationActions.loadReservationsSuccess(reservations)))
        .catch(error => Observable.of(this.reservationActions.loadReservationsFailure(error.message)))
    );

    @Effect() addReservation$ = this.actions$
        .ofType(ReservationsActions.ADD_RESERVATION_RECEIVED)
        .map(toPayload)
        .switchMap(payload =>
            Observable.of(this.reservationService.bookUserReservation(payload.data))
                .switchMap(() => Observable.of(this.reservationActions.addReservationSuccess(payload)))
                .catch(error => Observable.of(this.reservationActions.addReservationFailure(error.message)))
        );
    constructor(
        private actions$: Actions,
        private reservationActions: ReservationsActions,
        private authService: AuthService,
        private userService: UserService,
        private reservationService: ReservationService
    ) { }

}
