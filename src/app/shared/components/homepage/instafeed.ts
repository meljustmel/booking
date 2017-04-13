import {Component, Input} from "@angular/core";
@Component({
  selector: 'instafeed',
  template: `
    <section class="section-promos row promo-count-4">
      <ul>
        <li class="promo-position">
          <a class="promo" href="#"
             [style.background-image]="'url(./assets/girl.jpg)'">
          </a>
        </li>
        <li class="promo-position">
          <a class="promo" href="#"
             [style.background-image]="'url(./assets/girl.jpg)'">
          </a>
        </li>
        <li class="promo-position">
          <a class="promo" href="#"
             [style.background-image]="'url(./assets/girl.jpg)'">
          </a>
        </li>
        <li class="promo-position">
          <a class="promo" href="#"
             [style.background-image]="'url(./assets/girl.jpg)'">
          </a>
        </li>
      </ul>
    </section>
  `,
  styles: [`
    .section-promos {
      max-width: 2560px;
      margin: 0 auto;
      border-bottom: 2px solid #fff;
      width: 100%;
    }

    .row {
      position: relative;
      z-index: 1;
    }

    .row:before, .row:after {
      content: ' ';
      display: table;
    }

    .section-promos ul, .section-promos .promo-position, .section-promos .promo {
      display: block;
      min-height: 200px;
      box-sizing: border-box;
      position: relative;
      margin: 0;
      list-style: none;
    }

    .section-promos.promo-count-4 .promo-position {
      width: 25%;

    }

    .section-promos .promo-position {
      float: left;
      width: 100%;
    }

    .section-promos ul, .section-promos .promo-position, .section-promos .promo {
      display: block;
      min-height: 200px;
      box-sizing: border-box;
      position: relative;
      margin: 0;
      list-style: none;
    }

    .section-promos .promo {
      border-top: 2px solid #fff;
      border-right: 2px solid #fff;
      outline-offset: -3px;
    }

    .section-promos ul, .section-promos .promo-position, .section-promos .promo {
      display: block;
      min-height: 200px;
      box-sizing: border-box;
      position: relative;
      margin: 0;
      list-style: none;
    }

    a:link, a:visited {
      text-decoration: none;
    }

    .promo {
      background-size: cover;
      background-repeat: no-repeat;
      height: 250px;
      background-position: center;
    }
    

  `]
})
export class InstafeedComponent {
  @Input() background;

}

