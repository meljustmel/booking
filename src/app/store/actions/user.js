"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var UserActions = (function () {
    function UserActions() {
    }
    UserActions.prototype.initialiseUser = function (user) {
        return {
            type: UserActions.INITIALISE_USER_RECEIVED,
            payload: { data: user }
        };
    };
    UserActions.prototype.initialiseUserFailure = function (error) {
        return {
            type: UserActions.INITIALISE_USER_FAILURE,
            payload: error
        };
    };
    UserActions.prototype.initialiseUserSuccess = function () {
        return {
            type: UserActions.INITIALISE_USER_SUCCESS
        };
    };
    UserActions.prototype.getUsers = function () {
        return {
            type: UserActions.GET_USERS_RECEIVED
        };
    };
    UserActions.prototype.getUsersFailure = function (error) {
        return {
            type: UserActions.GET_USERS_FAILURE,
            payload: error
        };
    };
    UserActions.prototype.getUsersSuccess = function (users) {
        return {
            type: UserActions.GET_USERS_SUCCESS,
            payload: users
        };
    };
    UserActions.prototype.setUserStatusIdle = function () {
        return {
            type: UserActions.SET_STATUS_IDLE
        };
    };
    UserActions.INITIALISE_USER_RECEIVED = 'INITIALISE_USER_RECEIVED';
    UserActions.INITIALISE_USER_FAILURE = 'INITIALISE_USER_FAILURE';
    UserActions.INITIALISE_USER_SUCCESS = 'INITIALISE_USER_SUCCESS';
    UserActions.GET_USERS_RECEIVED = 'GET_USERS_RECEIVED';
    UserActions.GET_USERS_FAILURE = 'GET_USERS_FAILURE';
    UserActions.GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
    UserActions.SET_STATUS_IDLE = 'SET_STATUS_IDLE';
    UserActions = __decorate([
        core_1.Injectable()
    ], UserActions);
    return UserActions;
}());
exports.UserActions = UserActions;
