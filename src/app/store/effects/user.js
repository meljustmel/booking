"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('rxjs/add/observable/fromPromise');
require('rxjs/add/observable/of');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
var actions_1 = require('../actions');
var core_1 = require('@angular/core');
var effects_1 = require('@ngrx/effects');
var Observable_1 = require('rxjs/Observable');
var UserEffects = (function () {
    function UserEffects(actions$, userActions, authService, userService) {
        var _this = this;
        this.actions$ = actions$;
        this.userActions = userActions;
        this.authService = authService;
        this.userService = userService;
        this.getUsers$ = this.actions$
            .ofType(actions_1.UserActions.GET_USERS_RECEIVED)
            .switchMap(function () {
            return _this.authService.af.auth
                .switchMap(function (authState) {
                if (authState) {
                    return _this.userService.getUsers()
                        .switchMap(function (users) { return Observable_1.Observable.of(_this.userActions.getUsersSuccess(users)); })
                        .catch(function (error) { return Observable_1.Observable.of(_this.userActions.getUsersFailure(error.message)); });
                }
                else {
                    return Observable_1.Observable.of({ type: actions_1.UserActions.GET_USERS_FAILURE, payload: 'You must be logged in' });
                }
            })
                .catch(function (error) { return Observable_1.Observable.of({ type: actions_1.UserActions.GET_USERS_FAILURE, payload: 'You must be logged in' }); });
        });
        this.initialiseUser$ = this.actions$
            .ofType(actions_1.UserActions.INITIALISE_USER_RECEIVED)
            .map(effects_1.toPayload)
            .switchMap(function (payload) {
            return Observable_1.Observable.fromPromise(_this.userService.initialiseUser(payload.data))
                .switchMap(function () { return Observable_1.Observable.of({ type: actions_1.UserActions.INITIALISE_USER_SUCCESS }); })
                .catch(function (error) { return Observable_1.Observable.of({ type: actions_1.UserActions.INITIALISE_USER_FAILURE }); });
        });
        this.setUserStateToIdle$ = this.actions$
            .ofType(actions_1.UserActions.INITIALISE_USER_SUCCESS, actions_1.UserActions.INITIALISE_USER_FAILURE, actions_1.UserActions.GET_USERS_FAILURE, actions_1.UserActions.GET_USERS_SUCCESS)
            .switchMap(function () { return Observable_1.Observable.of({ type: actions_1.UserActions.SET_STATUS_IDLE }); });
    }
    __decorate([
        effects_1.Effect()
    ], UserEffects.prototype, "getUsers$", void 0);
    __decorate([
        effects_1.Effect()
    ], UserEffects.prototype, "initialiseUser$", void 0);
    __decorate([
        effects_1.Effect()
    ], UserEffects.prototype, "setUserStateToIdle$", void 0);
    UserEffects = __decorate([
        core_1.Injectable()
    ], UserEffects);
    return UserEffects;
}());
exports.UserEffects = UserEffects;
