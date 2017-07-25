import {Component, HostBinding, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {UserActions} from "../store/actions/user";
import {UserService} from "../core/service/user";
import * as RootStore from "../store";

import {routeFadeStateTrigger} from "../app.animations";

import {Store} from "@ngrx/store";

@Component({
  selector: 'users',
  template: `
    <hero [background]="'assets/hero.png'">
      <search (searchChanged)="searchValueChanged($event)"></search>
    </hero>
    <div class="spacer"></div>
    <div class="spacer"></div>
    <block>
      <block-header [tag]="'This is where the header tag is'"></block-header>
      <user-list [users]="filtered || []"></user-list>
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
export class UsersComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;
  users;
  filtered;
  searchString = '';
  constructor(private usersActions: UserActions,
              private userService: UserService,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<RootStore.AppState>) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.store.dispatch(this.usersActions.getUsers());
    // this.store.select(state => state.userState.users);
    this.store.select(state => state.userState.users).subscribe((users) => {
      this.users = users;
      this.filterUsers();
    });
    this.slimLoadingBarService.complete();
  }


  filterUsers() {
    const filtered = [];
    const searchLowercase = this.searchString.toLocaleLowerCase();
    if (this.users && this.users.length > 0) {
      /*
       if (this.status == -1 && this.searchString == '') {
       this.filtered = [...this.reservations$];
       } else {
       */
      this.users.forEach(user => {
        if (this.searchString === '' || user.email.toLocaleLowerCase().includes(searchLowercase) || user.displayName.toLocaleLowerCase().includes(searchLowercase)) {
          filtered.push(user);
        }
      });
      this.filtered = filtered;
      // }
    }
  }

  searchValueChanged(event) {
    this.searchString = event ? event : '';
    this.filterUsers();
  }
}
