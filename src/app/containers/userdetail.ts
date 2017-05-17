import { Component, HostBinding, OnInit } from "@angular/core";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { UserActions } from "../store/actions/user";
import { UserService } from "../core/service/user";
import * as RootStore from "../store";
import { Router, ActivatedRoute } from '@angular/router'

import { routeFadeStateTrigger } from "../app.animations";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter } from "rxjs/operator/filter";

@Component({
  selector: 'user-detail',
  template: `
    <hero [background]="'assets/hero.png'">
    </hero>
    <div class="spacer"></div>
    <div class="spacer"></div>
    <block>
      <block-header [tag]="'This is where the header tag is'"></block-header>

      <!--<item-list [items]="(filtered$ | async) || []"></item-list>-->
      <!--<br>-->
      <!--<hr>-->
      <!--<br>-->
      <div *ngIf="user$">
      <div class="postArticle postArticle--short">
      <div class="u-clearfix u-marginBottom10">
        <div class="postMetaInline u-floatLeft">
          <div class="u-flexCenter">
            <div class="postMetaInline-avatar u-flex0">
              <a class="link avatar u-baseColor--link" href="javascript:;">
                <img alt="Go to the profile of"
                     class="avatar-image u-size36x36 u-xs-size32x32"
                     [src]="user$.photoURL">
              </a>
            </div>
            <div class="postMetaInline-authorLockup u-flex1 u-noWrapWithEllipsis">
              <a
                class="link link link--darken link--accent u-accentColor--textNormal u-accentColor--textDarken u-baseColor--link">{{ user$.displayName }}
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </block>
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
export class UserDetailComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;
  user$;
  constructor(private usersActions: UserActions,
              private userService: UserService,
              private route: ActivatedRoute,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<RootStore.AppState>) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    let userId = this.route.params['value'].id;

    this.userService.getSingleUser(userId).take(1).subscribe((user) => {
        this.slimLoadingBarService.complete();
        if (user.$exists()) {
          console.log('user exists', user)
          this.user$ = user;
        } else {
          console.log('user does not exists')
        }}
    );
  }
}
