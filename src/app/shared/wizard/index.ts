import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './wizard';
import { WizardStepComponent } from './wizard-step';
import { ActionComponent } from '../components/';
import {StepActionComponent} from "./step-action";
export * from './wizard';
export * from './wizard-step';
export * from './step-action';
export * from './time-form';
export * from './credit-form';
export * from './success-form';
export * from './service-form';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WizardComponent,
    WizardStepComponent,
    ActionComponent,
    StepActionComponent
  ],
  exports: [
    WizardComponent,
    WizardStepComponent,
    ActionComponent,
    StepActionComponent
  ]
})
export class FormWizardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FormWizardModule
    };
  }
}
