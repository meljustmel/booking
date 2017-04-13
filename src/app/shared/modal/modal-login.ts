import {Modal} from "./modal";
import {ChangeDetectionStrategy, Component} from "@angular/core";

const template = `
<div class="overlay overlay--dark"(click)="onClickedExit()">
  <button class="PostActionButton" (click)="onClickedExit()">
    <span class="PostActionButtonLabel"></span>
    <svg class="CancelIcon SVGIcon" width="20" height="20">
      <g>
        <line x1="6" x2="14" y1="6" y2="14"></line>
        <line x1="14" x2="6" y1="6" y2="14"></line>
      </g>
    </svg>
  </button>
  <div class="overlay-dialog overlay-dialog--signin overlay-dialog--animate js-overlayDialog" tabindex="-1">
    <div class="wordmarkSet">
      <h3 class="overlay-title">
        <span class="svgIcon svgIcon--logoNew svgIcon--85px">
        <svg class="svgIcon-use" data-multipart="true" height="85" viewbox="3 -2 85 85" width="85">
				<path
          d="M57.356 15.733c-.93-.45-1.69.004-1.69 1.01v39.963l16.955 8.2c1.87.918 3.38.28 3.38-1.395V25.03c0-.16-.09-.3-.24-.38l-18.4-8.89v-.027z"></path>
				<path
          d="M35.333 46.872l19.343-30.4c.547-.857 1.75-1.196 2.676-.757l18.426 8.912c.118.06.16.2.092.3L55.665 56.71l-20.332-9.834v-.004z"></path>
				<path
          d="M17.814 16.275c-1.547-.748-2.072-.19-1.165 1.236l18.68 29.37 20.33 9.84-20.28-31.89a.426.426 0 0 0-.12-.11l-17.45-8.44z"></path>
				<path
          d="M35.333 63.495c0 1.675-1.266 2.432-2.814 1.683L16.68 57.52c-.92-.444-1.68-1.633-1.68-2.64V17.35c0-1.34 1.013-1.946 2.253-1.346l17.97 8.693c.068.03.11.095.11.166v38.633z"></path></svg></span><br>
        <span class="svgIcon svgIcon--logoWordmarkNew svgIcon--151x65px">
          <svg class="svgIcon-use" height="65" viewbox="36 8 151 65" width="200">
				<path
          d="M83.967 35.705c-5.17 0-9.173 3.356-9.173 9.262 0 6.754 4.657 9.504 9.3 9.504 2.713 0 5.256-.72 7.434-2.3.21-.16.248-.28.13-.52l-1.088-2.03c-.122-.24-.283-.24-.486-.12-2.02 1.18-3.678 1.7-5.656 1.7-2.387 0-5.215-1.17-5.58-5.06 0-.03 0-.12.12-.12h13.094c.404 0 .365-.68.365-1.29 0-6.51-4-9.01-8.447-9.01h-.013zm4.204 7.36h-9.05c-.16 0-.12-.16-.12-.202.41-2.386 2.22-3.964 4.89-3.964 2.67 0 4.41 1.85 4.41 4.03 0 .08-.04.11-.12.11v.01zM65.96 29.668a.608.608 0 0 0-.572.323L58.23 43.45c-.045.08-.086.08-.125 0l-7.16-13.455a.61.61 0 0 0-.572-.322h-4.908c-.205 0-.327.12-.327.324L45.136 53.9c0 .203.123.325.328.325H48.9c.204 0 .326-.122.326-.325V38.822c0-1.742-.04-3.363-.08-4.173 0-.09.12-.13.162 0 .41 1.05 1.064 2.39 1.72 3.6l5.93 10.94c.122.2.245.28.49.28h1.432c.245 0 .37-.08.49-.29l5.93-10.94c.656-1.22 1.31-2.56 1.72-3.61.04-.13.164-.09.164 0-.04.81-.08 2.43-.08 4.17v15.08c0 .2.122.32.327.32h3.44c.21 0 .33-.12.33-.33v-23.9c0-.2-.12-.32-.32-.32h-4.91zm109.826 9.11c-1.13-2.142-3.312-3.07-5.98-3.07-2.425 0-4.646.847-6.383 2.546-1.294-1.7-3.193-2.55-5.497-2.55-2.183 0-3.92.568-5.578 1.78l-2.787-1.414c-.48-.244-.81 0-.81.443v17.35c0 .204.13.326.33.326h3.4c.21 0 .33-.13.33-.33V42.7c0-1.05.08-1.536.61-2.103.89-.97 2.23-1.495 3.6-1.495 2.27 0 3.68 1.294 3.68 3.68v11.082c0 .203.13.325.33.325h3.4c.2 0 .32-.13.32-.33V42.7c0-1.05.08-1.536.61-2.103.89-.97 2.22-1.495 3.6-1.495 1.5 0 2.63.566 3.24 1.66.28.564.44 1.294.44 2.304v10.798c0 .203.12.325.32.325h3.4c.2 0 .32-.13.32-.33V43.18c0-2.062-.32-3.358-.85-4.41zM113.19 28.303h-3.396c-.2 0-.322.123-.322.327v7.964c0 .122-.04.162-.16.122-1.526-.647-2.987-1.01-4.683-1.01-5.13 0-8.98 3.397-8.98 9.22 0 6.56 4.04 9.554 8.65 9.554 2.19 0 3.88-.562 5.62-1.777l2.79 1.418c.48.25.81 0 .81-.44V28.64c0-.203-.12-.327-.33-.327l-.01-.007zm-3.72 19.172c0 1.01-.04 1.456-.726 2.104-1.29 1.21-2.667 1.53-3.92 1.53-2.302 0-5.09-1.38-5.09-6.15 0-3.88 2.18-5.91 5.09-5.91 1.456 0 2.71.32 3.8 1.25.77.65.847 1.21.847 2.58v4.57zm34.067-11.527h-3.394c-.196 0-.314.122-.314.324v11.204c0 1.01-.04 1.456-.69 2.104-1.29 1.213-2.71 1.536-4.16 1.536-1.74 0-2.95-.647-3.52-1.82-.25-.525-.37-1.215-.37-2.264V36.27c0-.2-.12-.323-.32-.323h-3.4c-.2 0-.33.122-.33.324V47.2c0 1.7.24 2.83.68 3.76 1.09 2.387 3.47 3.52 6.66 3.52 2.35 0 4.12-.567 5.9-1.78l2.75 1.416c.49.24.81 0 .81-.445v-17.4c0-.2-.12-.32-.32-.32h-.01zm-23.116-7.723c-1.33 0-2.38 1.01-2.38 2.263 0 1.255 1.05 2.265 2.39 2.265s2.39-1.01 2.39-2.265c0-1.255-1.04-2.265-2.38-2.265v.002zm1.7 7.723h-3.39c-.2 0-.32.122-.32.324v17.594c0 .203.12.325.33.325h3.4c.21 0 .33-.12.33-.32v-17.6c0-.2-.12-.32-.32-.32z"></path></svg></span>
      </h3>
    </div>
    <div class="overlay-content">
      Sign in to Medium to connect with voices and perspectives that matter. {{ message }}
    </div>
    <div class="overlay-actions buttonSet">
      <div class="buttonSet buttonSet--vertical">
        <button (click)="signInWithProvider('Facebook')"
                class="button button--withChrome u-baseColor--buttonNormal button--withIcon button--withSvgIcon button--withIconAndLabel button button--signin button--continue button--facebook"
                title="Connect with Facebook">
                    <span class="svgIcon svgIcon--facebookFilled svgIcon--25px">
                        <svg class="svgIcon-use" height="25" viewbox="0 0 25 25" width="25">
			                <path
                        d="M21 12.646C21 7.65 16.97 3.6 12 3.6s-9 4.05-9 9.046a9.026 9.026 0 0 0 7.59 8.924v-6.376H8.395V12.64h2.193v-1.88c0-2.186 1.328-3.375 3.267-3.375.93 0 1.728.07 1.96.1V9.77H14.47c-1.055 0-1.26.503-1.26 1.242v1.63h2.517l-.33 2.554H13.21V21.6c4.398-.597 7.79-4.373 7.79-8.954">

                            </path>
                        </svg>
                    </span>
          <div class="button-labelSet">
                            <span class="button-label button-label--multiLine js-buttonLabel">Continue with Facebook
                            </span>
            <span class="button-label button-label--subText button-label--multiLine js-buttonLabelSubtext">
                            <span class="u-fontSizeSmallest u-textColorTransparentWhiteDark">We won’t post without asking
                            </span>
                        </span>
          </div>
        </button>
        <button (click)="signInWithProvider('Google')"
                class="button button--withChrome u-baseColor--buttonNormal button--withIcon button--withSvgIcon button--withIconAndLabel button button--signin button--continue button--google"
                title="Connect with Google">
                    <span class="svgIcon svgIcon--googleNew svgIcon--25px">
                        <svg class="svgIcon-use" height="25" viewbox="0 0 25 25" width="25">
                                <g fill="none" fill-rule="evenodd">
                                    <path
                                      d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                                      fill="#4285F4"></path>
                                    <path
                                      d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                                      fill="#34A853"></path>
                                    <path
                                      d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                                      fill="#FBBC05"></path>
                                    <path
                                      d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                                      fill="#EA4335"></path>
                                </g>
                        </svg>
                    </span>
          <span class="button-label js-buttonLabel">Continue with Google</span>
        </button>
      </div>
      <div class="signinPrivacyMessages u-marginTop40 u-fontSizeSmaller u-textColorNormal u-lineHeightBase">
        <!--<div>-->
        <!--To use Medium you must have cookies enabled.-->
        <!--</div>-->
        <div>
          Dramatically architect resource sucking materials before ubiquitous mindshare. Monotonectally enable
          intermandated.. Also, we’ll never post to Google or Facebook without your permission. For more info, please
          see
          <a class="link u-baseColor--link">Login FAQ</a>.
        </div>
      </div>
    </div>
  </div>
</div>
`;
@Component({
  selector: "login-modal",
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template
})
@Modal()
export class LoginModalComponent {
  ok: Function;
  destroy: Function;
  closeModal: Function;
  signIn: Function;
  snacks = ["testing test", "mars", "snickers"];

  onClickedExit(): void {
    this.closeModal();
    this.destroy();
  }

  signInWithProvider(provider): void {
    this.signIn(provider)
  }

  onOk(): void {
    this.closeModal();
    this.destroy();
    this.ok(this.snacks);
  }
}
