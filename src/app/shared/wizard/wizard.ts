import {AfterContentInit, Component, ContentChildren, EventEmitter, OnInit, Output, QueryList} from "@angular/core";
import {WizardStepComponent} from "./wizard-step";

@Component({
  selector: 'form-wizard',
  template: `
    <div class="spacer">
      <div class="onboardingTopBar" [style.padding.px]="10">
        <div class="container u-maxWidth920">
          <div [hidden]="isCompleted" class="onboardingTopBar-actions">
            <step-action class="onboardingTopBar-action" (action)='previous()' [hidden]='!hasPrevStep || !activeStep.showPrev' label='Prev'></step-action>
            <step-action class="onboardingTopBar-action" (action)='next()' [disabled]='!activeStep.isValid' label='Next'></step-action>
            <step-action class="onboardingTopBar-action" (action)='complete()' [disabled]='!activeStep.isValid' [hidden]='hasNextStep' label='Done'>Confirm</step-action>
          </div>
          <div class="onboardingTopBar-greeting">Reserve your spot</div>
          <div class="onboardingTopBar-progress">
            <small *ngFor="let step of steps" class="onboardingTopBar-step">
              <a [ngClass]="{'is-active': step.isActive, 'enabled': !step.isDisabled, 'disabled': step.isDisabled, 'u-accentColor--textDarken': isCompleted}" 
                 class="svgIcon svgIcon--arrowRight svgIcon--21px">{{step.title}}
                <span>
                  <svg class="svgIcon-use" width="21" height="21" viewBox="0 0 21 10">
                    <path d="M8.3 4.2l6.4 6.3-6.4 6.3-.8-.8 5.5-5.5L7.5 5" fill-rule="evenodd"></path>
                  </svg>
                </span>
              </a>
            </small>
          </div>
        </div>
      </div>
      <div class="">
        <ng-content></ng-content>
      </div>
      
    </div>`
  ,
  styles: [`
    .link--darker {
      color: rgba(0, 0, 0, 0.8);
    }
    .metabar-navItem {
      width: 100px;
      text-align: center;
    }
    .content {
      text-align: center;
    }
    .u-accentColor--textDarken {
      color: #00ab6b;
      
    }
    .onboardingTopBar {
      /*position: fixed;*/
      top: 0;
      left: 0;
      right: 0;
      background: #fafafa;
      box-shadow: 0 0 1px rgba(0, 0, 0, .15);
      z-index: 500;
      position: relative;
    }

    .container {
      padding-right: 20px;
      padding-left: 20px;
      margin-right: auto;
      margin-left: auto;
      box-sizing: border-box;
    }

    .u-maxWidth920 {
      max-width: 920px !important;
    }

    .onboardingTopBar-greeting {
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
      letter-spacing: 0;
      font-weight: 400;
      font-style: normal;
      margin-top: 15px;
      line-height: 1.1;
    }
    .onboardingTopBar-actions {
      float: right;
    }
    
    .onboardingTopBar-action {
      margin: 0 0 15px 10px;
      /*float: right;*/
    }

    .onboardingTopBar-progress {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      letter-spacing: 0;
      font-weight: 400;
      font-style: normal;
      margin-bottom: 10px;
      margin-top: 3px;
      line-height: 1.2;
    }

    .onboardingTopBar-step {
      color: rgba(0, 0, 0, .44);
    }
    small {
      font-size: 80%;
    }

    small a {
      cursor: pointer;
      
    }
    a.is-active {
      color: rgba(0, 0, 0, .8);
    }
  `
  ]
})
export class WizardComponent implements OnInit, AfterContentInit {
  @ContentChildren(WizardStepComponent)
  wizardSteps: QueryList<WizardStepComponent>;

  private _steps: Array<WizardStepComponent> = [];
  private _isCompleted = false;

  @Output()
  onStepChanged: EventEmitter<WizardStepComponent> = new EventEmitter<WizardStepComponent>();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.wizardSteps.forEach(step => this._steps.push(step));
    this.steps[0].isActive = true;
  }

  private get steps(): Array<WizardStepComponent> {
    return this._steps.filter(step => !step.hidden);
  }

  private get isCompleted(): boolean {
    return this._isCompleted;
  }

  private get activeStep(): WizardStepComponent {
    return this.steps.find(step => step.isActive);
  }

  private set activeStep(step: WizardStepComponent) {
    if (step !== this.activeStep && !step.isDisabled) {
      this.activeStep.isActive = false;
      step.isActive = true;
      this.onStepChanged.emit(step);
    }
  }

  private get activeStepIndex(): number {
    return this.steps.indexOf(this.activeStep);
  }

  private get hasNextStep(): boolean {
    return this.activeStepIndex < this.steps.length - 1;
  }

  private get hasPrevStep(): boolean {
    return this.activeStepIndex > 0;
  }

  goToStep(step: WizardStepComponent) {
    if (!this.isCompleted) {
      this.activeStep = step;
    }
  }

  next() {
    if (this.hasNextStep) {
      const nextStep: WizardStepComponent = this.steps[this.activeStepIndex + 1];
      this.activeStep.onNext.emit();
      nextStep.isDisabled = false;
      this.activeStep = nextStep;
    }
  }

  previous() {
    if (this.hasPrevStep) {
      const prevStep: WizardStepComponent = this.steps[this.activeStepIndex - 1];
      this.activeStep.onPrev.emit();
      prevStep.isDisabled = false;
      this.activeStep = prevStep;
    }
  }

  complete() {
    this.activeStep.onComplete.emit();
    this._isCompleted = true;
  }

}
