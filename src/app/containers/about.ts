import {Component, HostBinding, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {routeFadeStateTrigger} from "../app.animations";


@Component({
  selector: 'about',
  template: `
    <!--<hero [background]="'assets/hero.png'">-->
    <!--</hero>-->
    <div class="spacer" style="padding-top: 6em"></div>
    <div class="segment">
      <div class="container">
        <div class="network">
          <div class="network__intro">
            <div class="content content--center">
              <h1 class="content__headline">A network of thought</h1>
              <h2 class="content__subline">Content that matters</h2>
            </div>
          </div>
          <div class="network__text">
            <p class="network__p">“Medium is a vibrant network of thinkers who care about the world and making
              it better —  through their craft, their stories, and their ideas. More than a network of
              thinkers, though, Medium is a network of thought. Connecting people together increases their
              knowledge and capabilities. Connecting ideas together increases their value, as well.</p>
            <p class="network__p">Medium is not for everybody, but it’s open to everybody. It encourages
              participation and a diversity of opinion. Anyone can earn influence on Medium via the value of
              their ideas, thoughtfulness of their responses, or quality of their rhetoric.”</p>
          </div>
          <div class="network__profile">
            <img alt="" class="network__avatar" src="/assets/founder.png"> 
            <span class="network__username">
              <a href="#">Yulisa Guzman,</a> Founder of Lovely You</span>
          </div>
        </div>
      </div>
    </div>
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
