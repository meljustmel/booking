import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'time',
  template: `
    <div class="help-categories__col">
      <a *ngIf="time.available" class="help-categories__item available" (click)='onSelect(time.hour)' >
        <div class="help-categories__item-inner">
          <div class="help-categories__item-logo">
            <img src="//p6.zdassets.com/hc/theme_assets/224203/200019615/202711228.svg" alt="">
          </div>
          <h2 class="help-categories__item-name">{{ time.hour | time }}</h2>
        </div>
      </a>
      <a *ngIf="!time.available" class="help-categories__item disabled" >
        <div class="help-categories__item-inner">
          <div class="help-categories__item-logo">
            <img src="assets/booked.svg" alt="">
          </div>
          <h2 class="help-categories__item-name">{{ time.hour | time }}</h2>
        </div>
      </a>
    </div>
    
    <!--<div class="container">-->
      <!--<div *ngIf="tag" class="content content&#45;&#45;center content&#45;&#45;wide">-->
        <!--<h1 class="content__headline">{{ tag }}</h1>-->
      <!--</div>-->
      <!--<div class="content&#45;&#45;center">-->
        <!--<a (click)='hour.emit(next)' class="button button&#45;&#45;secondary">-->
          <!--{{label}}</a>-->
      <!--</div>-->
    <!--</div>-->
  `,
  styleUrls: ['time.scss']
})
export class TimeComponent implements OnInit {
  @Output() hour = new EventEmitter<any>();
  @Input() time;
  // @Input() tag;
  // @Input() disabled;
  checkedOption;
  ngOnInit() {

  }

  onSelect(hour) {
    console.log(hour);
      this.hour.emit(hour);
  }
}
