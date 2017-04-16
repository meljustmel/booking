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
    <div class="root" [style.paddingTop.em]="3">
      <h4 class="label">Step Three</h4>
      <h3 class="">What time would you like</h3>
      <h1 class="title">Sessions are an hour long</h1>
    </div>
    <div class="section">
      <div class="section-content">
        <div class="choicesbox" *ngIf="times; else loading">
          <ul class="row form-selector choices">
            <li *ngFor="let time of times; let i = index"
                (click)="onTimeSelect(time.hour); checkedOption = i"
                [ngClass]="{checked: checkedOption === i}"
                class="choice">
              <input class="form-choice form-choice-selector rounded" type="radio">
              <div class="form-choice-selector-label"
                    [ngClass]="{selected: checkedOption === i}">
                <div class="check" [ngClass]="{checked: checkedOption === i}"></div>
                <label class="form-label">{{ time.hour | time }}</label>
                <span class="duration">60 minutes {{time.available}}</span>
                <!--<small>{{time.available}}</small>-->
              </div>
            </li>
          </ul>
        </div>
        <ng-template #loading>
          <div class="loader"></div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .section {
      overflow: hidden;
      margin-bottom: 100px;
      position: relative;
      height: 450px;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .section-content {
      margin-left: auto;
      margin-right: auto;

      width: 980px;
    }
    .section-models {
      padding-top: 52px;
    }
    .row {
      position: relative;
      z-index: 1;
    }

    .choices {
      margin: 0 auto;
      list-style: none;
      /*padding: 0;*/
      /*margin: 0;*/
      cursor: auto;
      display: -webkit-flex;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
    }

    .choice {
      text-align: center;
      width: 20%;
      margin: 1em;
      
    }
    
    .check {
      background-image: url(assets/circle.png);
      background-repeat: no-repeat;
      background-size: 22px 22px;
      height: 22px;
      width: 22px;
      margin: 6px auto;
    }

    .choice .checked {
      background-image: url(assets/check.png);
      background-repeat: no-repeat;
      background-size: 22px 22px;
      height: 22px;
      width: 22px;
      margin: 6px auto;
     
    }

    .form-choice-selector {
      display: inline-block;
      width: 100%;
      height: 100%;
      -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
      -webkit-tap-highlight-color: transparent;
    }

    .form-choice {
      position: absolute;
      top: 3px;
      left: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
      width: 16px;
      height: 16px;
    }

    .form-choice-selector-label {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      height: 100px;
      padding-left: 16px;
      padding-right: 16px;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.09);
      cursor: pointer;
      box-sizing: border-box;
      border-spacing: 0;
      overflow: hidden;
      font-size: 16px;
      border-radius: 4px;
      position: relative;
    }
    .form-choice-selector-label:hover {
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.25);
    }
    .form-choice-selector-label.selected {
      border-color: #AEEEE1;
    }
    
    .form-label {
      position: relative;
      text-indent: 0;
      display: block;
      padding: 0px 14px;
      font-size: 1em;
      line-height: 1.28583;
      font-weight: bold;
      letter-spacing: -.05em;
      color: rgba(0, 0, 0, 0.8);
      cursor: pointer;

    }
    .duration {
      font-size: 0.8em;
      opacity: 0.7;
    }
  `],
  providers: [TIME_VALUE_ACCESSOR]
})
export class TimeFormComponent implements OnInit {
  @Output() action = new EventEmitter<any>();
  @Input() times;
  @Input() parent: FormGroup;
  // @Input() label;
  // @Input() tag;

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

  onTimeSelect(time) {
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
