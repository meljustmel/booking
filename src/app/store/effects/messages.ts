import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import {MessagesService} from "../../core/service";
import {MessagesActions} from "../actions";
import * as RootStore from "../";
import {Injectable} from "@angular/core";
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {AngularFireDatabase} from "angularfire2";

@Injectable()
export class MessageEffects {

  @Effect() loadMessages$ = this.actions$
    .ofType(MessagesActions.LOAD_MESSAGES_RECEIVED)
    .map(toPayload)
    .switchMap(() => {
      console.log('effects')
        return this.db.list('messages')
          .switchMap((messages) => Observable.of({type: MessagesActions.LOAD_MESSAGES_SUCCESS, payload: messages}))
          .catch(error => Observable.of({type: MessagesActions.LOAD_MESSAGES_FAILURE}))

      }
    );

  @Effect() addMessage$ = this.actions$
    .ofType(MessagesActions.ADD_MESSAGE_RECEIVED)
    .switchMap(action =>
      this.messagesService.createMessage2(action)
        .map(message => ({type: MessagesActions.ADD_MESSAGE_SUCCESS, payload: message}))
        .catch(() => Observable.of({type: MessagesActions.ADD_MESSAGE_FAILURE})));


  constructor(private store: Store<RootStore.AppState>,
              private db: AngularFireDatabase,
              private actions$: Actions,
              private messagesService: MessagesService) {
  }

}
