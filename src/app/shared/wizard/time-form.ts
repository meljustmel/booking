import {Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output} from '@angular/core'
import {FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {routeFadeStateTrigger} from "../../app.animations";

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
              <div class="ActionBlock__container" >
              <svg viewBox="-22 -22 96 96" class="ActionBlock__icon" [ngClass]="{disabled: isBooked(time.hour)}" >
                <g>
    <path d="M40.076 29.153h-7.142c-.364-1.399-1.459-2.494-2.858-2.858V16.153c0-.553-.448-1-1-1s-1 .447-1 1v10.142c-1.72.447-3 1.999-3 3.858 0 2.206 1.794 4 4 4 1.858 0 3.411-1.28 3.858-3h7.142c.552 0 1-.447 1-1s-.447-1-1-1zm-11 3c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"/>
    <path d="M50.188 9.764l4.096 4.096c.188.188.442.293.707.293s.52-.105.707-.293c3.167-3.166 3.167-8.319 0-11.485s-8.319-3.166-11.485 0c-.188.188-.293.441-.293.707s.105.52.293.707l4.561 4.561-1.699 1.699c-4.78-4.284-11.089-6.896-17.998-6.896s-13.218 2.612-17.998 6.896l-1.7-1.699 4.561-4.561c.188-.188.293-.441.293-.707s-.105-.52-.293-.707c-3.166-3.166-8.318-3.166-11.485 0s-3.167 8.319 0 11.485c.188.188.442.293.707.293s.52-.105.707-.293l4.096-4.096 1.676 1.676c-4.679 4.857-7.565 11.453-7.565 18.713 0 9.898 5.357 18.564 13.321 23.265l-3.028 3.028c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l3.45-3.45c3.578 1.754 7.597 2.743 11.843 2.743s8.265-.989 11.843-2.743l3.45 3.45c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-3.028-3.028c7.964-4.701 13.321-13.367 13.321-23.265 0-7.26-2.886-13.856-7.565-18.713l1.677-1.676zm4.095-5.975c2.146 2.146 2.362 5.502.649 7.893L46.391 3.14c2.39-1.713 5.745-1.498 7.892.649zM3.22 11.681c-1.713-2.39-1.497-5.746.649-7.892s5.502-2.361 7.892-.649L3.22 11.681zm25.856 43.472c-13.785 0-25-11.215-25-25s11.215-25 25-25 25 11.215 25 25-11.214 25-25 25z"/>
    <path d="M29.076 10.032c.552 0 1-.447 1-1v-1c0-.553-.448-1-1-1s-1 .447-1 1v1c0 .552.448 1 1 1zm0 40c-.552 0-1 .447-1 1v1c0 .553.448 1 1 1s1-.447 1-1v-1c0-.553-.447-1-1-1zm21-19h1c.552 0 1-.447 1-1s-.448-1-1-1h-1c-.552 0-1 .447-1 1s.448 1 1 1zm-42-2h-1c-.552 0-1 .447-1 1s.448 1 1 1h1c.552 0 1-.447 1-1s-.447-1-1-1zm35.85-15.264l-.707.707c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l.707-.707c.391-.391.391-1.023 0-1.414s-1.024-.391-1.414 0zM13.52 44.174l-.707.707c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l.707-.707c.391-.391.391-1.023 0-1.414s-1.023-.39-1.414 0zm31.113 0c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l.707.707c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-.707-.707zM14.227 13.768c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l.707.707c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-.707-.707z"/>
  </g>
              </svg>
            </div>
              
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
  animations: [
    routeFadeStateTrigger
  ],
  styleUrls: ['time-form.scss'],
  providers: [TIME_VALUE_ACCESSOR]
})
export class TimeFormComponent implements OnInit {
  @Output() action = new EventEmitter<any>();
  @Input() times;
  @Input() bookedTimes;
  @Input() parent: FormGroup;
  @HostBinding('@routeFadeState') routeAnimation = true;
  // @Input() label;
  // @Input() tag;
  // checkedOption;
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
