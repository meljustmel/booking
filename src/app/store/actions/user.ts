import { User } from '../../core/model/index';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FirebaseListObservable } from 'angularfire2';

@Injectable()
export class UserActions {

  static INITIALISE_USER_RECEIVED = 'INITIALISE_USER_RECEIVED';
  static INITIALISE_USER_FAILURE = 'INITIALISE_USER_FAILURE';
  static INITIALISE_USER_SUCCESS = 'INITIALISE_USER_SUCCESS';
  static GET_USERS_RECEIVED = 'GET_USERS_RECEIVED';
  static GET_USERS_FAILURE = 'GET_USERS_FAILURE';
  static GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
  static SET_STATUS_IDLE = 'SET_STATUS_IDLE';

  initialiseUser(user: User): Action {
    return {
      type: UserActions.INITIALISE_USER_RECEIVED,
      payload: { data: user }
    };
  }

  initialiseUserFailure(error: string): Action {
    return {
      type: UserActions.INITIALISE_USER_FAILURE,
      payload: error
    };
  }

  initialiseUserSuccess(): Action {
    return {
      type: UserActions.INITIALISE_USER_SUCCESS
    };
  }

  getUsers(): Action {
    return {
      type: UserActions.GET_USERS_RECEIVED
    };
  }

  getUsersFailure(error: string): Action {
    return {
      type: UserActions.GET_USERS_FAILURE,
      payload: error
    };
  }

  getUsersSuccess(users: FirebaseListObservable<User>): Action {
    return {
      type: UserActions.GET_USERS_SUCCESS,
      payload: users
    };
  }

  setUserStatusIdle(): Action {
    return {
      type: UserActions.SET_STATUS_IDLE
    };
  }

}
