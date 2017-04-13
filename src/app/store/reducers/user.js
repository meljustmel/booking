"use strict";
var model_1 = require('../../core/model');
var actions_1 = require('./../actions');
var initialState = {
    users: null,
    status: model_1.UserStatus.idle
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_1.UserActions.GET_USERS_RECEIVED:
            return Object.assign({}, state, {
                status: model_1.UserStatus.getUsersInProgress
            });
        case actions_1.UserActions.GET_USERS_SUCCESS:
            return Object.assign({}, state, {
                status: model_1.UserStatus.getUsersSuccess,
                users: action.payload
            });
        case actions_1.UserActions.GET_USERS_FAILURE:
            return Object.assign({}, state, {
                status: model_1.UserStatus.getUsersFailure
            });
        case actions_1.UserActions.INITIALISE_USER_RECEIVED:
            return Object.assign({}, state, {
                status: model_1.UserStatus.updateInProgress
            });
        case actions_1.UserActions.INITIALISE_USER_SUCCESS:
            return Object.assign({}, state, {
                status: model_1.UserStatus.updateSuccess
            });
        case actions_1.UserActions.INITIALISE_USER_FAILURE:
            return Object.assign({}, state, {
                status: model_1.UserStatus.updateFailure
            });
        case actions_1.UserActions.SET_STATUS_IDLE:
            return Object.assign({}, state, {
                status: model_1.UserStatus.idle
            });
        default:
            return Object.assign({}, state);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
