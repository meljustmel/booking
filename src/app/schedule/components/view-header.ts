import { Component, Input } from '@angular/core';
import { WeekDay } from '../utils/calendar-utils';

@Component({
  selector: 'view-header',
  template: `
<button>
<b>{{ day.header  }}</b>
    <br>
    <span>{{ day.header  }}</span>
</button>
    
  `,
  host: {
    '[class]': '"cal-header"',
    '[class.cal-past]': 'day.isPast',
    '[class.cal-today]': 'day.isToday',
    '[class.cal-future]': 'day.isFuture',
    '[class.cal-weekend]': 'day.isWeekend'
  }
})
export class ViewHeaderComponent {

  @Input() day: WeekDay;

  @Input() locale: string;

}
