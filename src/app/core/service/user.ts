import {User} from "../model";
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  rootRef = firebase.database().ref();

  constructor(public af: AngularFire) { }

  getUsers(): FirebaseListObservable<any> {
    return this.af.database.list('/users');
  }

  initialiseUser(userData: User): firebase.Promise<void> {

    const key = this.rootRef.child('/userWriteable').push().key;

    userData.createdDate = new Date().toISOString();

    const fanOutUser = {};
    fanOutUser[`userReadable/${key}`] = userData;
    fanOutUser[`userWriteable/${key}`] = userData;

    return this.af.database.object(`/`).update(fanOutUser);

  }

}
