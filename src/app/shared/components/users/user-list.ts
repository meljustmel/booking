import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'user-list',
  template: `
    <div *ngFor="let user of users">
      <user-item [user]="user"></user-item>
    </div>
  `,
  styles: []
})
export class UserListComponent implements OnInit {
  @Input() users;
  constructor() {
  }

  ngOnInit() {
  }

}
