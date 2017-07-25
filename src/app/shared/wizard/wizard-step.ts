import {Component, OnInit, Input, Output, EventEmitter, HostBinding} from '@angular/core'
import {routeFadeStateTrigger} from "../../app.animations";

@Component({
  selector: 'wizard-step',
  styles: [`
    :host {
      display: block;
    }
  `],
  animations: [
    routeFadeStateTrigger
  ],
  template:
      `
    <div [hidden]="!isActive">
      <ng-content></ng-content>
    </div>
  `
})
export class WizardStepComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = true;
  @Input() title: string;
  @Input() hidden = false;
  @Input() isValid = true;
  @Input() showNext = true;
  @Input() showPrev = true;
  @Input() stepTitle;
  @Input() stepTagline;
  @Input() stepHeading;

  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPrev: EventEmitter<any> = new EventEmitter<any>();
  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();

  private _isActive = false;
  isDisabled = true;

  constructor() { }

  ngOnInit() {

  }

  @Input('isActive') set isActive(isActive: boolean) {
    this._isActive = isActive;
    this.isDisabled = false;
  }

  get isActive(): boolean {
    return this._isActive;
  }

}
