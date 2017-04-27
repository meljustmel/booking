import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'confirm-form',
  template: `    
    <div class="root" style="padding-top: 1em">
      <h4 class="label">
        <span>Hello {{user?.displayName | first:' '}}! </span>
      </h4>
      <h3 class="">Does this look correct?</h3>
      <h1 class="title">
        <span class="data">{{data?.service}}</span> reservation <br>
            on <span class="data">{{data?.reservationDate | formatDate}}</span> <br>
          at <span class="data">{{data?.reservationTime | time}} ?</span>
      </h1>
      <div class="loader"></div>
    </div>
  `,
  styles: [`
    .section {
      overflow: hidden;
      padding: 55px 0;
      position: relative;
      height: 650px;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .section-content {
      margin-left: auto;
      margin-right: auto;
      width: 980px;
      font-weight: 300;
    }
    .content__headline {
      font-size: 28px;
    }
    h2 {
      color: #6F7387;
    }
    h3 {
      opacity: 0.7;
    }
    .section-models {
      padding-top: 52px;
    }
    .data {
      color: #AEEEE1;
    }
    
  `]
})
export class ConfirmFormComponent implements OnInit {
  @Output() action = new EventEmitter<any>();
  @Input() label;
  @Input() data;
  @Input() user;
  ngOnInit() {

  }
}
