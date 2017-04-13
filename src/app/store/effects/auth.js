"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('rxjs/add/observable/of');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
var actions_1 = require('../actions');
var core_1 = require('@angular/core');
var effects_1 = require('@ngrx/effects');
var Observable_1 = require('rxjs/Observable');
var AuthEffects = (function () {
    function AuthEffects(actions$, authActions, authService) {
        var _this = this;
        this.actions$ = actions$;
        this.authActions = authActions;
        this.authService = authService;
        this.login$ = this.actions$
            .ofType(actions_1.AuthActions.LOGIN_RECEIVED)
            .map(effects_1.toPayload)
            .switchMap(function (provider) {
            return _this.authService.login(provider);
        });
        this.logOut$ = this.actions$
            .ofType(actions_1.AuthActions.LOGOUT_RECEIVED)
            .map(function () { return _this.authService.logout(); })
            .map(function () { return _this.authActions.logoutSuccess(); });
        this.registerUser$ = this.actions$
            .ofType(actions_1.AuthActions.REGISTER_RECEIVED)
            .map(effects_1.toPayload)
            .switchMap(function (authCredentials) {
            return _this.authService.register(authCredentials)
                .switchMap(function () { return Observable_1.Observable.of(_this.authActions.registerSuccess()); })
                .catch(function (error) { return Observable_1.Observable.of(_this.authActions.registerFailure(error.message)); });
        });
        this.checkAuth$ = this.actions$
            .ofType(actions_1.AuthActions.USER_AUTHENTICATED)
            .map(effects_1.toPayload)
            .switchMap(function (authCredentials) {
            return _this.authService.register(authCredentials)
                .switchMap(function () { return Observable_1.Observable.of(_this.authActions.registerSuccess()); })
                .catch(function (error) { return Observable_1.Observable.of(_this.authActions.registerFailure(error.message)); });
        });
    }
    __decorate([
        effects_1.Effect()
    ], AuthEffects.prototype, "login$", void 0);
    __decorate([
        effects_1.Effect()
    ], AuthEffects.prototype, "logOut$", void 0);
    __decorate([
        effects_1.Effect()
    ], AuthEffects.prototype, "registerUser$", void 0);
    __decorate([
        effects_1.Effect()
    ], AuthEffects.prototype, "checkAuth$", void 0);
    AuthEffects = __decorate([
        core_1.Injectable()
    ], AuthEffects);
    return AuthEffects;
}());
exports.AuthEffects = AuthEffects;
