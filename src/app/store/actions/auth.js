"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//import { IAuthCredentials } from '../../models';
var core_1 = require('@angular/core');
var AuthActions = (function () {
    function AuthActions() {
    }
    AuthActions.prototype.loginUser = function (authCredentials) {
        return {
            type: AuthActions.LOGIN_RECEIVED,
            payload: authCredentials
        };
    };
    AuthActions.prototype.loginFailure = function (error) {
        return {
            type: AuthActions.LOGIN_FAILURE,
            payload: error
        };
    };
    AuthActions.prototype.loginSuccess = function (authState) {
        return {
            type: AuthActions.LOGIN_SUCCESS,
            payload: authState
        };
    };
    AuthActions.prototype.registerUser = function (authCredentials) {
        return {
            type: AuthActions.REGISTER_RECEIVED,
            payload: authCredentials
        };
    };
    AuthActions.prototype.registerSuccess = function () {
        return {
            type: AuthActions.REGISTER_SUCCESS
        };
    };
    AuthActions.prototype.registerFailure = function (error) {
        return {
            type: AuthActions.REGISTER_FAILURE,
            payload: error
        };
    };
    AuthActions.prototype.logOutUser = function () {
        return {
            type: AuthActions.LOGOUT_RECEIVED
        };
    };
    AuthActions.prototype.logoutSuccess = function () {
        return {
            type: AuthActions.LOGOUT_SUCCESS
        };
    };
    AuthActions.prototype.logoutFailure = function (error) {
        return {
            type: AuthActions.LOGOUT_FAILURE,
            payload: error
        };
    };
    AuthActions.prototype.userAuthenticated = function (authState) {
        return {
            type: AuthActions.USER_AUTHENTICATED,
            payload: authState
        };
    };
    AuthActions.prototype.userNotAuthenticated = function () {
        return {
            type: AuthActions.USER_NOT_AUTHENTICATED
        };
    };
    AuthActions.LOGIN_RECEIVED = 'LOGIN_RECEIVED';
    AuthActions.LOGIN_FAILURE = 'LOGIN_FAILURE';
    AuthActions.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    AuthActions.REGISTER_RECEIVED = 'REGISTER_RECEIVED';
    AuthActions.REGISTER_SUCCESS = 'REGISTER_SUCCESS';
    AuthActions.REGISTER_FAILURE = 'REGISTER_FAILURE';
    AuthActions.LOGOUT_RECEIVED = 'LOGOUT_RECEIVED';
    AuthActions.LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
    AuthActions.LOGOUT_FAILURE = 'LOGOUT_SUCCESS';
    AuthActions.USER_AUTHENTICATED = 'USER_AUTHENTICATED';
    AuthActions.USER_NOT_AUTHENTICATED = 'USER_NOT_AUTHENTICATED';
    AuthActions = __decorate([
        core_1.Injectable()
    ], AuthActions);
    return AuthActions;
}());
exports.AuthActions = AuthActions;
