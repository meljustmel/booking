import {Component, HostBinding, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ReservationsActions} from "../store/actions/res";
import {ReservationService} from "../core/service/res";
import * as RootStore from "../store";
import {getReservationStatusName} from "../core/model/index";
import {routeFadeStateTrigger} from "../app.animations";
import {Store} from "@ngrx/store";

@Component({
  selector: 'reservations',
  template: `
    <hero [background]="'assets/hero.png'">
      <search (searchChanged)="searchValueChanged($event)"></search>
    </hero>
    <div class="spacer"></div>
    <div class="spacer"></div>
    <block>
      <block-header [tag]="'This is where the header tag is'"></block-header>
      <div>
        <div class="btn-group">
          Filter By :
          <button data-toggle="dropdown"
                  class="button button--small u-noUserSelect button--withChrome u-baseColor--buttonNormal button--withHover button--unblock js-unblockButton">
            {{currentStatus()}} <span class="caret"></span></button>
          <ul class="dropdown-menu">
            <li><a (click)="updateStatus(-1)">All</a></li>
            <li><a (click)="updateStatus(0)">Booked</a></li>
            <li><a (click)="updateStatus(1)">Rescheduled</a></li>
            <li><a (click)="updateStatus(2)">Completed</a></li>
            <li><a (click)="updateStatus(3)">Cancelled</a></li>
          </ul>
        </div>
      </div>
      <item-list [items]="filtered || []" [showActionButton]="true" [showUserInfo]="true"></item-list>
    </block>
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
  reservations;
  filtered;
  searchString = '';
  status = -1;

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
      this.filterReservations();
    });

    this.slimLoadingBarService.complete();
  }

  filterReservations() {
    let filtered = [];
    let searchLowercase = this.searchString.toLocaleLowerCase();
    if (this.reservations && this.reservations.length > 0) {
        this.reservations.forEach(reservation => {
          if ((this.status == -1 || reservation.reservation.status == this.status) && (this.searchString == '' || reservation.reservation.client.email.toLocaleLowerCase().includes(searchLowercase) || reservation.reservation.client.name.toLocaleLowerCase().includes(searchLowercase))) {
            filtered.push(reservation);
          }
        })
        this.filtered = filtered;
    }
  }

  searchValueChanged(event) {
    this.searchString = event ? event : '';
    this.filterReservations();
  }
  updateStatus(newStatus) {
    this.status = newStatus;
    this.filterReservations();
  }

  currentStatus() {
    return getReservationStatusName(this.status);
  }

}
