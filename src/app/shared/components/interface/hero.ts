import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'hero',
  template: `
    <div class="help-hero"
      [ngClass]="{jumbotron:  type === 'jumbotron'}"
      [ngStyle]="{'background-image': 'url(' + background + ')'}">
      <div class="help-hero__container">
        <div class="help-hero__content">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .help-hero {
      background-size: cover;
      display: flex;
      height: 450px;
      align-items: flex-end;
      justify-content: center;
    }
    .help-hero__content, help-hero__container {
      padding: 0;
      z-index: 2;
      position: relative;
    }

    .jumbotron {
      align-items: center;
      height: 100vh;
      max-height: 700px;
      background:no-repeat 50% 50%;
      background-size: cover;
      text-align: center;
    }

  `]
})
export class HeroComponent implements OnInit {
  @Input() background;
  @Input() type;

  ngOnInit() {
    console.log(this.type);
  }
}

