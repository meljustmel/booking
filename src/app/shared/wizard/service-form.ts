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
    <div class="root" [style.paddingTop.em]="3">
      <h4 class="label">Step One</h4>
      <h3 class="">Select the method you prefer </h3>
      <h1 class="title">All Three are Organic</h1>
    </div>
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
                <svg class="svgIcon-use" width="45" height="45" viewBox="-17 18 45 45" data-multipart="true">
                  <path d="M11.525 28.078c-.472-.225-.858.002-.858.506v20.044l8.616 4.113c.948.46 1.717.14 1.717-.7v-19.3a.22.22 0 0 0-.124-.19l-9.35-4.46v-.01z"></path>
                  <path d="M.333 43.696l9.83-15.247c.278-.43.89-.6 1.36-.38l9.364 4.47c.06.03.082.1.047.15L10.666 48.63.333 43.698v-.002z"></path>
                  <path d="M-8.57 28.35c-.786-.375-1.053-.096-.592.62L.333 43.696l10.333 4.932L.356 32.635a.156.156 0 0 0-.06-.054l-8.866-4.23z"></path>
                  <path d="M.333 52.033c0 .84-.643 1.22-1.43.844l-8.045-3.84c-.472-.224-.858-.82-.858-1.325V28.89c0-.672.515-.976 1.145-.675l9.133 4.36a.092.092 0 0 1 .055.084v19.37z"></path>
                </svg>
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
      opacity:0.6;
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
      'img': '//p6.zdassets.com/hc/theme_assets/224203/200019615/203573748.svg',
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
