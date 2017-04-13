"use strict";
var actions_1 = require('./../actions');
var initialState = {
    pending: false,
    messages: [],
    selectedMessage: null
};
function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues);
}
function updateItemInArray(array, itemId, updateItemCallback) {
    var updatedItems = array.map(function (item) {
        if (item.id !== itemId) {
            return item;
        }
        var updatedItem = updateItemCallback(item);
        return updatedItem;
    });
    return updatedItems;
}
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case 'ADD_TODO': {
            var newMessage = {
                _id: action._id,
                content: action.content,
                read: false
            };
            return updateObject(state, { messages: newMessage });
        }
        case actions_1.MessagesActions.LOAD_MESSAGES_RECEIVED:
            return updateObject(state, { pending: true });
        case actions_1.MessagesActions.LOAD_MESSAGES_SUCCESS:
            return updateObject(state, { messages: action.payload, pending: false });
        case actions_1.MessagesActions.LOAD_MESSAGES_FAILURE:
            return updateObject(state, { pending: false });
        case 'TOGGLE_TODO': {
            var newMessage = updateItemInArray(state.messages, action.id, function (message) {
                return updateObject(message, { read: !message.read });
            });
            return updateObject(state, { messages: newMessage });
        }
        case 'EDIT_TODO': {
            var newMessage = updateItemInArray(state.messages, action.id, function (message) {
                return updateObject(message, { content: action.content });
            });
            return updateObject(state, { messages: newMessage });
        }
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
