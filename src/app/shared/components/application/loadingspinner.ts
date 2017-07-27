import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'loadingspinner',
  template: `
          <div class="cst-backdrop">
            <div class="loader">
            </div>
          </div>
  `,
  styles: [`
    .cst-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: black;
      opacity: 0.7;
      z-index: 99999;
    }
    .loader{
    top: 50%;
    }
  `]
})
export class LoadingSpinnerComponent implements OnInit {
  ngOnInit() {

  }
}
