import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  LOCALE_ID,
  Inject,
  OnChanges,
  OnInit,
  forwardRef,
  OnDestroy
} from "@angular/core";
import { CalendarEvent, WeekDay, MonthView, getWeekViewHeader, getMonthView, MonthViewDay } from "calendar-utils";
import { isSameDay } from "date-fns";
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import {FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import * as moment from 'moment'


const DATE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DayFormComponent),
  multi: true
};

@Component({
  selector: 'day-form',
  template: `
    <section class="estimate-project__questions-section" [formGroup]="parent">
      <div class="container">

        <div class="row estimate-project__question-row">
          <div class="col-md-3 center-block">
            <div class="estimate-project__question-container">
              <p class="estimate-project__question">
                <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_text">When would you like to come in?</span>
              </p>
              <div class="estimate-project__question-number">
                2<span class="estimate-project__question-number-of">/4</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row estimate-project__question-row">

          <div class="col-sm-4 col-md-4 center-block"

               *ngFor="let day of days; let i = index"
          >
            <div [ngClass]="{active: currentSelected && day.getTime() == currentSelected.getTime(), disabled: dayModifier(day)}"
                 (click)="$event.stopPropagation(); dayClick(day)"
                 class="estimate-project__checkbox"
                 (click)="checkedOption = i"
                 [ngClass]="{active: checkedOption === i}"
            >
              <div class="estimate-project__checkbox__icon">
            <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_image">
              <div class="ActionBlock__container___3YbY1" >
              <svg viewBox="-22 -22 96 96" class="ActionBlock__icon" [ngClass]="{disabled: dayModifier(day)}" >
                <path d="M50.35,4.55714286 L38.8147059,4.55714286 L38.8147059,1.41428571 C38.8147059,0.785714286 38.3470588,0.157142857 37.7235294,0.157142857 C37.1,0.157142857 36.4764706,0.628571429 36.4764706,1.25714286 L36.4764706,4.55714286 L15.1205882,4.55714286 L15.1205882,1.41428571 C15.1205882,0.785714286 14.6529412,0.157142857 14.0294118,0.157142857 C13.4058824,0.157142857 12.7823529,0.628571429 12.7823529,1.25714286 L12.7823529,4.55714286 L1.24705882,4.55714286 C0.623529412,4.55714286 5.68434189e-14,5.02857143 5.68434189e-14,5.81428571 L5.68434189e-14,53.7428571 C5.68434189e-14,54.3714286 0.467647059,55 1.24705882,55 L50.35,55 C50.9735294,55 51.5970588,54.5285714 51.5970588,53.7428571 L51.5970588,5.81428571 C51.5970588,5.18571429 50.9735294,4.55714286 50.35,4.55714286 L50.35,4.55714286 Z M12.7823529,7.07142857 L12.7823529,12.1 C12.7823529,12.7285714 13.4058824,13.2 14.0294118,13.2 C14.6529412,13.2 15.1205882,12.7285714 15.1205882,12.1 L15.1205882,7.07142857 L36.4764706,7.07142857 L36.4764706,12.1 C36.4764706,12.7285714 37.1,13.2 37.7235294,13.2 C38.3470588,13.2 38.8147059,12.7285714 38.8147059,12.1 L38.8147059,7.07142857 L49.1029412,7.07142857 L49.1029412,19.1714286 L2.33823529,19.1714286 L2.33823529,7.07142857 L12.7823529,7.07142857 Z M2.49411765,52.4857143 L2.49411765,21.5285714 L49.2588235,21.5285714 L49.2588235,52.4857143 L2.49411765,52.4857143 Z" id="Shape"></path>
                <path d="M36.6323529,27.8142857 L21.9794118,42.5857143 L15.5882353,36.1428571 C15.1205882,35.6714286 14.3411765,35.6714286 13.8735294,36.1428571 C13.4058824,36.6142857 13.4058824,37.2428571 13.8735294,37.7142857 L21.0441176,44.9428571 C21.5117647,45.4142857 22.2911765,45.4142857 22.7588235,44.9428571 L38.3470588,29.2285714 C38.8147059,28.7571429 38.8147059,27.9714286 38.3470588,27.5 C37.8794118,27.3428571 37.1,27.3428571 36.6323529,27.8142857 L36.6323529,27.8142857 Z"></path>
              </svg>
            </div>

            </span>
              </div>
              <div class="estimate-project__checkbox__text">
                <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_text">{{formattedDate(day,'ddd')}}</span>
                <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_text">{{formattedDate(day,'D')}}</span>
                <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_text">{{formattedDate(day,'MMM')}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="buttonSet clearfix" style="padding: 20px 0">
          <button (click)="gotoPrev()" [ngClass]="{disabled: dayShowIndex < 5}"
                  style="float: left"
                  class="button button--withChrome u-baseColor--buttonNormal">Prev 5 Days</button>
          <button (click)="gotoNext()" [ngClass]="{disabled: dayShowIndex >= 15}"
                  style="float: right"
                  class="button button--withChrome u-baseColor--buttonNormal">Next 5 Days</button>
        </div>
      </div>
    </section>
  `,
  // templateUrl: 'day-form.html',
  styleUrls: ['day-form.scss'],
  providers: [DATE_VALUE_ACCESSOR]
})
export class DayFormComponent implements OnChanges, OnInit, OnDestroy {

