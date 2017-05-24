import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from "@angular/core";
import {FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

const TIME_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimeFormComponent),
  multi: true
};
@Component({
  selector: 'time-form',
  // template: `
  //   <!--<div class="root" [style.paddingTop.em]="3">-->
  //     <!--<h4 class="label">Step Three</h4>-->
  //     <!--<h3 class="">What time would you like</h3>-->
  //     <!--<h1 class="title">Sessions are an hour long</h1>-->
  //   <!--</div>-->
  //   <div class="section">
  //     <div class="section-content">
  //       <div class="choicesbox" *ngIf="times; else loading">
  //         <ul class="row form-selector choices">
  //           <li *ngFor="let time of times; let i = index"
  //               (click)="onTimeSelect(time.hour, i); checkedOption = i"
  //               [ngClass]="{checked: checkedOption === i, disabled: isBooked(time.hour)}"
  //               class="choice"
  //               ngDisabled="true">
  //             <input class="form-choice form-choice-selector rounded" type="radio">
  //             <div class="form-choice-selector-label"
  //                   [ngClass]="{selected: checkedOption === i}">
  //               <div class="check" [ngClass]="{checked: checkedOption === i}"></div>
  //               <label class="form-label">{{ time.hour | time }}</label>
  //               <span class="duration">60 minutes {{time.available}}</span>
  //               <!--<small>{{time.available}}</small>-->
  //             </div>
  //           </li>
  //         </ul>
  //       </div>
  //       <ng-template #loading>
  //         <div class="loader"></div>
  //       </ng-template>
  //     </div>
  //   </div>
  // `,
  templateUrl: 'time-form.html',
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
