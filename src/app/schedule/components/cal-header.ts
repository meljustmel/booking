import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'calendar-header',
  template: `
    <li class="list-item u-paddingTop30 u-paddingBottom35 u-flexCenter u-xs-flexWrap u-maxWith1000">
      <div class="u-flex0">
        <div class="buttonSwitch">
          <button mwlCalendarPreviousView
                  [view]="view"
                  [(viewDate)]="viewDate"
                  (viewDateChange)="viewDateChange.next(viewDate)"
                  class="button button--withChrome u-baseColor--buttonNormal travel">Previous
          </button>
          <button mwlCalendarToday
                  [(viewDate)]="viewDate"
                  (viewDateChange)="viewDateChange.next(viewDate)"
                  class="button button--withChrome u-baseColor--buttonNormal">Today
          </button>
          <button mwlCalendarNextView
                  [view]="view"
                  [(viewDate)]="viewDate"
                  (viewDateChange)="viewDateChange.next(viewDate)"
                  class="button button--withChrome u-baseColor--buttonNormal travel">Next
          </button>
        </div>
      </div>
      <div class="u-flex1 header u-textColorNormal u-paddingBottom5">{{ viewDate | date: 'yMMMMEEEEd' }}</div>
      <div class="u-flex0">
        <div class="buttonSwitch">
          <button (click)="viewChange.emit('month')"
                  [class.active]="view === 'month'"
                  class="button button--withChrome u-baseColor--buttonNormal">Month
          </button>
          <button (click)="viewChange.emit('week')"
                  [class.active]="view === 'week'"
                  class="button button--withChrome u-baseColor--buttonNormal">Week
          </button>
          <button (click)="viewChange.emit('day')"
                  [class.active]="view === 'day'"
                  class="button button--withChrome u-baseColor--buttonNormal">Day
          </button>
        </div>
      </div>
    </li>
  `,
  styles: [`
    * {
      box-sizing: border-box;
    }

    .u-flex0 {
      -ms-flex: 0 0 auto;
      flex: 0 0 auto;
    }

    .buttonSwitch {
      display: inline-block;
      position: relative;
      height: 40px;
      border: 1px solid rgba(0, 0, 0, .15);
      vertical-align: bottom;
      box-sizing: border-box;
      border-radius: 5px;
    }

    .list-item {
      list-style: none;
      border-top: 1px solid rgba(255, 255, 255, .2);
      padding: 40px 0 35px;
    }

    li {
      display: list-item;
      text-align: -webkit-match-parent;
    }

    .buttonSwitch .button {
      border: 0;
      height: 100%;
      width: auto;
      text-align: center;
      color: rgba(0, 0, 0, .44);
      padding: 0 16px;
      transition: none;
    }

    .buttonSwitch .button:first-child, .buttonSwitch .button:nth-child(2) {
      /*border-right: 1px solid rgba(0, 0, 0, .15);*/
    }

    .buttonSwitch .button:first-child {
      border-radius: 5px 0 0 5px;
    }

    .buttonSwitch .button:nth-child(2) {
      border-radius: 0;
    }

    .buttonSwitch .button:last-child {
      border-radius: 0 5px 5px 0;
      border-right: 0;
    }

    .active, .travel {
      opacity: 1;
      background: #F5E2EE;
      color: #384368 !important;
      border: 0;
      box-shadow: 0 0 0 1px #F5E2EE;
    }

    .header {
      text-align: center;
      margin: 0 auto;

    }

  `]
})
export class CalendarHeaderComponent {

  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

}
