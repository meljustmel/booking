import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'secondary',
  template: `
    <div class="metabar-inner u-marginAuto u-maxWidth1000 js-metabarBottom">
      <nav class="metabar-block metabar-block--below u-overflowHiddenY u-height50 u-xs-height39">
        <ul class="u-borderTopLightest u-textAlignLeft u-noWrap u-overflowX u-paddingTop4 u-xs-paddingTop0 u-paddingBottom100 u-xs-paddingLeft20 u-xs-paddingRight20">
          <li class="metabar-navItem u-uiTextRegular u-fontSizeSmaller u-inlineBlock u-textColorNormal u-xs-paddingRight12 u-xs-marginRight0">
            <a class="link link--darken u-accentColor--textDarken u-baseColor--link"
               routerLink=""
               routerLinkActive="link--darker"
               [routerLinkActiveOptions]="{exact: true}">Home</a>
          </li>
          <li class="metabar-navItem u-uiTextRegular u-fontSizeSmaller u-inlineBlock u-textColorNormal u-xs-paddingRight12 u-xs-marginRight0">
            <a class="link  link--darken u-accentColor--textDarken u-baseColor--link"
               routerLink="booking"
               routerLinkActive="link--darker">Booking</a>
          </li>
          <li class="metabar-navItem u-uiTextRegular u-fontSizeSmaller u-inlineBlock u-textColorNormal u-xs-paddingRight12 u-xs-marginRight0">
            <a class="link link--darken u-accentColor--textDarken u-baseColor--link"
               routerLink="schedule"
               routerLinkActive="link--darker">Schedule</a>
          </li>
          <li class="metabar-navItem u-uiTextRegular u-fontSizeSmaller u-inlineBlock u-textColorNormal u-xs-paddingRight12 u-xs-marginRight0">
            <a class="link link--darken u-accentColor--textDarken u-baseColor--link"
               routerLink="reservations"
               routerLinkActive="link--darker">Reservations</a>
          </li>
          <li class="metabar-navItem u-uiTextRegular u-fontSizeSmaller u-inlineBlock u-textColorNormal u-xs-paddingRight12 u-xs-marginRight0">
            <a class="link link--darken u-accentColor--textDarken u-baseColor--link"
               routerLink="contact"
               routerLinkActive="link--darker">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: [``]
})
export class SecondaryComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
