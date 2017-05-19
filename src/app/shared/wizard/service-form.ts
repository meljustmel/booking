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
    <div class="section" [formGroup]="parent">
      <div class="section-content">
        <div *ngFor="let service of services; let i = index"
             (click)="onServiceSelect(service.type)"
             class="column large-4 medium-6">
          <div class="column-compare">
            <a (click)="checkedOption = i"
               [ngClass]="{selected: checkedOption === i}"
               class="select-trigger select-trigger-light alt-image-product">
              <div class="check" [ngClass]="{selected: checkedOption === i}"></div>
              <!--<img [src]="service.img" alt="">-->
              <span class="svgIcon svgIcon--logoNew svgIcon--45px is-flushLeft">
               <div [ngSwitch]="service.type">
                 <svg *ngSwitchCase="'Waxing'" width="40px" height="40px" viewBox="0 0 40 40">
                    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g>
                            <circle id="Oval" fill="#D8F8ED" cx="20" cy="20" r="20"></circle>
                            <circle id="Oval" fill="#7FEAC4" cx="20" cy="20" r="14"></circle>
                            <ellipse id="Oval" fill="#00D58A" cx="20" cy="20" rx="8" ry="8"></ellipse>
                        </g>
                    </g>
                </svg>
                 <svg *ngSwitchCase="'Shaping'" width="40px" height="40px" viewBox="0 0 40 40">
                    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="multiple-colors-copy">
                            <g id="Group-3">
                                <rect id="Rectangle-4" fill="#D8E7FF" transform="translate(24.000000, 24.000000) scale(-1, 1) translate(-24.000000, -24.000000) " x="8" y="8" width="32" height="32" rx="16"></rect>
                                <rect id="Rectangle-4" fill="#7FB1FF" transform="translate(20.000000, 20.000000) scale(-1, 1) translate(-20.000000, -20.000000) " x="4" y="4" width="32" height="32" rx="16"></rect>
                                <rect id="Rectangle-4" fill="#0063FF" transform="translate(16.000000, 16.000000) scale(-1, 1) translate(-16.000000, -16.000000) " x="0" y="0" width="32" height="32" rx="16"></rect>
                            </g>
                            <ellipse id="Oval" fill="#FFFFFF" cx="16" cy="16" rx="2" ry="2"></ellipse>
                        </g>
                    </g>
                  </svg>
                 <svg *ngSwitchCase="'Tinting'" width="40px" height="40px" viewBox="0 0 40 40">
                      <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g id="snapshots-copy">
                              <rect id="Rectangle-4" fill="#FFE9D8" x="0" y="0" width="24" height="24" rx="2"></rect>
                              <rect id="Rectangle-4" fill="#FFB67F" x="8" y="8" width="24" height="24" rx="2"></rect>
                              <rect id="Rectangle-4" fill="#FF6D00" x="16" y="16" width="24" height="24" rx="2"></rect>
                          </g>
                      </g>
                  </svg>
               </div>
              </span>
              <div class="product-header">
                <p class="product">Organic {{ service.type }}</p>
                <p class="price">from {{ service.price | currency:'USD':true }}</p>
              </div>
              <ul class="list list-circle">
                <li>Organic and stuff</li>
                <li>All Natural</li>
                <li>100% woke</li>
              </ul>
            </a>
          </div>
        </div>
      </div>
    </div>
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
      'price': 25,
      'type': 'Waxing',
      'img': '/assets/touchbar.svg',
    },
    {
      'price': 30,
      'type': 'Shaping',
      'img': '//p6.zdassets.com/hc/theme_assets/224203/200019615/201998438.svg',
    },
    {
      'price': 35,
      'type': 'Tinting',
      'img': '//p6.zdassets.com/hc/theme_assets/224203/200019615/202711228.svg',
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
