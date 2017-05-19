import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import * as rx from 'rxjs'
import {Observable} from 'rxjs/Observable';
import {Store} from "@ngrx/store";

import * as RootStore from './store';
import {User} from "./core/model/index";
import {LoginModalComponent, ModalService} from "./shared/modal/index";
import {AuthActions} from "./store/actions/index";
import {SharedModule} from "./shared/shared.module";
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
/**
 * AuthGuard service is to provide client side router authorization
 */
export class AuthGuard implements CanActivate {
  user: any;
  profile: any;
  firstTime = true;

  constructor(private store: Store<RootStore.AppState>,
              private authActions: AuthActions,
              private _router: Router,
              private modalService: ModalService,
              private af: FirebaseApp,
              public auth$: AngularFireAuth,
              private db: AngularFireDatabase) {
    this.store.select(state => state.authState.currentUser).subscribe(user => {
      this.user = user;
    });
    this.store.select(state => state.authState.profile).subscribe(profile => {
      this.profile = profile;
    });
  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): any {
    let roles = route.data["roles"] as Array<string>;
    if (this.firstTime) {
      this.firstTime = false;

      return Observable.from(this.auth$.authState)
        .take(1)
        .map(state => {
          if (!state) {
            this._router.navigate(['/']);
            return false;
          }
            if (roles && roles.length > 0) {
              let userRef = this.db.object("users/" + state.uid);
              Observable.from(userRef).take(1).subscribe(user => {
                if (user.$exists()) {
                  if (!user.role || roles.indexOf(user.role) == -1) {
                    this._router.navigate(['/']);
                  }
                }
              })
            }
          return true;
        })
    }
    if(!this.user) {
      const modal$ = this.modalService.create(SharedModule, LoginModalComponent, {
        signIn: (provider) => {
          this.signIn(provider);
        }
      });
      this._router.navigate(['/']);
      return false;
    }
    if(!this.profile) {
      this._router.navigate(['/']);
      return false;
    }
    if (roles && roles.length > 0) {
      if (!this.profile.role) {
        this._router.navigate(['/']);
        return false;
      }
      if (roles.indexOf(this.profile.role) == -1) {
        this._router.navigate(['/']);
        return false;
      }
    }
    return true;
  }
  signIn(provider): void {
    this.store.dispatch(this.authActions.loginUser(provider));
  }
}

