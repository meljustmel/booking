import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'breadcrumbs',
  template: `
    <div class="metabar-inner u-maxWidth1000 u-marginAuto">
      <nav class="metabar-block metabar-block--below u-overflowHiddenY u-height50 u-xs-height39">
        <ul class="u-borderTopLightest u-textAlignLeft u-noWrap u-overflowX u-paddingTop4 u-xs-paddingTop0 u-paddingBottom100 u-xs-paddingLeft20 u-xs-paddingRight20">
          <li *ngFor="let step of steps; let i = index" class="metabar-navItem u-uiTextRegular u-fontSizeSmaller u-inlineBlock u-textColorNormal u-xs-paddingRight12 u-xs-marginRight0">
            <a [ngClass]="{'link--darker': step.isActive, 'enabled': !step.isDisabled, 'disabled': step.isDisabled, 'u-accentColor--textDarken': isCompleted}"
               (click)="goToStep(step)" class="link  u-baseColor--link">
              <!--<span class="step">{{i + 1}}</span>-->
              <span>{{step.title}}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: [`
    .arrowDivider:after {
      content: '>';
      padding: 0 1em;
    }
  `]
})
export class BreadCrumbComponent implements OnInit {
  @Output() action = new EventEmitter<any>();
  // @Input() label;
  // @Input() tag;

  ngOnInit() {

  }
}
