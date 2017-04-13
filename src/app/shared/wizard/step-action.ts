import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'step-action',
  template: `
    <div class="content--center">
      <a (click)='action.emit(next)' class="button button--secondary">
        {{label}}</a>
    </div>
  `,
  styles: [`
   
    .button {
      cursor: pointer;
    }
    .content {
      /*display: inline-block !important;*/
      /*text-align: center;*/
      margin: 0 auto;
    }
    .content--center {
      display: inline-block;
      margin: 0 auto;

    }
  `]
})
export class StepActionComponent implements OnInit {
  @Output() action = new EventEmitter<any>();
  @Input() label;
  @Input() disabled;

  ngOnInit() {

  }
}
