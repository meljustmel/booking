import {Popover} from "./popover";
import {ChangeDetectionStrategy, Component} from "@angular/core";

const template = `
  <div class="popover-menu-container" (click)="onClickedExit()">
    <div class="overlay-inner">
		<div class="popovercustom js-popover popover--menu popover--userActions popover--globalNav u-resetSpectrum popover--bottom is-active popover-menu-content" style="">
			<div class="popover-inner">
				<ul class="list list--borderless list--short list--large" role="menu">
					<li class="list-item list-item--dark u-padding0">
						<a routerLink="booking"
						class="button button--dark button--chromeless u-baseColor--buttonDark">Book Reservation</a>
					</li>
					<li class="list-item list-item--dark u-padding0">
						<a routerLink="about"
						class="button button--dark button--chromeless u-baseColor--buttonDark" >About</a>
					</li>
					<li class="list-item list-item--dark u-padding0">
						<a routerLink="contact"
						class="button button--dark button--chromeless u-baseColor--buttonDark" >Contact</a>
					</li>
					<li class="list-item list-item--separator"></li>
					<li class="list-item u-padding0">
						<a class="button button--dark button--chromeless u-baseColor--buttonDark" routerLink="/profile">Profile</a>
					</li>
					<li class="list-item u-padding0">
						<a (click)='onSignOut()' class="button button--dark button--chromeless u-baseColor--buttonDark" >Sign out</a>
					</li>
				
				</ul>
			</div>
			<div class="popover-arrow" style=""></div>
		</div>
		</div>
	</div>
`;

@Component({
  selector: "popover-menu",
  styleUrls: ['popover-menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template
})
@Popover()
export class PopoverMenuComponent {
  ok: Function;
  destroy: Function;
  closePopover: Function;
  signOut: Function;

  onClickedExit(): void {
    this.closePopover();
    this.destroy();
  }

  onSignOut(): void {
    this.signOut();
  }

  onOk(): void {
    this.closePopover();
    this.destroy();
  }
}
