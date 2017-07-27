import { Component, Input, OnInit } from "@angular/core";
import { ReservationService } from "../../core/service/res";
import { ReservationStatus, getReservationStatusName } from '../../core/model/index';

@Component({
  selector: 'item',
  templateUrl: 'item.html',
  styles: [`
    .link .link--darken .theme {
      font-family: "GT-Walsheim", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    }
    .link--accent {
      color: #5FE6BE;
    }
    .button--primary {
      color: #5FE6BE;
      border-color: #5FE6BE;
    }
    .button--primary:hover {
      color: #FFF;
      border-color: #5FE6BE;
      background-color: #5FE6BE;
    }
  `]
})
export class ItemComponent implements OnInit {
  @Input() reservation;
  @Input() showActionButton;
  @Input() showUserInfo;
  constructor(private reservationService: ReservationService) {
  }

  ngOnInit() {
  }

  currentStatus() {
    return getReservationStatusName(this.reservation.reservation.status);
  }

  updateStatus(newStatus) {
    this.reservationService.updateStatus(this.reservation.reservation, newStatus);
  }

}
