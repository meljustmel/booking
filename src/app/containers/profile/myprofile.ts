import { Component, HostBinding, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ReservationsActions } from '../../store/actions/res';
import { ReservationService } from '../../core/service/res';
import * as RootStore from '../../store/index';
import { ReservationStatus, getReservationStatusName } from '../../core/model/index';

import {routeFadeStateTrigger} from '../../app.animations';


import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operator/filter';

@Component({
  selector: 'myprofile',
  template: `
      <div>
     My Profile
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
export class MyProfileComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;
  reservations;

  constructor(private reservationsActions: ReservationsActions,
              private reservationService: ReservationService,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<RootStore.AppState>) {
  }

  ngOnInit() {
  }


}
