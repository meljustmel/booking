import {Component, Input, OnInit} from "@angular/core";
import {ReservationService} from "../../core/service/res";

@Component({
  selector: 'item',
  templateUrl: 'item.html',
  styles: []
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
