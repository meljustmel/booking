import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'action',
  template: `
    <div class="content content--center">
      <p *ngIf="tag">{{tag}}</p>
      <a [ngClass]="{alternate:  type === 'alternate', action:  type === 'action', lovely: type === 'lovely'}"
         (click)='action.emit(next);' 
        class="button">{{ label || 'Book Now'}}</a>
    </div>
  `,
  styles: [`    
    .button {
      color: #384368;
      background: #FFF;
      border: 1px solid #384368;
      display: inline-block;
      padding: 0 25px;
      margin-bottom: 15px;
      height: 40px;
      line-height: 38px;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
      font-size: 14px;
      white-space: nowrap;
      text-decoration: none;
      cursor: pointer;
      border-radius: 20px;
      transition: .1s background-color,.1s border-color,.1s color,.1s fill;
    }
    .button:hover {
      background: #384368;
      color: #FFF;
    }
    .lovely {
      color: #fff;
      background: #F7CFD2;
      border-color: #F7CFD2;
    }
    .lovely:hover {
      background: #fff;
      color: #F7CFD2;
      border-color: #F7CFD2;
    }

    .action {
      color: #fff;
      background: #5FE6BE;
      border-color: #5FE6BE;
    }
    .action:hover {
      background: #fff;
      color: #5FE6BE;
      border-color: #5FE6BE;
    }
    
    * {
      box-sizing: border-box;
    }
  `]
})
export class ActionComponent implements OnInit {
  @Output() action = new EventEmitter<any>();
  @Input() label;
  @Input() tag;
  @Input() disabled;
  @Input() type;
  ngOnInit() {

  }
}
