import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'hero-text',
  template: `
    <div class="jumbotron--text">
      <div class="jumbotron--inner">
        <h1 class="">{{heading}}</h1>
        <h2 class="">{{subheading}}</h2>
      </div>
    </div>
  `,
  styles: [`
    .jumbotron--text {
      display: flex;
      flex-direction: column;
      align-content: center;
      vertical-align: middle;
      margin:0 auto;
      color: #FFFFFF;
      width: 960px;
    }
    .jumbotron--inner {
      padding-top: 2em;
    }
    h1 {
      font-size: 2.8em;
      margin: 1.5em auto;
    }
    h2 {
      font-size: 1.5em;
      font-weight: bolder;
      /*opacity: .8;*/
    }
  `]
})
export class HeroTextComponent implements OnInit {
  @Input() heading;
  @Input() subheading;

  ngOnInit() {

  }
}

