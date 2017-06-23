import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from "@angular/core";
import {FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

const TIME_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimeFormComponent),
  multi: true
};
@Component({
  selector: 'time-form',
  template: `
    <section class="estimate-project__questions-section">
      <div class="container">
        <div class="row estimate-project__question-row">
          <div class="col-md-3 center-block">
            <div class="estimate-project__question-container">
              <p class="estimate-project__question">
                <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_text">What time would you like?</span></p>
              <div class="estimate-project__question-number">
                3<span class="estimate-project__question-number-of">/4</span>
              </div>
            </div>
          </div>
        </div>

        <div class="row estimate-project__question-row" *ngIf="times; else loading">

          <div class="col-sm-3 col-md-3 center-block hour"
               *ngFor="let time of times; let i = index">
            <div class="estimate-project__checkbox"
                 (click)="onTimeSelect(time.hour, i); checkedOption = i"
                 [ngClass]="{active: checkedOption === i, disabled: isBooked(time.hour)}">
              <div class="estimate-project__checkbox__icon">
            <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_image">
              <!--<div class="">-->
              <!--<svg viewBox="-22 -22 96 96" class="ActionBlock__icon___1FkrF" >-->
                <!--<path d="M76.7 45.7c0-7.5-2.4-14.6-6.1-20.7 1.9-2.4 2.8-5.6 2.8-8.9 0-8.9-7.1-16-16-16-5.6 0-10.8 2.8-13.2 7.5-1.9-.5-3.8-.5-6.1-.5-2.4 0-4.2 0-6.1.5C29.2 2.8 24.5 0 18.8 0c-8.9.5-16 7.5-16 16 0 3.3.9 6.6 2.8 8.9C1.9 31.1 0 38.1 0 45.7c0 14.1 7.5 26.4 18.8 33l-4.7 7.5c-.9 1.4-.5 3.3.9 4.2.5.5.9.5 1.4.5.9 0 1.9-.5 2.8-1.4l4.7-8c4.2 1.9 8.9 2.8 13.7 2.8s9.4-.9 13.7-2.8l4.7 8c.5.9 1.4 1.4 2.8 1.4.5 0 .9 0 1.4-.5 1.4-.9 1.9-2.8.9-4.2l-4.7-7.5c12.3-6.7 20.3-18.9 20.3-33zM57.4 6.1c5.2 0 9.9 4.2 9.9 9.9 0 1.4-.5 2.8-.9 3.8-4.2-4.7-9.9-8.5-16-10.4 1.9-1.9 4.2-3.3 7-3.3zM8.9 16c0-5.2 4.2-9.9 9.9-9.9 2.8 0 5.2 1.4 7.1 2.8-6.6 2.4-11.8 6.1-16 10.8-.5-.9-1-2.3-1-3.7zm29.2 62.1c-17.9 0-32.5-14.6-32.5-32.5s14.6-32.5 32.5-32.5 32 14.6 32 32.5-14.1 32.5-32 32.5z"></path><path d="M52.3 42.4H41V22.1c0-1.9-1.4-2.8-2.8-2.8s-2.8.9-2.8 2.8v23.5c0 1.9 1.4 2.8 2.8 2.8h14.1c1.9 0 3.3-1.4 3.3-2.8s-1.5-3.2-3.3-3.2z"></path>-->
              <!--</svg>-->
            <!--</div>-->
              <img class="hs-image-widget"
                   src="assets/clock.svg"
                   style="width:121px;border-width:0px;border:0px;" title="" width="121">
              
            </span>
              </div>
              <div class="estimate-project__checkbox__text">
                <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_text">{{ time.hour | time }}</span>

              </div>
            </div>
          </div>
        </div>
        <ng-template #loading>
          <div class="loader"></div>
        </ng-template>
      </div>
    </section>
  `,
  styleUrls: ['time-form.scss'],
  providers: [TIME_VALUE_ACCESSOR]
})
export class TimeFormComponent implements OnInit {
  @Output() action = new EventEmitter<any>();
  @Input() times;
  @Input() bookedTimes;
  @Input() parent: FormGroup;
  // @Input() label;
  // @Input() tag;
  //checkedOption;
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
  isBooked(time) {
    if (this.bookedTimes.indexOf(time) > -1) {
      return true;
    }
    return false;
  }
  onTimeSelect(time, i) {
    // if (this.bookedTimes.indexOf(time) > -1) {
    //  return;
    // }
    // this.checkedOption = i;
    console.log('in form', time);
    if (this.value !== time) {
      this.writeValue(time);
      this.onModelChange(this.value);
      console.log(time);

    }
    this.onModelTouched();
  }

  ngOnInit() {

  }
}
