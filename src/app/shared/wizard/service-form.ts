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
    <!--<div class="root" [style.paddingTop.em]="3">-->
      <!--<h4 class="label">Step One</h4>-->
      <!--<h3 class="">Select the method you prefer </h3>-->
      <!--<h1 class="title">All Three are Organic</h1>-->
    <!--</div>-->
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
  styles: [`
    svg {
      margin: 2em 0;
    }
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

    .large-4 {
      width: 33.3333%;
    }

    .column {
      position: relative;
      z-index: 1;
      min-height: 2px;
      margin: 0;
      padding: 0;
      float: left;
    }

    .select-trigger {
      display: block;
      padding-top: 22px;
      text-align: center;
      text-decoration: none;
      color: #333;
      background-color: #f2f2f2;
      border: 1px solid transparent;
      cursor: pointer;
      /*height: 735px;*/
      margin: 5px;
      border-radius: 10px;
    }

    .select-trigger.select-trigger-light {
      background-color: #fafafa;
    }

    .select-trigger .check {
      background-image: url(assets/circle.png);
      background-repeat: no-repeat;
      background-size: 22px 22px;
      height: 22px;
      width: 22px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 13px;
    }

    .select-trigger .product-header {
      height: 86px;
    }

    .select-trigger .product-messaging {
      margin: 15px 0 17px 0;
      min-height: 38px;
    }

    .select-trigger:hover {
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.09);
    }

    .select-trigger .selected {
      background-image: url(assets/check.png);
      background-repeat: no-repeat;
      /*background-size: 22px 22px;*/
      /*height: 22px;*/
      /*width: 22px;*/
      /*margin-left: auto;*/
      /*margin-right: auto;*/
      /*margin-bottom: 13px;*/

    }

    .select-trigger.selected {
      border-color: #AEEEE1;
    }

    .select-trigger ul {
      text-align: left;
      margin: 0 24px 0 60px;
      color: #666;
      font-size: 14px;
      line-height: 1.25;
      padding-bottom: 20px;
    }

    .list-circle {
      list-style: circle outside;
    }

    .select-trigger li:empty {
      display: none;
    }

    .select-trigger li {
      margin-bottom: 16px;
    }

    .product {
      margin-bottom: 5px;
    }

    .price {
      opacity: 0.6;
      font-size: 16px;
    }
  `],
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
