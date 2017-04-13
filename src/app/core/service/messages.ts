import {Inject, Injectable} from "@angular/core";
import {
  AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable,
  FirebaseRef
} from "angularfire2";
import {Store} from "@ngrx/store";
import * as RootStore from "../../store";
import {MessagesActions} from "../../store/actions";
import {Message} from "../model";
import {Observable, Subject} from "rxjs";
import * as firebase from 'firebase';


const BASE_URL = '/messages/';
@Injectable()
export class MessagesService {

  messages: Observable<Message[]>
  rootRef = firebase.database().ref();

  constructor(public af: AngularFire,
              private db: AngularFireDatabase,
              private messagesActions: MessagesActions,
              private store: Store<RootStore.AppState>) {
    this.messages = store.select('messages')

  }

  loadMessages() {
    return this.db.list('messages')
      .subscribe(action => this.store.dispatch(this.messagesActions.loadMessagesSuccess(action)));
  }

  getMessages(){
    return this.af.database.list('messages')
      .map((messages: Message[]) => {
        return messages.map((message: Message) => {
          return {
            hour: message.uid,
            header: message.id,
            available: message.timestamp,
            message
          }
        })
      })
  }

  // getAllReservations() {
  //   return this.af.database.list('reservations')
  //     .map((res: Reservation[]) => {
  //       //console.log(res)
  //       return res.map((reservation: Reservation) => {
  //         return {
  //           title: reservation.service,
  //           start: new Date(reservation.reservationDate),
  //           color: colors.pink,
  //           incrementsBadgeTotal: true,
  //           reservation
  //         }
  //       })
  //     })
  // }


  // saveMessage(message: Message) {
  //   (message.id) ? this.updateMessage(message) : this.createMessage(message);
  // }

  getTodos() {
    const todos = [{id: 1, title: "Learn ngrx/store", completed: false}, {id: 2, title: "Learn ngrx/effects", completed: false}]
    return Observable.timer(1000).mapTo(todos)
  }

  createMessage(message) {

    const key = this.rootRef.child('/messages').push().key;

    const today = new Date().toISOString();

    const compiledMessage:Message = Object
      .assign({}, {content: message.message},{read: false}, {uid:message.uid}, {id:key}, {timestamp:today});
    console.log('in service',compiledMessage)

    const createMessageJoin = {};

    createMessageJoin[`messages/${key}`] = compiledMessage;
    createMessageJoin[`messagesFromClients/${message.uid}/${key}`] = true;
    createMessageJoin[`users/${message.uid}/messages/${key}`] = true;

    return this.af.database.object(`/`).update(createMessageJoin)
      .then(message => (this.messagesActions.addMessageSuccess(message)))
      .then(action => this.store.dispatch(action));
  }


  createMessage2(message) {

    const key = this.rootRef.child('/messages').push().key;

    const today = new Date().toISOString();

    const compiledMessage:Message = Object
      .assign({}, {content: message.message},{read: false}, {uid:message.uid}, {id:key}, {timestamp:today});
    console.log('in service',compiledMessage)

    const createMessageJoin = {};

    createMessageJoin[`messages/${key}`] = compiledMessage;
    createMessageJoin[`messagesFromClients/${message.uid}/${key}`] = true;
    createMessageJoin[`users/${message.uid}/messages/${key}`] = true;

    return Observable.of(this.af.database.object(`/`).update(createMessageJoin))

  }


  sendUserMessage(message) {
    const key = this.rootRef.child('/messages').push().key;

    const today = new Date().toISOString();

    const compiledMessage:Message = Object
      .assign({}, {content: message.message},{read: false}, {uid:message.uid}, {id:key}, {timestamp:today});
    console.log('in service',compiledMessage)

    const createMessageJoin = {};

    createMessageJoin[`messages/${key}`] = compiledMessage;
    createMessageJoin[`messagesFromClients/${message.uid}/${key}`] = true;
    createMessageJoin[`users/${message.uid}/messages/${key}`] = true;

    return this.af.database.object(`/`).update(createMessageJoin)
      .then(message => this.messagesActions.addMessageSuccess(message))
      .catch(error => Observable.of(this.messagesActions.addMessageFailure(error.message)))
  }

  deleteMessage(message: Message) {
    this.af.database.list(`${BASE_URL}${message.id}`)
      .subscribe(action => this.store.dispatch({ type: 'DELETE_ITEM', payload: message }));
  }
}
