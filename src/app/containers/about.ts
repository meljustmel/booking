import {Component, HostBinding, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {routeFadeStateTrigger} from "../app.animations";


@Component({
  selector: 'about',
  template: `
    <hero [background]="'assets/hands.jpg'">
    </hero>
    <div class="spacer" style="padding-top: 3em"></div>
    <div class="segment">
      <div class="container">
        <div class="network">
          <div class="network__intro">
            <div class="content content--center">
              <h1 class="content__headline">I want to help you be <i>lovely</i></h1>
              <h2 class="content__subline">A Little About Me</h2>
            </div>
          </div>
          <div class="network__text">
            <p class="network__p">“Hi! I'm Yulisa, Among other things I'm a brow artist and I love it! I love to help people bring out the best in them, specially helping them beging their journey to beautiful brows!".</p>
            
          </div>
          <div class="network__profile">
            <img alt="" class="network__avatar" src="/assets/founder.png"> 
            <span class="network__username">
              <a href="#">Yulisa Guzman,</a> Founder of Lovely You</span>
          </div>
        </div>
      </div>
    </div>
    <segment [type]="'action'"
             [title]="'Save your spot now!'"
             [subtitle]="'Great stories deserve a great audience'">
      <action [type]="'lovely'" [label]="'Book Now'" (action)='onAction()'></action>
    </segment>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  animations: [
    routeFadeStateTrigger
  ]
})
export class AboutComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;
  constructor(private slimLoadingBarService: SlimLoadingBarService) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.slimLoadingBarService.complete();
  }
}
