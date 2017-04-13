import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ReservationsActions {

  static LOAD_RESERVATIONS_RECEIVED = 'LOAD_RESERVATIONS_RECEIVED';
  static LOAD_RESERVATIONS_SUCCESS = 'LOAD_RESERVATIONS_SUCCESS';
  static LOAD_RESERVATIONS_FAILURE = 'LOAD_RESERVATIONS_FAILURE';
  static ADD_RESERVATION_RECEIVED = 'ADD_RESERVATION_RECEIVED';
  static ADD_RESERVATION_SUCCESS = 'ADD_RESERVATION_SUCCESS';
  static ADD_RESERVATION_FAILURE = 'ADD_RESERVATION_FAILURE';


  loadReservations(): Action {
    return {
      type: ReservationsActions.LOAD_RESERVATIONS_RECEIVED
    };
  }

  loadReservationsSuccess(reservations): Action {
    return {
      type: ReservationsActions.LOAD_RESERVATIONS_SUCCESS,
      payload: reservations
    };
  }

  loadReservationsFailure(error: string): Action {
    return {
      type: ReservationsActions.LOAD_RESERVATIONS_FAILURE,
      payload: error
    };
  }


  addReservation(reservation): Action {
    return {
      type: ReservationsActions.ADD_RESERVATION_RECEIVED,
      payload: reservation
    };
  }

  addReservationSuccess(reservation): Action {
    return {
      type: ReservationsActions.ADD_RESERVATION_SUCCESS,
      payload: reservation
    };
  }

  addReservationFailure(error: string): Action {
    return {
      type: ReservationsActions.ADD_RESERVATION_FAILURE,
      payload: error
    };
  }

  testReservation(reservation): Action {
    return {
      type: ReservationsActions.ADD_RESERVATION_RECEIVED,
      payload: reservation
    };
  }

  testReservationSuccess(reservation): Action {
    return {
      type: ReservationsActions.ADD_RESERVATION_SUCCESS,
      payload: reservation
    };
  }

  testReservationFailure(error: string): Action {
    return {
      type: ReservationsActions.ADD_RESERVATION_FAILURE,
      payload: error
    };
  }
}
