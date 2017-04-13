//import { IAuthCredentials } from '../../models';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class MessagesActions {

  static LOAD_MESSAGES_RECEIVED = 'LOAD_MESSAGES_RECEIVED';
  static LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS';
  static LOAD_MESSAGES_FAILURE = 'LOAD_MESSAGES_FAILURE';
  static ADD_MESSAGE_RECEIVED = 'ADD_MESSAGE_RECEIVED';
  static ADD_MESSAGE_SUCCESS = 'ADD_MESSAGE_SUCCESS';
  static ADD_MESSAGE_FAILURE = 'ADD_MESSAGE_FAILURE';
  static TEST_RECEIVED = 'TEST_RECEIVED';
  static TEST_SUCCESS = 'TEST_SUCCESS';
  static TEST_FAILURE = 'TEST_FAILURE';


  loadMessages(): Action {
    return {
      type: MessagesActions.LOAD_MESSAGES_RECEIVED
    };
  }

  loadMessagesSuccess(messages): Action {
    return {
      type: MessagesActions.LOAD_MESSAGES_SUCCESS,
      payload: messages
    };
  }

  loadMessagesFailure(error: string): Action {
    return {
      type: MessagesActions.LOAD_MESSAGES_FAILURE,
      payload: error
    };
  }


  addMessage(message): Action {
    return {
      type: MessagesActions.ADD_MESSAGE_RECEIVED,
      payload: message
    };
  }

  addMessageSuccess(message): Action {
    return {
      type: MessagesActions.ADD_MESSAGE_SUCCESS,
      payload: message
    };
  }

  addMessageFailure(error: string): Action {
    return {
      type: MessagesActions.ADD_MESSAGE_FAILURE,
      payload: error
    };
  }

  testMessage(message): Action {
    return {
      type: MessagesActions.ADD_MESSAGE_RECEIVED,
      payload: message
    };
  }

  testMessageSuccess(message): Action {
    return {
      type: MessagesActions.ADD_MESSAGE_SUCCESS,
      payload: message
    };
  }

  testMessageFailure(error: string): Action {
    return {
      type: MessagesActions.ADD_MESSAGE_FAILURE,
      payload: error
    };
  }
}
