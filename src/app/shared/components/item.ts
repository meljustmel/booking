import {Component, Input, OnInit} from "@angular/core";
import {ReservationService} from "../../core/service/res";

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
  constructor(private res: ReservationService) {
  }

  ngOnInit() {
  }
  delete(id) {
    this.res.kill(id);
  }

}
