import { User } from "../model/index";
import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFireDatabase } from "angularfire2/database";
import * as RootStore from '../../store';
import { Store } from '@ngrx/store';
import { UserActions } from '../../store/actions/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import {firebaseConfig} from '../config/firebase';
import { Http, RequestOptionsArgs, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {

  rootRef = firebase.database().ref();

  constructor(public af: FirebaseApp, private http: Http,
              private store: Store<RootStore.AppState>,
              private usersActions: UserActions,
            private db: AngularFireDatabase) { }

  getUsers() {
    console.log("Get USERS called")
    return this.db.list('/users');
  }
  getSingleUser(userId) {
    console.log("Get USERS called")

    let userRef = this.db.object("users/" + userId);
    return userRef;
  }

  initialiseUser(userData: User): firebase.Promise<void> {

    const key = this.rootRef.child('/userWriteable').push().key;

    userData.createdDate = new Date().toISOString();

    const fanOutUser = {};
    fanOutUser[`userReadable/${key}`] = userData;
    fanOutUser[`userWriteable/${key}`] = userData;

    return this.db.object(`/`).update(fanOutUser);

  }

  sendEmail(email: string, fullName: string, message: string): Observable<any> {
    const option: any =  {
      headers: {
        'Content-Type': 'Application/JSON'
      }
    };

    return this.http.post(`${firebaseConfig.cloudFunctionsURL}/sendmail`, { message: message, email: email, fullName: fullName }, option);
  }

}
