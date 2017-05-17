import { Component, HostBinding, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ReservationsActions } from '../../store/actions/res';
import { ReservationService } from '../../core/service/res';
import * as RootStore from '../store';
import { ReservationStatus, getReservationStatusName } from '../../core/model/index';

import {routeFadeStateTrigger} from '../../app.animations';


import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operator/filter';

@Component({
  selector: 'myreservations',
  template: `
      <div>
      My reservations
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
export class MyReservationsComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;
  reservations;

  constructor(private reservationsActions: ReservationsActions,
              private reservationService: ReservationService,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<RootStore.AppState>) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.reservationService.loadReservations();

    this.store.select(state => state.reservationState.reservations).subscribe((reservations) => {
      this.reservations = reservations;
    });
    this.slimLoadingBarService.complete();
  }


}
