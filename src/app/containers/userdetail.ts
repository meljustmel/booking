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
      <div class="" *ngIf="user$">
        <div class="">
            <div class="postMetaInline-avatar u-flex0">
                <img alt="Go to the profile of"
                     class="avatar-image u-size36x36 u-xs-size32x32"
                     [src]="user$.photoURL">
              {{ user$.displayName }}
            </div>
          <p>
          Email: {{user$.email}}
          </p>
          <div>
          <h3>Reservations</h3>
          <item-list [items]="reservations$ || []" [showActionButton]="true" [showUserInfo]="false"></item-list>
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
  reservations$;

  constructor(private usersActions: UserActions,
              private userService: UserService,
              private reservationService: ReservationService,
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
        this.user$ = user;
      } else {
        console.log('user does not exists')
      }
    });

    this.reservationService.loadUserReservations(userId).subscribe((reservations) => {
      this.reservations$ = reservations;
    });
  }
}
