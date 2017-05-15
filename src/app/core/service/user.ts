import { User } from "../model/index";
import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class UserService {

  rootRef = firebase.database().ref();

  constructor(public af: FirebaseApp,
            private db: AngularFireDatabase) { }

  getUsers(): FirebaseListObservable<any> {
    return this.db.list('/users');
  }

  initialiseUser(userData: User): firebase.Promise<void> {

    const key = this.rootRef.child('/userWriteable').push().key;

    userData.createdDate = new Date().toISOString();

    const fanOutUser = {};
    fanOutUser[`userReadable/${key}`] = userData;
    fanOutUser[`userWriteable/${key}`] = userData;

    return this.db.object(`/`).update(fanOutUser);

  }

}
