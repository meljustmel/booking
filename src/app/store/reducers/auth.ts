import { LoginStatus } from '../../core/model';
import { AuthActions } from './../actions';
import { Action } from '@ngrx/store';
import {User} from "../../core/model/user";

export interface AuthState {
  status: LoginStatus;
  currentUser: User;
  profile: User;
  newlyRegistered: boolean;
}

const initialState: AuthState = {
  status: LoginStatus.unknown,
  currentUser: null,
  profile: null,
  newlyRegistered: false
};

function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}

export default function (state = initialState, action: Action): AuthState {

  switch (action.type) {

    case AuthActions.LOGIN_RECEIVED:
      return updateObject(state, {status: LoginStatus.loggingIn});

    case AuthActions.LOGIN_SUCCESS:
      console.log(action.payload.auth)
      return updateObject(state, {status: LoginStatus.loggedIn, currentUser: action.payload.auth});
    case AuthActions.USER_INFO_LOADED:
      return updateObject(state, {profile: action.payload});
    case AuthActions.LOGIN_FAILURE:
      return updateObject(state, {status: LoginStatus.loginFailed});

    case AuthActions.LOGOUT_RECEIVED:
      return updateObject(state, {status: LoginStatus.loggingOut});

    case AuthActions.LOGOUT_SUCCESS:
      return updateObject(state, {status: LoginStatus.loggedOut, currentUser: null, profile: null});

    default: return state;
  }

}
export const getStatus = (state: AuthState) => state.status;
