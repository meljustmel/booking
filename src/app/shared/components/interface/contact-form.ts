import {Component, Input, OnInit, Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {FormGroup} from "@angular/forms";
import { UserService } from "../../../core/service/user";
import swal from 'sweetalert2';
import { Router } from '@angular/router'

@Component({
  selector: 'contact-form',
  template: `
    <div class="u-marginAuto u-marginTop60 u-xs-marginTop30 u-marginBottom60">
      <section class="u-maxWidth1000 u-marginAuto u-relative u-borderBox u-boxShadowThick">
        <div class="u-backgroundGrey u-sm-minHeight150 u-flex u-xs-flexWrap" style="min-height: 470px; background-image: url(assets/hands.jpg);
    background-size: cover;">
          <div class="u-flex1 u-sizeHalfWidth u-borderBox u-padding40 u-xs-padding20 u-xs-marginBottom20 u-xs-sizeFullWidth">
            <h3 class="u-contentSerifBold u-lineHeightTight u-textColorWhite u-borderTopGreen u-borderBottomGreen u-paddingTop20 u-paddingBottom20 u-marginBottom30 u-xs-fontSize24 u-fontSize40">
              <span class="data">Have any questions, not answered here?</span>
            </h3>
            <p class="u-margin0 u-contentSansBold u-paddingTop20 u-letterSpacingNormal u-textColorTransparentWhiteDarker">Address</p>
            <p class="u-margin0 u-contentSansRegular u-letterSpacingNormal u-textColorTransparentWhiteDarker">Level 1 262 Main Street</p>
            <p class="u-margin0 u-contentSansRegular u-letterSpacingNormal u-textColorTransparentWhiteDarker">Morning VIC 3931</p>
            <p class="u-margin0 u-contentSansBold u-paddingTop20 u-letterSpacingNormal u-textColorTransparentWhiteDarker">Enquires</p>
            <p class="u-margin0 u-contentSansRegular u-letterSpacingNormal u-textColorTransparentWhiteDarker">hello@thelovelyyou.com</p>
            <p class="u-margin0 u-contentSansBold u-paddingTop20 u-letterSpacingNormal u-textColorTransparentWhiteDarker">Phone</p>
            <p class="u-margin0 u-contentSansRegular u-letterSpacingNormal u-textColorTransparentWhiteDarker">(987) 456 7984</p>

          </div>
          <div class="u-relative u-flex1 u-sizeHalfWidth u-minHeight250 u-xs-minHeight100 u-xs-sizeFullWidth">
            <div class="u-flexColumn u-sizeFullHeight u-backgroundWhite u-borderBox u-paddingLeft30 u-paddingRight30 u-paddingTop40 u-paddingBottom40 u-xs-padding20">
              <div class="u-flex1">
                <p class="u-fontSize18 u-contentSansRegular u-marginBottom40 u-xs-marginBottom20">Let me know how we can help.</p>
                <div class="creditCardForm creditCardForm--saved"></div>
                <form [formGroup]="parent"  class="u-sizeFullWidth creditCardForm creditCardForm--input">
                  <fieldset class="u-marginBottom15">
                    <label class="creditCardForm-heading u-block">Name</label>
                    <div class="u-relative">
                      <input formControlName="fullName" autocomplete="name" class="textInput u-padding0 textInput--transparent textInput--underlined u-sizeFullWidth creditCardForm-number" type="text">
                    </div>
                    <label class="creditCardForm-heading u-block">Email</label>
                    <div class="u-relative">
                      <input formControlName="email" autocomplete="email" class="textInput u-padding0 textInput--transparent textInput--underlined u-sizeFullWidth creditCardForm-number" type="text">
                    </div>
                    <label class="creditCardForm-heading u-block">Message</label>
                    <div class="u-relative">
                      <input formControlName="message" class="textInput u-padding0 textInput--transparent textInput--underlined u-sizeFullWidth creditCardForm-number" type="text">
                    </div>
                  </fieldset>
                </form>
                <div class="u-marginTop20 u-height20">
                  <div class="creditCardForm creditCardForm--error u-marginBottom0 u-marginTop0"></div>
                </div>
              </div>
              <div class="u-marginTop20">
                <button class="button button--large button--withChrome" (click)="submitForm($event)" type="button" [disabled]="!parent.valid" [ngClass]="{'valid' : parent.valid, 'invalid' : !parent.valid}">Send Message</button>

                <!--<p class="u-textColorNormal u-fontSize14 u-marginTop40 u-marginBottom0">By clicking "Start membership", you agree to our-->
                  <!--<a class="link link&#45;&#45;underline u-baseColor&#45;&#45;link" href="#">Subscription Terms of Service</a> and-->
                  <!--<a class="link link&#45;&#45;underline u-baseColor&#45;&#45;link" href="#" target="_blank">Privacy Policy</a>.-->
                  <!--The Lovely You will charge the membership ($5) to your payment method monthly until you cancel. There are no refunds or credits for partial months.</p>-->
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['contact-form.scss']
})
export class ContactFormComponent implements OnInit {
  @Input() parent: FormGroup;
  @Output() form = new EventEmitter;


  constructor(private userService: UserService, private _router: Router) {
  }

  ngOnInit() {

  }
  submitForm(message) {
    this.form.next(message);
  }
}

