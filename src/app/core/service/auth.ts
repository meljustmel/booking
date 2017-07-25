import "rxjs/add/observable/fromPromise";
import * as RootStore from "../../store";
import {AuthActions} from "../../store/actions/index";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {FirebaseApp } from "angularfire2";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import {User} from "../model/user";
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  public currentUser$: Observable<User>;

  constructor(public auth$: AngularFireAuth,
              public af: FirebaseApp,
              public db: AngularFireDatabase,
              private authActions: AuthActions,
              private store: Store<RootStore.AppState>) {
    this.currentUser$ = store.select(state => state.authState.currentUser);


    this.auth$.authState.subscribe(user => {
      if (user) {

        const userData = user;
        const userRef = db.object("users/" + userData.uid);

        const dataToSet = {
          displayName: userData.providerData[0].displayName,
          email: userData.providerData[0].email,
          photoURL: userData.providerData[0].photoURL,
          providerId: userData.providerData[0].providerId,
          registeredAt: new Date()
        };

        userRef.take(1).subscribe((user) => {
          if (user.$exists()) {
            // console.log('user exists', user);
            this.store.dispatch(this.authActions.updateUserInfo(user));

          } else {
            // console.log('user does not exists');
            userRef.set(dataToSet)
              .then((result) => {
                // console.log(result)
              })
              .catch((error) => {
                // console.log(error);
              });
          }
        });
        // console.log('hello user', user);
        this.store.dispatch(this.authActions.loginSuccess(user));
      } else {
        this.store.dispatch(this.authActions.logOutUser());
      }
    });

  }

  getCurrentUser(): Observable<User> {
    let user;
    this.store.take(1).subscribe(s => {
      user = s.authState.currentUser;
      Observable.of(user);
    });
    return user;

  }



  get isAuthenticated(): boolean {
    let user: User;
    // this.store.take(1).subscribe(s => user = s.user)
    if (user) {
      return true;
    }
    return false;
  };


  logout(): Observable<any> {
    return Observable.create((observer) => {
      this.auth$.auth.signOut().then(() => {
        // console.log('logging out');
        return observer.next(this.authActions.logoutSuccess());
      }, (error) => {
        // console.log("error", error);
        return observer.next(this.authActions.logoutFailure(error.message));
      });

    });
  }

  // register(credentials): Observable<any> {
  //  return Observable.fromPromise(<Promise<any>>this.auth$.createUser(credentials));
  // }

  login(provider): Observable<any> {
    // console.log('service', provider);
    return Observable.create((observer) => {
      if (provider === 'Facebook') {
        this.auth$.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider).then((user) => {
          // console.log("user", user);
          return observer.next(this.authActions.loginSuccess(user));
        }, (error) => {
          // console.log("error", error);
          return observer.next(this.authActions.loginFailure(error.message));
        });
      } else {
        this.auth$.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider).then((user) => {
          // console.log("service log google----should be user", user);
          return observer.next(this.authActions.loginSuccess(user));
        }, (error) => {
          // console.log("error", error);
          return observer.next(this.authActions.loginFailure(error.message));
        });
      }
    });
  }
}