  @Input() parent: FormGroup;
  /**
   * The current view date
   */
  @Input() viewDate: Date;
  /**
   * A function that will be called before each cell is rendered. The first argument will contain the calendar cell.
   * If you add the `cssClass` property to the cell it will add that class to the cell in the template
   */
  @Input() dayModifier: Function;
  /**
   * Called when the day cell is clicked
   */
  @Output() dayClicked: EventEmitter<{day: Date}> = new EventEmitter<{day: Date}>();


  openRowIndex: number;

  todayDate: Date;
  days: Date[];
  dayShowIndex = 0; // 0 ~ 15
  currentSelected: Date;

  value;
  onModelChange: Function = (_: any) => {
  }

  onModelTouched: Function = () => {
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  writeValue(value) {
    this.value = value || 0;
  }

  constructor(private cdr: ChangeDetectorRef, @Inject(LOCALE_ID) locale: string) {
    this.todayDate = new Date();
    this.todayDate.setHours(0,0,0,0);
    this.refreshDays();
  }


  ngOnInit(): void {
    this.refreshDays();
  }


  ngOnChanges(changes: any): void {
    //
    // if (changes.viewDate || changes.events) {
    //  this.refreshBody();
    // }


  }


  ngOnDestroy(): void {
    // if (this.refreshSubscription) {
    //  this.refreshSubscription.unsubscribe();
    // }
  }

  //
  // toggleDayHighlight(event: CalendarEvent, isHighlighted: boolean): void {
  //  this.view.days.forEach(day => {
  //    if (isHighlighted && day.events.indexOf(event) > -1) {
  //      day.backgroundColor = event.color.secondary;
  //    } else {
  //      delete day.backgroundColor;
  //    }
  //  });
  // }


  private refreshDays(): void {
    const daysToShow = [];
    for (let i = this.dayShowIndex - 2; i <= this.dayShowIndex + 2; i++) {
      const dt = new Date(this.todayDate);
      dt.setDate(this.todayDate.getDate() + i);
      daysToShow.push(dt);
    }
    this.days = daysToShow;
  }

  formattedDate(dt, format) {
    return moment(dt).format(format);
  }

  dayClick(dt) {
    if(this.dayModifier(dt) === '') {
      this.currentSelected = dt;


      let selectedDay = new Date(dt).toDateString();
      selectedDay = selectedDay.split(' ').slice(0, 4).join(' ')
      this.writeValue(selectedDay);
      this.onModelChange(this.value);

      // this.writeValue(dt);
      // this.onModelChange(this.value);
      // this.dayClicked.emit({day: dt});
      this.onModelTouched();
    }
  }
  private refreshAll(): void {
    this.refreshDays();
  }
  gotoPrev() {
    if (this.dayShowIndex > 0) {
      this.dayShowIndex = this.dayShowIndex - 5;
    }
    this.refreshDays();
  }
  gotoNext() {
    if (this.dayShowIndex < 15) {
      this.dayShowIndex = this.dayShowIndex + 5;
    }
    this.refreshDays();
  }
}
