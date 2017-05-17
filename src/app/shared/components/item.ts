import { Component, Input, OnInit } from "@angular/core";
import { ReservationService } from "../../core/service/res";
import { ReservationStatus } from '../../core/model/index';

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
  constructor(private reservationService: ReservationService) {
  }

  ngOnInit() {
  }

  currentStatus() {
    if (this.reservation.reservation.status == ReservationStatus.booked) {
      return 'Booked';
    } else if (this.reservation.reservation.status == ReservationStatus.rescheduled) {
      return 'Rescheduled';
    } else if (this.reservation.reservation.status == ReservationStatus.cancelled) {
      return 'Cancelled';
    } else if (this.reservation.reservation.status == ReservationStatus.completed) {
      return 'Completed';
    }

    return '';
  }

  updateStatus(newStatus) {
    this.reservationService.updateStatus(this.reservation.reservation, newStatus);
  }

}
