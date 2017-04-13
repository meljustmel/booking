"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//import { IAuthCredentials } from '../../models';
var core_1 = require('@angular/core');
var MessagesActions = (function () {
    function MessagesActions() {
    }
    MessagesActions.prototype.loadMessages = function (messages) {
        return {
            type: MessagesActions.LOAD_MESSAGES_RECEIVED
        };
    };
    MessagesActions.prototype.loadMessagesSuccess = function (messages) {
        return {
            type: MessagesActions.LOAD_MESSAGES_SUCCESS,
            payload: messages
        };
    };
    MessagesActions.prototype.loadMessagesFailure = function (error) {
        return {
            type: MessagesActions.LOAD_MESSAGES_FAILURE,
            payload: error
        };
    };
    MessagesActions.prototype.addMessage = function (message) {
        return {
            type: MessagesActions.ADD_MESSAGE_RECEIVED
        };
    };
    MessagesActions.prototype.addMessageSuccess = function (message) {
        return {
            type: MessagesActions.ADD_MESSAGE_SUCCESS,
            payload: message
        };
    };
    MessagesActions.prototype.addMessageFailure = function (error) {
        return {
            type: MessagesActions.ADD_MESSAGE_FAILURE,
            payload: error
        };
    };
    MessagesActions.LOAD_MESSAGES_RECEIVED = 'LOAD_MESSAGES_RECEIVED';
    MessagesActions.LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS';
    MessagesActions.LOAD_MESSAGES_FAILURE = 'LOAD_MESSAGES_FAILURE';
    MessagesActions.ADD_MESSAGE_RECEIVED = 'ADD_MESSAGE_RECEIVED';
    MessagesActions.ADD_MESSAGE_SUCCESS = 'ADD_MESSAGE_SUCCESS';
    MessagesActions.ADD_MESSAGE_FAILURE = 'ADD_MESSAGE_FAILURE';
    MessagesActions = __decorate([
        core_1.Injectable()
    ], MessagesActions);
    return MessagesActions;
}());
exports.MessagesActions = MessagesActions;
