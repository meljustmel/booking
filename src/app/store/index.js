"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var fromAuth = require('./reducers/auth');
var fromMessage = require('./reducers/message');
// import * as fromNotify from './reducers/notify';
var fromUser = require('./reducers/user');
var core_1 = require('@angular/core');
var compose_1 = require('@ngrx/core/compose');
var effects_1 = require('@ngrx/effects');
var store_1 = require('@ngrx/store');
// import { localStorageSync } from 'ngrx-store-localstorage';
// import { storeLogger } from 'ngrx-store-logger';
var actions_1 = require('./actions');
var effects_2 = require('./effects');
var store_devtools_1 = require("@ngrx/store-devtools");
var user_1 = require("./actions/user");
;
exports.actions = [
    actions_1.AuthActions,
    actions_1.MessagesActions,
    user_1.UserActions
];
exports.composeStore = compose_1.compose(
// storeLogger(),
//localStorageSync(['authState']),
store_1.combineReducers)({
    authState: fromAuth.default,
    messageState: fromMessage.default,
    userState: fromUser.default
});
function reducer(state, action) {
    return exports.composeStore(state, action);
}
exports.reducer = reducer;
// export const getCurrentUser = (state: AppState) => state.authState.currentUser;
// export function getCurrentUser(state$: Observable<State<AppState>>) {
//   return state$.select(s => s.emailTemplate)
// }
var SharedStoreModule = (function () {
    function SharedStoreModule() {
    }
    SharedStoreModule = __decorate([
        core_1.NgModule({
            imports: [
                store_1.StoreModule.provideStore(reducer),
                effects_1.EffectsModule.run(effects_2.AuthEffects),
                effects_1.EffectsModule.run(effects_2.UserEffects),
                store_devtools_1.StoreDevtoolsModule.instrumentOnlyWithExtension({
                    maxAge: 20
                })
            ],
            declarations: [],
            exports: [],
            providers: exports.actions.slice()
        })
    ], SharedStoreModule);
    return SharedStoreModule;
}());
exports.SharedStoreModule = SharedStoreModule;
;
