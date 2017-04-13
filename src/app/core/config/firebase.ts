import { AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyD8IvTA1Go_VLzq4TMV2LYn0MljGdCKu8U",
  authDomain: "framework-97dbe.firebaseapp.com",
  databaseURL: "https://framework-97dbe.firebaseio.com",
  storageBucket: "framework-97dbe.appspot.com",
  messagingSenderId: "706011636077"
};


export const firebaseLoginPolicey = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect,
};
