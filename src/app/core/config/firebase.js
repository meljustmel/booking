"use strict";
var angularfire2_1 = require('angularfire2');
exports.firebaseConfig = {
    apiKey: "AIzaSyD8IvTA1Go_VLzq4TMV2LYn0MljGdCKu8U",
    authDomain: "framework-97dbe.firebaseapp.com",
    databaseURL: "https://framework-97dbe.firebaseio.com",
    storageBucket: "framework-97dbe.appspot.com",
    messagingSenderId: "706011636077"
};
exports.firebaseLoginPolicey = {
    provider: angularfire2_1.AuthProviders.Google,
    method: angularfire2_1.AuthMethods.Redirect,
};
