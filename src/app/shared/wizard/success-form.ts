import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'success-form',
  template: `
    <div class="root" style="padding-top: 6em">
      <h4 class="label">
        <span>Thank You {{user?.displayName | first:' '}}!</span>
      </h4>
      <h1 class="title">
        your
        <span class="data">{{data?.service}}</span> reservation <br>
        on <span class="data">{{data?.reservationDate | formatDate}}</span> <br>
        at <span class="data">{{data?.reservationTime | time}} is Confirmed!</span>
      </h1>
      <div class="loader"></div>
      
    </div>
    <div class="action">
      <a (click)='action.emit(next)' class="button" routerLink="/">Home</a>
    </div>
  `,
  styles: [`
    .action {
      margin: 0 auto;
      width: 100%;
    }
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

    /*html {*/
      /*font-size: 10px;*/
      /*padding:0;*/
      /*margin:0;*/
    /*}*/
    

  `]
})
export class SuccessFormComponent implements OnInit {
  @Output() action = new EventEmitter<any>();
  @Input() label;
  @Input() data;
  @Input() user;
  ngOnInit() {

  }
}
