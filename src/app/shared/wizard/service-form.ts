import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from "@angular/core";
import {FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

const SERVICE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ServiceFormComponent),
  multi: true
};
@Component({
  selector: 'service-form',
  template: `
    <section class="estimate-project__questions-section" [formGroup]="parent">
      <div class="container">
        <div class="row estimate-project__question-row">
          <div class="col-md-3 center-block">
            <div class="estimate-project__question-container">
              <p class="estimate-project__question">
                <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_text" style="z-index: 10">Select the method you prefer?</span></p>
              <div class="estimate-project__question-number">
                1<span class="estimate-project__question-number-of" style="z-index: 1">/4</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row estimate-project__question-row">
          
          <div class="col-sm-4 col-md-4 center-block"
               [ngClass]="{active: checkedOption === i}"
               *ngFor="let service of services; let i = index"
               (click)="onServiceSelect(service)">
            <div class="estimate-project__checkbox"
                 (click)="checkedOption = i"
                 [ngClass]="{active: checkedOption === i}">
              <div class="estimate-project__checkbox__icon">
            <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_image">
              <img alt="" class="hs-image-widget" [src]="service.img" style="width:100px;border-width:0px;border:0px;" title="" width="100"></span>
              </div>
              <div class="estimate-project__checkbox__text">
                <span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_text">{{ service.type }}</span>
                <br>
                <span class="">{{ service.price | currency:'USD':true }}</span>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['service-form.scss'],
  providers: [SERVICE_VALUE_ACCESSOR]
})
export class ServiceFormComponent implements OnInit {
  @Output() action = new EventEmitter<any>();
  @Input()
  parent: FormGroup;
  // @Input() tag;
  services: any = [
    {
      'price': 20,
      'type': 'Threading',
      'img': 'assets/needle.svg',
    },
    {
      'price': 25,
      'type': 'Waxing',
      'img': 'assets/wax.svg',
    },
    {
      'price': 40,
      'type': 'Tinting',
      'img': 'assets/drop.svg',
    }
  ];

  value: any;
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

  onServiceSelect(service) {
    if (this.value !== service) {
      this.writeValue(service);
      this.onModelChange(this.value);
      console.log(service);

    }
    this.onModelTouched();
  }

  ngOnInit() {

  }
}
