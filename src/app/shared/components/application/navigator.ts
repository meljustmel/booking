import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {User} from "../../../core/model/index";
@Component({
  selector: 'navigator',
  template: `
    <div [style.z-index]='' [ngClass]="user ? 'activated' : 'metabar'" class="metabar u-clearfix js-metabar is-withBottomSection">
      <div class="metabar-inner u-marginAuto u-maxWidth1000">
        <div class="metabar-block metabar-block--left u-floatLeft u-height65 u-xs-height56">
          <!--<logo [style.fill]="user ? '#404040' : 'white'"></logo>-->
        </div>
        <div class="metabar-block u-floatRight u-xs-absolute u-xs-textAlignRight u-xs-right0 u-height65 u-xs-height56">
          <div *ngIf='!user' class="buttonSet">
            <a (click)='onOpen($event)' class="button button--small button--login u-accentColor--buttonNormal u-sm-hide u-marginRight15 u-lineHeight30 u-height32">Sign In</a>
          </div>
          <div *ngIf='user' class="buttonSet">
            <!--<button (click)='onNotifications()' class="button button&#45;&#45;small button&#45;&#45;circle button&#45;&#45;chromeless is-touchIconBlackPulse is-inSiteNavBar u-baseColor&#45;&#45;buttonNormal button&#45;&#45;withIcon button&#45;&#45;withSvgIcon button&#45;&#45;activity u-marginRight10"-->
                    <!--title="Notifications" aria-label="Notifications" style="margin-bottom: 6px;">-->
          <!--<span class="svgIcon svgIcon&#45;&#45;bell svgIcon&#45;&#45;25px">-->
          <!--<svg class="svgIcon-use" width="25" height="25" viewBox="-293 409 25 25">-->
            <!--<path d="M-273.327 423.67l-1.673-1.52v-3.646a5.5 5.5 0 0 0-6.04-5.474c-2.86.273-4.96 2.838-4.96 5.71v3.41l-1.68 1.553c-.204.19-.32.456-.32.734V427a1 1 0 0 0 1 1h3.49a3.079 3.079 0 0 0 3.01 2.45 3.08 3.08 0 0 0 3.01-2.45h3.49a1 1 0 0 0 1-1v-2.59c0-.28-.12-.55-.327-.74zm-7.173 5.63c-.842 0-1.55-.546-1.812-1.3h3.624a1.92 1.92 0 0 1-1.812 1.3zm6.35-2.45h-12.7v-2.347l1.63-1.51c.236-.216.37-.522.37-.843v-3.41c0-2.35 1.72-4.356 3.92-4.565a4.353 4.353 0 0 1 4.78 4.33v3.645c0 .324.137.633.376.85l1.624 1.477v2.373z"></path>-->
          <!--</svg>-->
        <!--</span>-->
            <!--</button>-->
            <button class="button button--chromeless u-baseColor--buttonNormal is-inSiteNavBar js-userActions" aria-haspopup="true" data-action="open-userActions">
              <div (click)='onMenu($event)' class="avatar">
                <img [src]="user?.photoURL" class="avatar-image avatar-image--icon" [alt]="user?.displayName">
              </div>
            </button>
          </div>
        </div>
      </div>
      <secondary *ngIf='user' [user]='this.user' [profile]='this.profile'></secondary>
    </div>
  `,
  styleUrls: ['navigator.scss']
})
export class NavigatorComponent implements OnInit {

  @Input() user: User;
  @Input() profile: User;

  @Output() open = new EventEmitter<any>();
  @Output() menu = new EventEmitter<any>();
  @Output() notifications = new EventEmitter<any>();

  @Output() signOut = new EventEmitter<any>();
  isUser: boolean;

  constructor() {
    if (this.user) {
      this.isUser = true;
    }
  }

  ngOnInit() {
    if (this.user) {
      this.isUser = true;
    } else {
      this.isUser = false;
    }
  }

  onOpen(event) {
    this.open.emit(event);
  }

  onMenu(event) {
    this.menu.emit(event);
  }

  onNotifications() {
    this.notifications.emit(event);
  }

  onSignOut(event) {
    this.signOut.emit(event);
  }

}
