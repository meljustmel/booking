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



          <div class="ContactOptions__container___3r-1R layout__margin-auto___3x3Ig">
            <a class="ActionBlock__container___3YbY1" routerLink="booking">
              <svg viewBox="-22 -22 96 96" class="ActionBlock__icon___1FkrF" >
                <path d="M50.35,4.55714286 L38.8147059,4.55714286 L38.8147059,1.41428571 C38.8147059,0.785714286 38.3470588,0.157142857 37.7235294,0.157142857 C37.1,0.157142857 36.4764706,0.628571429 36.4764706,1.25714286 L36.4764706,4.55714286 L15.1205882,4.55714286 L15.1205882,1.41428571 C15.1205882,0.785714286 14.6529412,0.157142857 14.0294118,0.157142857 C13.4058824,0.157142857 12.7823529,0.628571429 12.7823529,1.25714286 L12.7823529,4.55714286 L1.24705882,4.55714286 C0.623529412,4.55714286 5.68434189e-14,5.02857143 5.68434189e-14,5.81428571 L5.68434189e-14,53.7428571 C5.68434189e-14,54.3714286 0.467647059,55 1.24705882,55 L50.35,55 C50.9735294,55 51.5970588,54.5285714 51.5970588,53.7428571 L51.5970588,5.81428571 C51.5970588,5.18571429 50.9735294,4.55714286 50.35,4.55714286 L50.35,4.55714286 Z M12.7823529,7.07142857 L12.7823529,12.1 C12.7823529,12.7285714 13.4058824,13.2 14.0294118,13.2 C14.6529412,13.2 15.1205882,12.7285714 15.1205882,12.1 L15.1205882,7.07142857 L36.4764706,7.07142857 L36.4764706,12.1 C36.4764706,12.7285714 37.1,13.2 37.7235294,13.2 C38.3470588,13.2 38.8147059,12.7285714 38.8147059,12.1 L38.8147059,7.07142857 L49.1029412,7.07142857 L49.1029412,19.1714286 L2.33823529,19.1714286 L2.33823529,7.07142857 L12.7823529,7.07142857 Z M2.49411765,52.4857143 L2.49411765,21.5285714 L49.2588235,21.5285714 L49.2588235,52.4857143 L2.49411765,52.4857143 Z" id="Shape"></path>
                <path d="M36.6323529,27.8142857 L21.9794118,42.5857143 L15.5882353,36.1428571 C15.1205882,35.6714286 14.3411765,35.6714286 13.8735294,36.1428571 C13.4058824,36.6142857 13.4058824,37.2428571 13.8735294,37.7142857 L21.0441176,44.9428571 C21.5117647,45.4142857 22.2911765,45.4142857 22.7588235,44.9428571 L38.3470588,29.2285714 C38.8147059,28.7571429 38.8147059,27.9714286 38.3470588,27.5 C37.8794118,27.3428571 37.1,27.3428571 36.6323529,27.8142857 L36.6323529,27.8142857 Z" id="Shape"></path>
              </svg>



              
              
              
              
              
              <p class="ActionBlock__text___1OjzK" >Claim you spot now!</p>
              <span class="ActionBlock__link___eVZiK typography__link-underline___2RjK1">Reserve</span>
            </a>
            <a class="ActionBlock__container___3YbY1" href="tel:16465351334" >
              <svg viewBox="0 0 100 100" class="ActionBlock__icon___1FkrF" >
                <path d="M61.56 50.2a8.81 8.81 0 1 0 8.81 8.8 8.82 8.82 0 0 0-8.81-8.8zm0 15.87A7.06 7.06 0 1 1 68.62 59a7.07 7.07 0 0 1-7.06 7.07z"></path>
                <path d="M87.52 36.09l-.08-.09-.1-.08c-8.81-7.05-18.8-8.41-25.63-8.31a.35.35 0 0 1-.29 0c-6.83-.1-16.82 1.26-25.63 8.31l-.1.08-.08.07a11.19 11.19 0 0 0-2.23 3.35c-6.65-1-13.3 2.84-15.59 8.71A11.65 11.65 0 0 0 10 54.38a13.55 13.55 0 0 0 4.59 17.68A15 15 0 0 0 23 74.31a28.32 28.32 0 0 0 14.7-4.59 3.66 3.66 0 0 0 3.55 4.61h40.61a3.7 3.7 0 0 0 3.43-5.08l-7.57-18.69c3.58 1 9.31 2.36 9.38 2.36 1 0 2.49-1.73 2.73-2.87 2.39-7.64-.42-12.05-2.31-13.96zM19 50l.07-.28a7.29 7.29 0 0 1 1.72 0 7.4 7.4 0 0 1 5.06 3.37 3 3 0 0 1-.06 2.89 3.15 3.15 0 0 1-2.59 1.77A4.24 4.24 0 0 1 19.61 56c-1.3-1.75-1.04-4.22-.61-6zm-3.4 20.59a11.8 11.8 0 0 1-4-15.4 10 10 0 0 1 5.59-5.06c-.44 2.08-.55 4.8 1 6.9a5.91 5.91 0 0 0 5.15 2.53 4.91 4.91 0 0 0 4-2.69 4.72 4.72 0 0 0 .08-4.5 9.07 9.07 0 0 0-6.37-4.32 9.22 9.22 0 0 0-1.29-.11 13.15 13.15 0 0 1 13-6.81 15.79 15.79 0 0 0 .5 8.87c.26 1.22 1.72 3 2.75 3 .06 0 5.72-1.34 9.31-2.34l-6.51 16.13a.86.86 0 0 0-.34.17c-5.16 4.41-16.36 7.92-22.87 3.63zm67.87 1.12a1.92 1.92 0 0 1-1.61.86H41.25a1.94 1.94 0 0 1-1.8-2.67l7.91-19.68a7.64 7.64 0 0 0 .71-.42 2.11 2.11 0 0 0 .93-.62 2.27 2.27 0 0 0 .58-1 4.38 4.38 0 0 0 .42-2.71h22.45a1.92 1.92 0 0 1 .76.15 4.1 4.1 0 0 1 0 .78v.59a3.81 3.81 0 0 0 .43 1.49 2.2 2.2 0 0 0 .47.73 2.09 2.09 0 0 0 .95.61l.38.18.19.06 8 19.84a1.92 1.92 0 0 1-.16 1.82zM49.39 41.3a2.92 2.92 0 0 1 .14-1c.31-.32 2.36-1.93 12-2.18 9.65.25 11.69 1.86 12 2.14a2.38 2.38 0 0 1 .18 1.08 12 12 0 0 1-.22 2.52 3.69 3.69 0 0 0-1-.17h-6.36a.87.87 0 0 0 .06-.31V40a.88.88 0 0 0-1.75 0v3.37a.87.87 0 0 0 .06.31h-5.82V40a.88.88 0 0 0-1.75 0v3.68h-6.26a6.65 6.65 0 0 0-1.07.06 12 12 0 0 1-.21-2.44zm38.76 8.3A3.36 3.36 0 0 1 87 51.14c-1.48-.31-10.31-2.6-11.08-2.93a1 1 0 0 0-.2 0 3 3 0 0 1-.41-.27 1.65 1.65 0 0 1-.13-.22c0-.12-.07-.3-.12-.61l-.06-.49a11.48 11.48 0 0 1 .22-2.44 13.62 13.62 0 0 0 .26-2.86 3.36 3.36 0 0 0-.64-2.32c-1.08-1.11-4.25-2.48-13.22-2.71h-.13c-9 .23-12.13 1.6-13.22 2.71a3.36 3.36 0 0 0-.64 2.28 13.57 13.57 0 0 0 .26 2.86 11.72 11.72 0 0 1 .22 2.44l-.11.47c0 .17-.05.3-.07.41a2.49 2.49 0 0 1-.63.71.88.88 0 0 0-.19 0c-1 .37-9.83 2.67-11 2.92A3.39 3.39 0 0 1 35 49.52c-2-6.38-.09-10.14 1.86-12.17h.06c8.4-6.73 18-8 24.51-7.92h.14a.76.76 0 0 0 .19 0c6.57-.07 16.11 1.2 24.51 7.93h.06c1.93 2.02 3.82 5.78 1.82 12.24z">

                </path>
              </svg>
              <p class="ActionBlock__text___1OjzK">Call or Text me</p>
              <span class="ActionBlock__link___eVZiK typography__link-underline___2RjK1" data-reactid="624">+1 (646) 535-1334</span>
            </a>
          </div>
          
          
          <placeholder></placeholder>
          <popover-template></popover-template>
          
        </div>
      </div>
    </div>
    <ng2-slim-loading-bar [color]="'pink'" [height]="'2px'"></ng2-slim-loading-bar>
    <foot></foot>
  `,
  styles: [`
    .ContactOptions__container___3r-1R {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      border-top: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
    }

    .layout__margin-auto___3x3Ig {
      margin-left: auto;
      margin-right: auto;
    }

    .ActionBlock__container___3YbY1:not(:last-child) {
      border-right: 1px solid #d9d9d9;
    }
    
    svg:not(:root) {
      overflow: hidden;
    }
    .ActionBlock__icon___1FkrF {
      fill: #00237e;
      width: 6rem;
      height: 6rem;
      margin-bottom: .25rem;
    }
    iframe, img, svg, video {
      max-width: 100%;
      vertical-align: middle;
    }
    *, :after, :before {
      box-sizing: inherit;
    }

    .ActionBlock__text___1OjzK {
      margin-bottom: .25rem;
    }
    p {
      margin-top: 0;
      margin-bottom: 1rem;
      display: block;
      -webkit-margin-before: 1em;
      -webkit-margin-after: 1em;
      -webkit-margin-start: 0;
      -webkit-margin-end: 0;
    }
    .typography__link-underline___2RjK1 {
      color: #00237e;
      padding-bottom: .125rem;
      border-bottom: 1px solid rgba(0,35,126,.25);
      -webkit-transition: border-color .15s ease-out;
      transition: border-color .15s ease-out;
      cursor: pointer;
    }

    .ActionBlock__container___3YbY1 {
      text-align: center;
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      width: 50%;
      padding: 6rem 3rem;
      background-color: #fff;
    }



  `]
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
