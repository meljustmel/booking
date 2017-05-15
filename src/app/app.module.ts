import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from "./core/core.module";
import {AngularFireModule} from "angularfire2";
import {SharedStoreModule} from "./store/index";
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import {firebaseConfig} from "./core/config/firebase";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AuthGuard } from './app.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SharedStoreModule,
    SharedModule,
    CoreModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
