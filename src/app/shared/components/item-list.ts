import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'item-list',
  template: `
    <div *ngFor="let item of items">
      <!--<p>here {{item | json}}</p>-->
      <item [reservation]="item" [showActionButton]="showActionButton" [showUserInfo]="showUserInfo"></item>
    </div>

    <!--<pre>{{items | json }}</pre>-->
  `,
  styles: [`
    body {
      font-family: "GT-Walsheim", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    }
  `]
})
export class ItemListComponent implements OnInit {
  @Input() items;
  @Input() showActionButton;
  @Input() showUserInfo;

  constructor() {
  }

  ngOnInit() {
  }

}
