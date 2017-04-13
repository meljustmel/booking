import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'confirm-form',
  template: `
    <div class="segment" class='spacer'>
      <div class="container">
        <div class="content content--center">
          <h1 class="content__headline">Thank You {{user.displayName | first:' '}}</h1>
          <h2 class="content__subline">Your {{data.service}} reservation for {{data.reservationDate}} <br>
            at {{data.reservationTime | time}} is confirmed!</h2>
          <div class="line line--invisible"></div>
          <a (click)='action.emit(next)' class="button button--primary" routerLink="/">Home</a>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class ConfirmFormComponent implements OnInit {
  @Output() action = new EventEmitter<any>();
  @Input() label;
  @Input() data;
  @Input() user;
  ngOnInit() {

  }
}
