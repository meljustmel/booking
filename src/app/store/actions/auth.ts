// import { IAuthCredentials } from '../../models';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthActions {

  static LOGIN_RECEIVED = 'LOGIN_RECEIVED';
  static LOGIN_FAILURE = 'LOGIN_FAILURE';
  static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  static REGISTER_RECEIVED = 'REGISTER_RECEIVED';
  static REGISTER_SUCCESS = 'REGISTER_SUCCESS';
  static REGISTER_FAILURE = 'REGISTER_FAILURE';
  static LOGOUT_RECEIVED = 'LOGOUT_RECEIVED';
  static LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
  static LOGOUT_FAILURE = 'LOGOUT_SUCCESS';
  static USER_AUTHENTICATED = 'USER_AUTHENTICATED';
  static USER_NOT_AUTHENTICATED = 'USER_NOT_AUTHENTICATED';

  loginUser(authCredentials): Action {
    return {
      type: AuthActions.LOGIN_RECEIVED,
      payload: authCredentials
    };
  }

  loginFailure(error: string): Action {
    return {
      type: AuthActions.LOGIN_FAILURE,
      payload: error
    };
  }

  loginSuccess(authState): Action {
    return {
      type: AuthActions.LOGIN_SUCCESS,
      payload: authState
    };
  }

  registerUser(authCredentials): Action {
    return {
      type: AuthActions.REGISTER_RECEIVED,
      payload: authCredentials
    };
  }

  registerSuccess(): Action {
    return {
      type: AuthActions.REGISTER_SUCCESS
    };
  }

  registerFailure(error: string): Action {
    return {
      type: AuthActions.REGISTER_FAILURE,
      payload: error
    };
  }

  logOutUser(): Action {
    return {
      type: AuthActions.LOGOUT_RECEIVED
    };
  }

  logoutSuccess(): Action {
    return {
      type: AuthActions.LOGOUT_SUCCESS
    };
  }

  logoutFailure(error: string): Action {
    return {
      type: AuthActions.LOGOUT_FAILURE,
      payload: error
    };
  }

  userAuthenticated(authState: FirebaseAuthState): Action {
    return {
      type: AuthActions.USER_AUTHENTICATED,
      payload: authState
    };
  }

  userNotAuthenticated(): Action {
    return {
      type: AuthActions.USER_NOT_AUTHENTICATED
    };
  }

}
