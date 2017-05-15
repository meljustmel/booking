import * as fromAuth from "./reducers/auth";
import * as fromMessage from "./reducers/message";
import * as fromReservation from "./reducers/res";
import * as fromUser from "./reducers/user";
import {NgModule} from "@angular/core";
import {compose} from "@ngrx/core/compose";
import {EffectsModule} from "@ngrx/effects";
import {combineReducers, StoreModule} from "@ngrx/store";

import {AuthActions, MessagesActions} from "./actions/index";
import {AuthEffects, UserEffects} from "./effects/index";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {UserActions} from "./actions/user";
import {ReservationsActions} from "./actions/res";

export interface AppState {
  authState: fromAuth.AuthState;
  messageState: fromMessage.MessageState;
  userState: fromUser.UserState;
  reservationState: fromReservation.ReservationState

}
;
export const actions = [
  AuthActions,
  MessagesActions,
  UserActions,
  ReservationsActions
];

export const composeStore = compose(
  combineReducers)
({
  authState: fromAuth.default,
  messageState: fromMessage.default,
  userState: fromUser.default,
  reservationState: fromReservation.default
});

export function reducer(state: any, action: any) {
  return composeStore(state, action);
}
export function getTodos() {
  return {
    type: MessagesActions.TEST_RECEIVED
  }
}


export const getCurrentUser = (state: AppState) => state.authState.currentUser;

@NgModule({
  imports: [
    StoreModule.provideStore(reducer),
    EffectsModule.run(AuthEffects),
    EffectsModule.run(UserEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 20
    })
  ],
  declarations: [],
  exports: [],
  providers: [...actions]
})

export class SharedStoreModule {
}

