import {Component, HostBinding, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ReservationsActions} from "../store/actions/res";
import {ReservationService} from "../core/service/res";
import * as RootStore from "../store";

import {routeFadeStateTrigger} from "../app.animations";


import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {filter} from "rxjs/operator/filter";

@Component({
  selector: 'reservations',
  template: `
    <hero [background]="'assets/hero.png'">
      <search></search>
    </hero>
    <div class="spacer"></div>
    <div class="spacer"></div>
    <block>
      <block-header [tag]="'This is where the header tag is'"></block-header>

      <!--<item-list [items]="(filtered$ | async) || []"></item-list>-->
      <!--<br>-->
      <!--<hr>-->
      <!--<br>-->
      <item-list [items]="(reservations$ | async) || []"></item-list>
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
export class ReservationsComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;
  reservations$;
  filtered$;
  day = "2017-04-17T04:00:00.000Z";
  constructor(private reservationsActions: ReservationsActions,
              private reservationService: ReservationService,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<RootStore.AppState>) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.reservationService.loadReservations();

    this.reservations$ = this.store.select(state => state.reservationState.reservations);
    this.filtered$ = this.reservationService.filteredReservations(this.day)
    //   .concatMap(array => Observable.from(array))
    //   .do(console.log)
    //   .map(item => {
    //     return item.time;
    //   });
    this.slimLoadingBarService.complete();
  }
}
