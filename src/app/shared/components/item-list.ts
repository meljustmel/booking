import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'item-list',
  template: `
    <div *ngFor="let item of items">
      <!--<p>here {{item | json}}</p>-->
      <item [reservation]="item"></item>
    </div>
    
    <!--<pre>{{items | json }}</pre>-->
  `,
  styles: []
})
export class ItemListComponent implements OnInit {
  @Input() items;
  constructor() {
  }

  ngOnInit() {
  }

}
