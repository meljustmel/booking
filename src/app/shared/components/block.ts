import {Component, OnInit} from "@angular/core";
const template = `
<div class="streamItem streamItem--digestSection">
  <div class="streamItem-card streamItem-card--digestSectionPreview cardChromeless u-borderTop2 u-marginBottom20">
     <div class="streamItem-cardInner streamItem-cardInner--digestSectionPreview u-paddingTop0">
      <ng-content></ng-content>
    </div>
  </div>
</div>
`;
@Component({
  selector: 'block',
  template,
  styles: []
})
export class BlockComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
