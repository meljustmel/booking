import {Popover} from "./popover";
import {ChangeDetectionStrategy, Component} from "@angular/core";

const template = `
<div class="overlay overlay--clear"  (click)="onClickedExit()">
		<div class="popover popover--menu popover--globalNav u-resetSpectrum popover--bottom u-fixed is-active">
			<div class="popover-inner u-padding0 u-width360 u-maxWidthNone">
				<ul class="notificationsList js-notificationsList">
					<li class="notificationsList-item u-hideOutline js-notification">
						<div class="notificationsList-userAvatarIcon">
							<a class="link avatar u-baseColor--link" href="#" tabindex="-1"><img alt="text here" class="avatar-image u-size36x36 u-xs-size32x32" src="https://cdn-images-1.medium.com/fit/c/72/72/0*s5QN0kfFoLzQg39p.jpg"></a>
						</div><a class="notificationsList-button" href="#" tabindex="-1"><span class="notificationsList-author">James Peter</span> recommended <span class="notificationsList-title notificationsList-title--oneLine">Hopefully, it makes apple care about the Mac line again.</span>
						<div class="notificationsList-timestamp">
							Jan 25
						</div></a>
					</li>
					<li class="notificationsList-item u-hideOutline">
						<div class="notificationsList-userAvatarIcon">
							<a class="link avatar u-baseColor--link" href="#" tabindex="-1"><img alt="blume" class="avatar-image u-size36x36 u-xs-size32x32" src="https://cdn-images-1.medium.com/fit/c/72/72/1*3P3vbQwCDml7QOmrS-2s0Q.jpeg"></a>
						</div><a class="notificationsList-button" href="#" tabindex="-1"><span class="notificationsList-author">New Person</span> started following you
						<div class="notificationsList-timestamp">
							Dec 9, 2015
						</div></a>
					</li>
					<li class="u-clearfix notificationsList-actions"><span class="u-floatLeft"><button class="button button--chromeless u-baseColor--buttonNormal"><span class="u-floatLeft"><span class="u-floatLeft">Older notifications</span></span></button></span> <span class="u-floatRight"><a class="button button--chromeless u-baseColor--buttonNormal" href="#">Your stats</a></span></li>
				</ul>
			</div>
			<div class="popover-arrow" style="left: 195px;"></div>
		</div>
	</div>
`;
@Component({
  selector: "popover-notifications",
  styles: [`
    .popover {
      left: 875px;
      top: 49px;
      box-sizing: border-box;
      width: 390px;
      height: 719px;
    }

    .popover-inner {
      height: 689px;

    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template
})
@Popover()
export class PopoverNotificationsComponent {
  ok: Function;
  destroy: Function;
  closePopover: Function;
  signIn: Function;

  onClickedExit(): void {
    this.closePopover();
    this.destroy();
  }

  signInWithProvider(provider): void {
    this.signIn(provider)
  }

  onOk(): void {
    this.closePopover();
    this.destroy();
  }
}
