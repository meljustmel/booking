import {Message} from "../../core/model/index";
import { MessagesActions } from './../actions/index';


export interface MessageState {
  pending: boolean;
  messages: Message[];
  selectedMessage: Message;
  error: string
}

const initialState: MessageState = {
  pending: false,
  messages: [],
  selectedMessage: null,
  error: null
};


function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}

function updateItemInArray(array, itemId, updateItemCallback) {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) {
      return item;
    }
    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });

  return updatedItems;
}


export default function (state = initialState, action) {
  switch (action.type) {

    // case 'ADD_TODO' : {
    //   const newMessage = {
    //     _id: action._id,
    //     content: action.content,
    //     read: false
    //   };
    //
    //   return updateObject(state, {messages: newMessage});
    // }

    // case MessagesActions.LOAD_MESSAGES_RECEIVED:
    //   return updateObject(state, {pending: true});

    case MessagesActions.LOAD_MESSAGES_SUCCESS:
      console.log('success called')
      return updateObject(state, {messages: action.payload, pending: false});

    case MessagesActions.LOAD_MESSAGES_FAILURE:
      return updateObject(state, {pending: false});

    case MessagesActions.ADD_MESSAGE_SUCCESS:
      return updateObject(state, {message: action.payload});

    case MessagesActions.TEST_RECEIVED:
      console.log('success called')
      return updateObject(state, {pending: true, error: null} );

    case MessagesActions.TEST_SUCCESS:
      return updateObject(state, {messages: action.payload, pending: false});

    case MessagesActions.TEST_FAILURE:
      return updateObject(state, {pending: false, error: "Error"});










    case 'TOGGLE_TODO' : {
      const newMessage = updateItemInArray(state.messages, action.id, message => {
        return updateObject(message, {read: !message.read});
      });

      return updateObject(state, {messages: newMessage});
    }
    case 'EDIT_TODO' : {
      const newMessage = updateItemInArray(state.messages, action.id, message => {
        return updateObject(message, {content: action.content});
      });

      return updateObject(state, {messages: newMessage});
    }
    default :
      return state;
  }
}
