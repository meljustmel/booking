import {Component, Input} from "@angular/core";
@Component({
  selector: 'products',
  template: `
    <div class="container">
      <div class="discover__row">
        <div class="discover__col">
          <div class="article-card">
            <div class="product--image">
              <img src="assets/product.png" alt="">
            </div>
            <div class="product--header">
              <p class="product">Serum Number 1</p>
              <p class="price">from $29</p>
            </div>
            <div class="product--body">
              <p class="">Rapture takes the hassle out of going through the feedback on a design, which ultimately speeds up the entire.</p>
            </div>
          </div>
          <action [label]="'Order'"></action>
        </div>
        <div class="discover__col">
          <div class="article-card">
            <div class="product--image">
              <img src="assets/product.png" alt="">
            </div>
            <div class="product--header">
              <p class="product">Serum Number 2</p>
              <p class="price">from $39</p>
            </div>
            <div class="product--body">
              <p class="">Rapture takes the hassle out of going through the feedback on a design, which ultimately speeds up the entire.</p>
            </div>
          </div>
          <action [label]="'Order'"></action>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1040px;
      margin:0 auto;
      padding-bottom: 4em;
      text-align: center;
    }
    .discover__row {
      margin: 0;
      padding: 0;
    }
    .discover__col {
      border-radius: 10px;
      width: 40%;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.09);
    }
    .article-card {
      margin: 40px 70px 0 70px;
      position: relative;
      margin: 3em;
    }
    .product {
      font-size: 0.9em;
      margin: 0;
    }
    .price {
      color: #999;
    }
    .product--body {
      color: #666;
      font-size: 0.8em;
    }
    .product--image img {
      min-height: 155px;
      background-position: center bottom;
      height: 144px;
      width: 91px;
      padding-bottom: 2em;
      opacity: 0.5;
    }
  `]
})
export class ProductsComponent {
  @Input() background;

}

