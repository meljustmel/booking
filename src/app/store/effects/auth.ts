import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AuthService } from '../../core/service/index';
import { AuthActions } from '../actions/index';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthEffects {

  @Effect() login$ = this.actions$
    .ofType(AuthActions.LOGIN_RECEIVED)
    .map(toPayload)
    .switchMap((provider) => {
      return this.authService.login(provider);
    })

  @Effect() logOut$ = this.actions$
    .ofType(AuthActions.LOGOUT_RECEIVED)
    .map(() => this.authService.logout())
    .map(() => this.authActions.logoutSuccess());
/*
  @Effect() registerUser$ = this.actions$
    .ofType(AuthActions.REGISTER_RECEIVED)
    .map(toPayload)
    .switchMap(authCredentials =>
      this.authService.register(authCredentials)
        .switchMap(() => Observable.of(this.authActions.registerSuccess()))
        .catch(error => Observable.of(this.authActions.registerFailure(error.message)))
    );*/
/*
  @Effect() checkAuth$ = this.actions$
    .ofType(AuthActions.USER_AUTHENTICATED)
    .map(toPayload)
    .switchMap(authCredentials =>
      this.authService.register(authCredentials)
        .switchMap(() => Observable.of(this.authActions.registerSuccess()))
        .catch(error => Observable.of(this.authActions.registerFailure(error.message)))
    );*/

  constructor(
    private actions$: Actions,
    private authActions: AuthActions,
    private authService: AuthService
  ) { }

}
