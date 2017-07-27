import {Component} from "@angular/core";

@Component({
  selector: 'foot',
  template: `
    <footer class=" ">
      <div class="container u-maxWidth1040 u-textColorNormal u-baseColor--textNormal">
        <div class="left linkSet u-clearfix">
          <a class="button button--chromeless u-baseColor--buttonNormal u-marginLeft15 u-lineHeight35 u-xs-block u-xs-marginLeft0"
             routerLink="about"
             routerLinkActive="link--darker">About</a>
          <span class="middotDivider u-xs-hide"></span>
          <a class="button button--chromeless u-baseColor--buttonNormal u-marginLeft15 u-lineHeight35 u-xs-block u-xs-marginLeft0"
             routerLink="contact"
             routerLinkActive="link--darker">Contact</a>
          <!--<span class="middotDivider u-xs-hide"></span>-->
          <!--<a class="button button&#45;&#45;chromeless u-baseColor&#45;&#45;buttonNormal u-marginLeft15 u-lineHeight35 u-xs-block u-xs-marginLeft0" >Policy</a>-->
          <!--<span class="middotDivider u-xs-hide"></span>-->
          <!--<a class="button button&#45;&#45;chromeless u-baseColor&#45;&#45;buttonNormal u-marginLeft15 u-lineHeight35 u-xs-block u-xs-marginLeft0" >Terms</a>-->
        </div>
        <div class="right linkSet u-clearfix">
          
          
          <a target="_blank" href="https://www.instagram.com/thelovelyyou/" class="button button--chromeless u-baseColor--buttonNormal u-marginLeft15 u-lineHeight35 u-xs-block u-xs-marginLeft0"
          >Instagram</a>
          <span class="middotDivider u-xs-hide"></span>
          <a target="_blank" href="https://www.facebook.com/yulisa.guzman.96558" class="button button--chromeless u-baseColor--buttonNormal u-marginLeft15 u-lineHeight35 u-xs-block u-xs-marginLeft0"
          >Facebook</a>
        </div>
        <div class="middle">
          <logo [style.fill]="'#404040'" style="padding-left: 3em"></logo>
          <div class="copy_text">Copyright 2017 The Lovely You. <br />All Rights Reserved</div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      padding-top: 35px;
      padding-bottom: 65px;
      font-family: "GT-Walsheim", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    }
    .linkSet .button {
      font-family: "GT-Walsheim", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;

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
      margin-top: 0;
    }
    a {
      text-decoration: none;
    }
  `]
})
export class FootComponent {

}


