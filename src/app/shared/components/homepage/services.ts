import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Service} from "../../../core/model/service";
@Component({
  selector: 'services',
  template: `
    <div class="discover__row container">
      <div *ngFor="let service of services; let i = index" class="discover__col">
        <div class="article-card">
         <span class="svgIcon svgIcon--logoNew svgIcon--45px is-flushLeft">
          <svg class="svgIcon-use" width="45" height="45" viewBox="-17 18 45 45" data-multipart="true">
            <path d="M11.525 28.078c-.472-.225-.858.002-.858.506v20.044l8.616 4.113c.948.46 1.717.14 1.717-.7v-19.3a.22.22 0 0 0-.124-.19l-9.35-4.46v-.01z"></path>
            <path d="M.333 43.696l9.83-15.247c.278-.43.89-.6 1.36-.38l9.364 4.47c.06.03.082.1.047.15L10.666 48.63.333 43.698v-.002z"></path>
            <path d="M-8.57 28.35c-.786-.375-1.053-.096-.592.62L.333 43.696l10.333 4.932L.356 32.635a.156.156 0 0 0-.06-.054l-8.866-4.23z"></path>
            <path d="M.333 52.033c0 .84-.643 1.22-1.43.844l-8.045-3.84c-.472-.224-.858-.82-.858-1.325V28.89c0-.672.515-.976 1.145-.675l9.133 4.36a.092.092 0 0 1 .055.084v19.37z"></path>
          </svg>
        </span>
          <h4>{{ service.title}}</h4>
          <p>{{ service.description}}</p>
          <a (click)='onOpen(service)'>Details</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1040px;
      margin:0 auto;
      padding: 4em 0;
    }
    .discover__col {
      text-align: center;
    }
    h4 {
      padding-bottom: .5em;
      margin: .5em 0;
    }
    p {
      opacity: 0.7;
      font-size: 0.9em;
    }

    a {
      color: #384368;
      border: 1px solid #384368;
      display: inline-block;
      padding: 0 25px;
      margin-bottom: 15px;
      height: 40px;
      line-height: 38px;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
      font-size: 14px;
      white-space: nowrap;
      text-decoration: none;
      cursor: pointer;
      border-radius: 20px;
      transition: .1s background-color,.1s border-color,.1s color,.1s fill;
    }
    a:hover {
      background-color: #384368;
      color: #FFFFFF;
    }
    * {
      box-sizing: border-box;
    }
  `]
})
export class ServicesComponent {
  @Input() background;
  @Input() services;
  @Output() open: EventEmitter<Service> = new EventEmitter<Service>();

  onOpen(service) {
    this.open.emit(service);
  }
}

