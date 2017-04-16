import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class DatePipe implements PipeTransform {
  transform(date: any, args?: any): any {
    const d = new Date(date)
    return moment(d).format('dddd MMMM Do');

  }
}
