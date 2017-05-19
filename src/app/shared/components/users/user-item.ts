import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'user-item',
  templateUrl: 'user-item.html',
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
