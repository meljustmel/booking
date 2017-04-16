import {AfterContentInit, Component, ContentChildren, EventEmitter, OnInit, Output, QueryList} from "@angular/core";
import {WizardStepComponent} from "./wizard-step";

@Component({
  selector: 'form-wizard',
  template: `
    <div class="onboardingTopBar" [style.padding.em]="4">
      <div class="topbar u-maxWidth920">
        <div [hidden]="isCompleted" class="onboardingTopBar-actions">
          <button type="button" class="back" (click)="previous()" [hidden]="!hasPrevStep || !activeStep.showPrev">Back</button>
          <button type="button" [ngClass]="{'valid' : activeStep.isValid}" (click)="next()" [disabled]="!activeStep.isValid" [hidden]="!hasNextStep || !activeStep.showNext">Next</button>
          <button type="button" class="" (click)="complete()" [disabled]="!activeStep.isValid" [hidden]="hasNextStep">Done</button>
        </div>
        <div class="onboardingTopBar-greeting">Reserve your spot</div>
        <div class="onboardingTopBar-progress">
          <small *ngFor="let step of steps" class="onboardingTopBar-step">
            <a [ngClass]="{'is-active': step.isActive, 'enabled': !step.isDisabled, 'disabled': step.isDisabled, 'u-accentColor--textDarken': isCompleted}"
               (click)="goToStep(step)"
               class="svgIcon svgIcon--arrowRight svgIcon--21px">{{step.title}}<span>
                  <svg class="svgIcon-use" width="18" height="18" viewBox="0 0 21 10">
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
  `,
  styleUrls: ['wizard.scss']
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
