import {Component, Input, OnInit} from "@angular/core";
@Component({
  selector: 'block-header',
  template: `
    <header class="heading u-clearfix heading--borderedBottom u-padding10">
      <div class="u-clearfix">
        <div class="heading-content u-floatLeft">
          <span class="heading-title heading-title--darker u-padding10">{{ tag }}</span>
        </div>
      </div>
    </header>
  `,
  styles: [`

  `]
})
export class BlockHeaderComponent implements OnInit {
  @Input() tag;

  constructor() {
  }

  ngOnInit() {
  }

}
