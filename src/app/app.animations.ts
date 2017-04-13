import { animate, style, transition, trigger } from '@angular/animations';

export const routeFadeStateTrigger = trigger('routeFadeState', [
  transition(':enter', [
    style({
      transform: 'translateY(20px)',
      opacity: 0
    }),
    animate(350)
  ]),
  transition(':leave', animate(350, style({
    transform: 'translateY(-20px)',
    opacity: 0
  })))
]);

export const wizardFadeStateTrigger = trigger('stepFadeState', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(350)
  ]),
  transition(':leave', animate(350, style({
    opacity: 0
  })))
]);

export const routeSlideStateTrigger = trigger('routeSlideState', [
  transition(':enter', [
    style({
      transform: 'translateY(-100%)',
      opacity: 0
    }),
    animate(300)
  ]),
  transition(':leave', animate(300, style({
    transform: 'translateY(100%)',
    opacity: 0
  })))
]);
