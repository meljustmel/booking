import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'user-list',
  template: `
    <div *ngFor="let user of users">
      <user-item [user]="user"></user-item>
    </div>
  `,
  styleUrls: ['user-list.scss']
})
export class UserListComponent implements OnInit {
  @Input() users;
  constructor() {
  }

  ngOnInit() {
  }

}
