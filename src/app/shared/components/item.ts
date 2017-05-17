import { Component, Input, OnInit } from "@angular/core";
import { ReservationService } from "../../core/service/res";
import { ReservationStatus, getReservationStatusName } from '../../core/model/index';

@Component({
  selector: 'item',
  templateUrl: 'item.html',
  styles: [`
    .link--accent {
      color: #AEEEE1;
    }
    .button--primary {
      color: #AEEEE1;
      border-color: #AEEEE1;
    }
    .button--primary:hover {
      color: #FFF;
      border-color: #AEEEE1;
      background-color: #AEEEE1;
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
