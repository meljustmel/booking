import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'user-item',
  templateUrl: 'user-item.html',
  styles: [`
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
export class UserItemComponent implements OnInit {
  @Input() user;
  constructor() {
  }

  ngOnInit() {
  }
  gotoProfile(id) {
    // this.res.kill(id);
  }

}
