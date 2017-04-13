import {Component, HostBinding, OnInit} from "@angular/core";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

import {routeFadeStateTrigger} from "../app.animations";

@Component({
  selector: 'contact',
  template: `
    <hero [background]="'assets/hero.png'">
    </hero>
    
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
export class ContactComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = false;

  constructor(private slimLoadingBarService: SlimLoadingBarService) {
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.slimLoadingBarService.complete();
  }
}
