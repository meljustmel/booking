"use strict";
var model_1 = require('../../core/model');
var actions_1 = require('./../actions');
var initialState = {
    status: model_1.LoginStatus.unknown,
    currentUser: null,
    newlyRegistered: false
};
function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues);
}
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_1.AuthActions.LOGIN_RECEIVED:
            return updateObject(state, { status: model_1.LoginStatus.loggingIn });
        case actions_1.AuthActions.LOGIN_SUCCESS:
            return updateObject(state, { status: model_1.LoginStatus.loggedIn, currentUser: action.payload.currentUser });
        case actions_1.AuthActions.LOGIN_FAILURE:
            return updateObject(state, { status: model_1.LoginStatus.loginFailed });
        case actions_1.AuthActions.LOGOUT_RECEIVED:
            return updateObject(state, { status: model_1.LoginStatus.loggingOut });
        case actions_1.AuthActions.LOGOUT_SUCCESS:
            return updateObject(state, { status: model_1.LoginStatus.loggedOut, currentUser: null });
        default: return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
exports.getStatus = function (state) { return state.status; };
