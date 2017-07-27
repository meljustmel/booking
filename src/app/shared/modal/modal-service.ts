import {Modal} from "./modal";
import {ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild} from "@angular/core";

@Component({
  selector: "service-modal",
  styleUrls: ['modal-service.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overlay overlay--dark" (click)="onClickedExit($event)">
      <div #modal class="overlay-dialog overlay-dialog--signin overlay-dialog--animate js-overlayDialog" tabindex="-1">
        <section class="u-maxWidth1000 u-marginAuto u-relative u-borderBox u-boxShadowThick js-subscriptionsForm">
          <div class="bg-gradient-blend u-sm-minHeight150 u-flex u-xs-flexWrap" style="min-height: 470px; text-align: left">
            <button (click)="onCloseClick()" class="button button--circle button--chromeless u-baseColor--buttonNormal button--withIcon button--withSvgIcon promo-dismissButton is-touched" title="Dismiss" aria-label="Dismiss">
            <span class="svgIcon svgIcon--removeThin svgIcon--29px">
              <svg class="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                <path d="M20.13 8.11l-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61" fill-rule="evenodd"></path>
              </svg>
            </span>
            </button>
            <div class="u-flex1 u-sizeHalfWidth u-borderBox u-padding40 u-xs-padding20 u-xs-marginBottom20 u-xs-sizeFullWidth">
              <h3 class="u-contentSerifBold u-lineHeightTight  u-paddingTop20 u-paddingBottom20 u-marginBottom30 u-xs-fontSize24 u-fontSize40">
                <span class="data" style="color: #353E4E; font-size: 50px">{{service.title}}</span>
              </h3>
              <!--<p style="padding-bottom: 1em" class="u-margin0 u-letterSpacingNormal">Does this look correct?</p>-->
              <img [src]="service.img" style="width: 120px; height: 120px; opacity: .5; position: absolute; bottom: 2em">
            </div>
            <div class="u-relative u-flex1 u-sizeHalfWidth u-minHeight250 u-xs-minHeight100 u-xs-sizeFullWidth js-paymentForm">
              <div class="u-flexColumn u-sizeFullHeight u-backgroundWhite u-borderBox u-paddingLeft30 u-paddingRight30 u-paddingTop40 u-paddingBottom40 u-xs-padding20">
                <div class="u-flex1">
                  <p class="u-marginBottom40 u-xs-marginBottom20" style="font-size: 22px">Things to consider.</p>
                  <div class="">
                    <p>{{service.description}}</p>

                  </div>
                  <div class="">
                    <p>{{service.question}}</p>
                    <p style="font-size: 16px; color: #666;">{{service.answer}}</p>

                  </div>
                  
                  <div class="u-marginTop20 u-height20">
                    <div class="creditCardForm creditCardForm--error u-marginBottom0 u-marginTop0 js-creditCardError"></div>
                  </div>
                </div>
                
                <div class="u-marginTop20">
                  <button type="button" class="button button--large button--withChrome" (click)="onGoToBooking($event)">Book Reservation</button>
                  <!--<p style="text-align: left;" class="u-textColorNormal u-fontSize14 u-marginTop40 u-marginBottom0">By clicking "Start membership", you agree to our <a class="link link&#45;&#45;underline u-baseColor&#45;&#45;link" href="#" target="_blank">Subscription Terms of Service</a> and <a class="link link&#45;&#45;underline u-baseColor&#45;&#45;link" href="#" target="_blank">Privacy Policy</a>. The Lovely You will charge the membership ($5) to your payment method monthly until you cancel. There are no refunds or credits for partial months.</p>-->
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `
})
@Modal()
export class ServiceModalComponent {
  @Input() service;
  ok: Function;
  destroy: Function;
  closeModal: Function;
  goToBooking: Function;
  @ViewChild('modal') modal: ElementRef;

  onCloseClick(): void {
    this.closeModal();
    this.destroy();
  }

  onClickedExit(event): void {
    if (event.path.indexOf(this.modal.nativeElement) === -1) {
      this.closeModal();
      this.destroy();
    }
  }
  onGoToBooking(event): void {
    this.goToBooking(event);
    this.closeModal();
    this.destroy();
  }
}
