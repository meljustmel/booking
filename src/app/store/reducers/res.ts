import {Reservation} from "../../core/model";
import { ReservationsActions } from './../actions';


export interface ReservationState {
  pending: boolean;
  reservations: Reservation[];
  selectedReservation: Reservation;
  error: string
}

const initialState: ReservationState = {
  pending: false,
  reservations: [],
  selectedReservation: null,
  error: null
};


function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}

function updateItemInArray(array, itemId, updateItemCallback) {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) {
      return item;
    }
    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });

  return updatedItems;
}


export default function (state = initialState, action) {
  switch (action.type) {

    case ReservationsActions.LOAD_RESERVATIONS_SUCCESS:
      console.log('success called')
      return updateObject(state, {reservations: action.payload, pending: false});

    case ReservationsActions.LOAD_RESERVATIONS_FAILURE:
      return updateObject(state, {pending: false});

    case ReservationsActions.ADD_RESERVATION_SUCCESS:
      return updateObject(state, {reservation: action.payload});

    case ReservationsActions.ADD_RESERVATION_FAILURE:
      console.log('success called')
      return updateObject(state, {reservations: action.payload, pending: false});

    // case ReservationsActions.TEST_SUCCESS:
    //   return updateObject(state, {reservations: action.payload, pending: false});
    //
    // case ReservationsActions.TEST_FAILURE:
    //   return updateObject(state, {pending: false, error: "Error"});










    case 'TOGGLE_TODO' : {
      const newReservation = updateItemInArray(state.reservations, action.id, reservation => {
        return updateObject(reservation, {read: !reservation.read});
      });

      return updateObject(state, {reservations: newReservation});
    }
    case 'EDIT_TODO' : {
      const newReservation = updateItemInArray(state.reservations, action.id, reservation => {
        return updateObject(reservation, {content: action.content});
      });

      return updateObject(state, {reservations: newReservation});
    }
    default :
      return state;
  }
}
