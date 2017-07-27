import {Component, HostBinding, OnChanges, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {UserActions} from "../store/actions/user";
import {UserService} from "../core/service/user";
import * as RootStore from "../store";
import {ActivatedRoute} from "@angular/router";
import {ReservationService} from "../core/service/res";
import {getReservationStatusName} from "../core/model/index";


import {routeFadeStateTrigger} from "../app.animations";

import {Store} from "@ngrx/store";

@Component({
  selector: 'profile',
  templateUrl: 'profile.html',
  styleUrls: ['profile.scss'],
  animations: [
    routeFadeStateTrigger
  ]
})
export class ProfileComponent implements OnInit, OnChanges {
  @HostBinding('@routeFadeState') routeAnimation = false;
  profile;
  userId;
  reservations$;
  status;

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
      if (this.profile) {
        this.userId = this.profile.$key;
      }
    });
    if (this.userId) {
      this.reservations$ = this.reservationService.loadUserReservations(this.userId);
    }
  }
  ngOnChanges() {
    if (this.userId) {
      this.reservations$ = this.reservationService.loadUserReservations(this.userId);
    }

  }

  currentStatus(reservation) {
    return getReservationStatusName(reservation.reservation.status);
  }
}
