import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'search',
  template: `
    <form role="search" class="help-hero__input" data-search="" data-instant="true" autocomplete="off">
      <input name="utf8" type="hidden" value="✓">
      <input type="search" name="query" id="query" placeholder="Search" autocomplete="off" [(ngModel)]="searchValue"
             aria-label="Search" (ngModelChange)="onSearchValueChanged($event)">
    </form>
  `,
  styles: [`
    .help-hero__input {

      border: 1px solid #5FE6BE;

    }      
  `]
})
export class SearchComponent {
  @Input() background;
  @Output() searchChanged = new EventEmitter<any>();
  searchValue = '';

  onSearchValueChanged(event) {
    this.searchChanged.emit(event);
  }
}
