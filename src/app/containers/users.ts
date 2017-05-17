import {Component, HostBinding, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {UserActions} from "../store/actions/user";
import {UserService} from "../core/service/user";
import * as RootStore from "../store";

import {routeFadeStateTrigger} from "../app.animations";

import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {filter} from "rxjs/operator/filter";

@Component({
  selector: 'users',
  template: `
    <hero [background]="'assets/hero.png'">
      <search></search>
    </hero>
    <div class="spacer"></div>
    <div class="spacer"></div>
    <block>
      <block-header [tag]="'This is where the header tag is'"></block-header>

      <!--<item-list [items]="(filtered$ | async) || []"></item-list>-->
      <!--<br>-->
      <!--<hr>-->
      <!--<br>-->
      <user-list [users]="(users$ | async) || []"></user-list>
    </block>
    <!--<pre>{{filtered$ | async | json }}</pre>-->

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
  users$;
  constructor(private usersActions: UserActions,
              private userService: UserService,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<RootStore.AppState>) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();

    this.store.dispatch(this.usersActions.getUsers());
    this.users$ = this.store.select(state => state.userState.users);
    this.slimLoadingBarService.complete();
  }
}
