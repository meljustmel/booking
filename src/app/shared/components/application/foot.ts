import {Component} from "@angular/core";

@Component({
  selector: 'foot',
  template: `
    <footer class=" u-borderTopLighter">
      <div class="container u-maxWidth1040 u-textColorNormal u-baseColor--textNormal">
        <div class="left linkSet u-clearfix">
          <a class="button button--chromeless u-baseColor--buttonNormal u-marginLeft15 u-lineHeight35 u-xs-block u-xs-marginLeft0"
             routerLink="about"
             routerLinkActive="link--darker">About</a>
          <span class="middotDivider u-xs-hide"></span>
          <a class="button button--chromeless u-baseColor--buttonNormal u-marginLeft15 u-lineHeight35 u-xs-block u-xs-marginLeft0" >Policy</a>
          <span class="middotDivider u-xs-hide"></span>
          <a class="button button--chromeless u-baseColor--buttonNormal u-marginLeft15 u-lineHeight35 u-xs-block u-xs-marginLeft0" >Terms</a>
        </div>
        <div class="right linkSet u-clearfix">
          <a class="button button--chromeless u-baseColor--buttonNormal u-marginLeft15 u-lineHeight35 u-xs-block u-xs-marginLeft0"
             routerLink="contact"
             routerLinkActive="link--darker">Contact</a>
          <span class="middotDivider u-xs-hide"></span>
          <a class="button button--chromeless u-baseColor--buttonNormal u-marginLeft15 u-lineHeight35 u-xs-block u-xs-marginLeft0"
          >Instagram</a>
          <span class="middotDivider u-xs-hide"></span>
          <a class="button button--chromeless u-baseColor--buttonNormal u-marginLeft15 u-lineHeight35 u-xs-block u-xs-marginLeft0"
          >Facebook</a>
        </div>
        <div class="middle">
          <!--<logo [style.fill]="'#404040'"></logo>-->
          <div class="copy_text">Copyright 2017 The Lovely You. <br />All Rights Reserved</div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      padding-top: 35px;
      padding-bottom: 65px;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .middle {
      max-width: 370px;
      margin: 0 auto;
      text-align: center;
    }
    .copy {
      font-size: 22px;
    }
    .copy_text {
      font-size: 13px;
      line-height: 24px;
      color: #3a3d4b;
      opacity: 0.5;
      margin-top: 18px;
    }
  `]
})
export class FootComponent {

}


