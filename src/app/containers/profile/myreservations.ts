import { Component, HostBinding, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ReservationsActions } from '../../store/actions/res';
import { ReservationService } from '../../core/service/res';
import * as RootStore from '../../store/index';
import { ReservationStatus, getReservationStatusName } from '../../core/model/index';

import {routeFadeStateTrigger} from '../../app.animations';


import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/observable';
import {filter} from 'rxjs/operator/filter';
import {UserActions} from "../../store/actions/user";
import {UserService} from "../../core/service/user";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'myreservations',
  template: `
    <!--<div class="u-maxWidth640 u-marginAuto" style="padding-top: 2em">-->
      <!--<div class="streamItem streamItem&#45;&#45;heading">-->
        <!--<div class="streamItemHeading u-marginAuto u-maxWidth700 u-xs-marginLeft20 u-xs-marginRight20">-->
          <!--<header class="heading u-clearfix heading&#45;&#45;streamSection">-->
            <!--<div class="u-clearfix">-->
              <!--<div class="heading-content u-floatLeft">-->
                <!--<span class="heading-title heading-title&#45;&#45;semibold">Reservations</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</header>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="streamItem streamItem&#45;&#45;postPreview">-->
        <!--<div class="streamItem-card streamItem-card&#45;&#45;postPreview u-paddingRight20 u-paddingLeft20 u-borderRadius3 cardChromeless">-->
          <!--<div class="streamItem-cardInner streamItem-cardInner&#45;&#45;postPreview">-->
            <!--<div class="postArticle postArticle&#45;&#45;short">-->
              <!--<div class="u-clearfix u-marginBottom10">-->
                <!--<div class="postMetaInline u-floatLeft">-->
                  <!--<div class="u-flexCenter">-->
                    <!--<div class="postMetaInline-avatar u-flex0">-->
                      <!--<a class="link avatar u-baseColor&#45;&#45;link" href="#">-->
                        <!--<img alt="Go to the profile of Florian" class="avatar-image u-size36x36 u-xs-size32x32" src="https://cdn-images-1.medium.com/fit/c/72/72/1*ezN8wgwLmtQiaEe947-xow.jpeg"></a>-->
                    <!--</div>-->
                    <!--<div class="postMetaInline postMetaInline-authorLockup u-flex1 u-noWrapWithEllipsis">-->
                      <!--<a class="link link link&#45;&#45;darken link&#45;&#45;accent u-accentColor&#45;&#45;textNormal u-accentColor&#45;&#45;textDarken u-baseColor&#45;&#45;link" href="#">testing</a>-->
                      <!--<div class="u-fontSize12 u-baseColor&#45;&#45;textNormal u-textColorNormal">-->
                        <!--<a class="link link&#45;&#45;darken" href="#">-->
                          <!--<div>Oct 18, 2014</div></a>-->
                        <!--<span class="middotDivider u-fontSize12"></span>-->
                        <!--<span class="readingTime" title="3 min read"></span>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="u-clearfix u-paddingTop10">-->
                <!--<div class="buttonSet buttonSet&#45;&#45;withLabels u-floatLeft">-->
                  <!--<div class="buttonSet-inner">-->
                    <!--<div class="">-->
                      <!--<button class="button button&#45;&#45;primary button&#45;&#45;chromeless is-touchIconFadeInPulse u-accentColor&#45;&#45;buttonNormal button&#45;&#45;withIcon button&#45;&#45;withSvgIcon u-accentColor&#45;&#45;iconLight" title="button"><span class="button-defaultState"><span class="svgIcon svgIcon&#45;&#45;heart svgIcon&#45;&#45;25px is-flushLeft"><svg class="svgIcon-use" height="25" viewbox="0 0 25 25" width="25">-->
										<!--<path d="M12.5 21a.492.492 0 0 1-.327-.122c-.278-.24-.61-.517-.978-.826-2.99-2.5-7.995-6.684-7.995-10.565C3.2 6.462 5.578 4 8.5 4c1.55 0 3 .695 4 1.89a5.21 5.21 0 0 1 4-1.89c2.923 0 5.3 2.462 5.3 5.487 0 3.97-4.923 8.035-7.865 10.464-.42.35-.798.66-1.108.93a.503.503 0 0 1-.327.12zM8.428 4.866c-2.414 0-4.378 2.05-4.378 4.568 0 3.475 5.057 7.704 7.774 9.975.243.2.47.39.676.56.245-.21.52-.43.813-.68 2.856-2.36 7.637-6.31 7.637-9.87 0-2.52-1.964-4.57-4.377-4.57-1.466 0-2.828.76-3.644 2.04-.1.14-.26.23-.43.23-.18 0-.34-.09-.43-.24-.82-1.27-2.18-2.03-3.65-2.03z" fill-rule="evenodd"></path></svg></span></span> <span class="button-activeState"><span class="svgIcon svgIcon&#45;&#45;heartFilled svgIcon&#45;&#45;25px is-flushLeft"><svg class="svgIcon-use" height="25" viewbox="0 0 25 25" width="25">-->
										<!--<path d="M12.5 21a.492.492 0 0 1-.327-.122c-.278-.24-.61-.517-.978-.826-2.99-2.5-7.995-6.684-7.995-10.565C3.2 6.462 5.578 4 8.5 4c1.55 0 3 .695 4 1.89a5.21 5.21 0 0 1 4-1.89c2.923 0 5.3 2.462 5.3 5.487 0 3.97-4.923 8.035-7.865 10.464-.42.35-.798.66-1.108.93a.503.503 0 0 1-.327.12z" fill-rule="evenodd"></path></svg></span></span></button> <button class="button button&#45;&#45;chromeless u-baseColor&#45;&#45;buttonNormal u-disablePointerEvents">150</button>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="buttonSet u-floatRight">-->
                  <!--<div class="buttonSet-inner">-->
                    <!--<a class="button button&#45;&#45;chromeless u-baseColor&#45;&#45;buttonNormal" href="#">3 responses</a> <button aria-label="Bookmark this story to read later" class="button button&#45;&#45;chromeless is-touchIconFadeInPulse u-baseColor&#45;&#45;buttonNormal button&#45;&#45;withIcon button&#45;&#45;withSvgIcon button&#45;&#45;bookmark" title="Bookmark"><span class="button-defaultState"><span class="svgIcon svgIcon&#45;&#45;bookmark svgIcon&#45;&#45;25px"><svg class="svgIcon-use" height="25" viewbox="0 0 25 25" width="25">-->
									<!--<path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path></svg></span></span> <span class="button-activeState"><span class="svgIcon svgIcon&#45;&#45;bookmarkFilled svgIcon&#45;&#45;25px"><svg class="svgIcon-use" height="26" viewbox="0 0 25 26" width="25">-->
									<!--<path d="M19 7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 17.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V7z" fill-rule="evenodd"></path></svg></span></span></button> <button class="button button&#45;&#45;chromeless is-touchIconBlackPulse u-baseColor&#45;&#45;buttonNormal button&#45;&#45;withIcon button&#45;&#45;withSvgIcon"><span class="svgIcon svgIcon&#45;&#45;arrowDown svgIcon&#45;&#45;19px is-flushRight"><svg class="svgIcon-use" height="19" viewbox="0 0 19 19" width="19">-->
									<!--<path d="M3.9 6.772l5.205 5.756.427.472.427-.472 5.155-5.698-.854-.772-4.728 5.254L4.753 6z" fill-rule="evenodd"></path></svg></span></button>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <pre>{{reservations$ | json}}</pre>
    
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
export class MyReservationsComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;
  user$;
  reservations$;

  constructor(private usersActions: UserActions,
              private userService: UserService,
              private reservationService: ReservationService,
              private route: ActivatedRoute,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<RootStore.AppState>) {
  }

  // ngOnInit() {
  //   this.slimLoadingBarService.start();
  //   this.reservationService.loadReservations();
  //
  //   this.store.select(state => state.reservationState.reservations).subscribe((reservations) => {
  //     this.reservations = reservations;
  //   });
  //   this.slimLoadingBarService.complete();
  // }

  ngOnInit() {
    this.slimLoadingBarService.start();
    const userId = this.route.params['value'].id;

    this.userService.getSingleUser(userId).take(1).subscribe((user) => {
      this.slimLoadingBarService.complete();
      if (user.$exists()) {
        this.user$ = user;
      } else {
        console.log('user does not exists');
      }
    });

    this.reservationService.loadUserReservations(userId).subscribe((reservations) => {
      this.reservations$ = reservations;
    });
  }


}
