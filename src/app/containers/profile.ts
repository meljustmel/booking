import { Component, HostBinding, OnInit } from "@angular/core";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { UserActions } from "../store/actions/user";
import { UserService } from "../core/service/user";
import * as RootStore from "../store";
import { Router, ActivatedRoute } from '@angular/router'
import { ReservationService } from '../core/service/res';

import { routeFadeStateTrigger } from "../app.animations";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter } from "rxjs/operator/filter";

@Component({
  selector: 'profile',
  template: `
    <div class="spacer"></div>
    <div class="spacer"></div>
    <div class="spacer"></div>
    <div class="u-maxWidth1000 container">
      <div class="" *ngIf="profile">
        <div class="">
            <div class="postMetaInline-avatar u-flex0">
                <img alt="Go to the profile of"
                     class="avatar-image u-size36x36 u-xs-size32x32"
                     [src]="profile.photoURL">
              {{ profile.displayName }}
            </div>
        </div>
      </div>
    <div class="metabar-inner u-marginAuto u-maxWidth1000 js-metabarBottom">
      <nav class="metabar-block metabar-block--below u-overflowHiddenY u-height50 u-xs-height39">
        <ul class="u-borderTopLightest u-textAlignLeft u-noWrap u-overflowX u-paddingTop4 u-xs-paddingTop0 u-paddingBottom100 u-xs-paddingLeft20 u-xs-paddingRight20">
          <li class="metabar-navItem u-uiTextRegular u-fontSizeSmaller u-inlineBlock u-textColorNormal u-xs-paddingRight12 u-xs-marginRight0">
            <a class="link link--darken u-accentColor--textDarken u-baseColor--link"
               routerLink="/profile"
               routerLinkActive="link--darker"
               [routerLinkActiveOptions]="{exact: true}">Profile</a>
          </li>
          <li class="metabar-navItem u-uiTextRegular u-fontSizeSmaller u-inlineBlock u-textColorNormal u-xs-paddingRight12 u-xs-marginRight0">
            <a class="link  link--darken u-accentColor--textDarken u-baseColor--link"
               routerLink="reservations"
               routerLinkActive="link--darker">Reservations</a>
          </li>
          <li class="metabar-navItem u-uiTextRegular u-fontSizeSmaller u-inlineBlock u-textColorNormal u-xs-paddingRight12 u-xs-marginRight0">
            <a class="link link--darken u-accentColor--textDarken u-baseColor--link"
               routerLink="messages"
               routerLinkActive="link--darker">Messages</a>
          </li>
        </ul>
      </nav>
    </div>
          <router-outlet></router-outlet>
    </div>
    <!--<pre>{{filtered$ | async | json }}</pre>-->

  `,
  styles: [`
  :host {
    display: block;
  }
  `],
  animations: [
    routeFadeStateTrigger
  ]
})
export class ProfileComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;
  profile;

  constructor(private usersActions: UserActions,
              private userService: UserService,
              private reservationService: ReservationService,
              private route: ActivatedRoute,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<RootStore.AppState>) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.store.select(state => state.authState.profile).subscribe(profile => {
      this.slimLoadingBarService.complete();
      this.profile = profile;
    });

    //let userId = this.route.params['value'].id;
    //
    //this.userService.getSingleUser(userId).take(1).subscribe((user) => {
    //  this.slimLoadingBarService.complete();
    //  if (user.$exists()) {
    //    this.user$ = user;
    //  } else {
    //    console.log('user does not exists')
    //  }
    //});
    //
    //this.reservationService.loadUserReservations(userId).subscribe((reservations) => {
    //  console.log('hala reservations', reservations)
    //  this.reservations$ = reservations;
    //});
  }
}
