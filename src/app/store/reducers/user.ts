import { User, UserStatus } from '../../core/model';
import { UserActions } from './../actions';
import { Action } from '@ngrx/store';
import { FirebaseListObservable } from 'angularfire2';


export interface UserState {
    users: FirebaseListObservable<User>;
    status: UserStatus;
}

const initialState: UserState = {
    users: null,
    status: UserStatus.idle
};

export default function (state = initialState, action: Action): UserState {

    switch (action.type) {

        case UserActions.GET_USERS_RECEIVED:
            return Object.assign({}, state, {
                status: UserStatus.getUsersInProgress
            });

        case UserActions.GET_USERS_SUCCESS:
            return Object.assign({}, state, {
                status: UserStatus.getUsersSuccess,
                users: action.payload
            });

        case UserActions.GET_USERS_FAILURE:
            return Object.assign({}, state, {
                status: UserStatus.getUsersFailure
            });

        case UserActions.INITIALISE_USER_RECEIVED:
            return Object.assign({}, state, {
                status: UserStatus.updateInProgress
            });

        case UserActions.INITIALISE_USER_SUCCESS:
            return Object.assign({}, state, {
                status: UserStatus.updateSuccess
            });

        case UserActions.INITIALISE_USER_FAILURE:
            return Object.assign({}, state, {
                status: UserStatus.updateFailure
            });

        case UserActions.SET_STATUS_IDLE:
            return Object.assign({}, state, {
                status: UserStatus.idle
            });

        default:
            return Object.assign({}, state);
    }

}
