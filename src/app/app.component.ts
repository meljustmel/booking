import {Component, ComponentRef, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {LoginModalComponent, ModalService} from "./shared/modal/index";
import {Observable} from 'rxjs/Observable';
import {SharedModule} from "./shared/shared.module";
import {AuthActions} from "./store/actions/index";
import {PopoverNotificationsComponent, PopoverMenuComponent, PopoverService} from "./shared/popover/index";
import * as RootStore from './store';
import {User} from "./core/model/index";

@Component({
  selector: 'app-root',
  template: `
    <div class="site-main surface-container" id="container">

      <div class="surface" style="display: block; visibility: visible;">
        <div class="screenContent surface-content">
          <navigator [user]='user$ | async'
                     [profile]='profile$ | async'
                     (open)='authModal()'
                     (menu)='openMenu()'
                     (notifications)='openNotifications()'
                     (signOut)='signOut()'></navigator>
          <router-outlet></router-outlet>
          <placeholder></placeholder>
          <popover-template></popover-template>


          <!--<div class="metabar metabar&#45;&#45;spacer js-metabarSpacer u-height115 u-xs-height95"></div>-->
          <!--<action></action>-->
          <!--<div class="streamItem streamItem&#45;&#45;digestSection" data-scroll="native">-->
            <!--<div class="streamItem-card streamItem-card&#45;&#45;digestSectionPreview cardChromeless u-borderTop2 u-marginBottom20">-->
              <!--<div class="streamItem-cardInner streamItem-cardInner&#45;&#45;digestSectionPreview u-paddingTop0">-->
                <!--<header class="heading u-clearfix heading&#45;&#45;borderedBottom u-padding10">-->
                  <!--<div class="u-clearfix">-->
                    <!--<div class="heading-content u-floatLeft">-->
                      <!--<span class="heading-title heading-title&#45;&#45;darker u-padding10">Most recommended by people you follow</span>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</header>-->
                <!--<card></card>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <ng2-slim-loading-bar [color]="'pink'" [height]="'2px'"></ng2-slim-loading-bar>
    <foot></foot>
  `,
  styles: [``]
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  profile$: Observable<User>;

  constructor(private store: Store<RootStore.AppState>,
              private authActions: AuthActions,
              private modalService: ModalService,
              private popoverService: PopoverService) { }

  ngOnInit() {
    this.user$ = this.store.select(state => state.authState.currentUser);
    this.profile$ = this.store.select(state => state.authState.profile);
    (<any>window).Stripe.setPublishableKey('pk_live_w68cmUaq2Mj63jSiQuGASmth');


  }
  authModal(): void {
    const modal$ = this.modalService.create(SharedModule, LoginModalComponent, {
      signIn: (provider) => {
        this.signIn(provider);
      }
    });
  }

  openMenu(): void {
    const menu$ = this.popoverService.create(SharedModule, PopoverMenuComponent, {
      signOut: () => {
        this.signOut();
      }
    });
  }

  openNotifications(): void {
    const notifications$ = this.popoverService.create(SharedModule, PopoverNotificationsComponent, {
      signIn: (provider) => {
        this.signIn(provider);
      }
    });
  }
  signIn(provider): void {
    console.log(provider);
    this.store.dispatch(this.authActions.loginUser(provider));
  }
  signOut(): void {
    this.store.dispatch(this.authActions.logOutUser());
  }
}
