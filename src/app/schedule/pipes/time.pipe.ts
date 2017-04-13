import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  constructor() {}

  transform(value: any): any {
    let suffix = '';
    if (!parseInt(value, 10)) {
      return null;
    }
    if (typeof value !== 'number') {
      return null;
      // this.remainingTime = parseInt(value, 10);
    }
    // if (value = NaN ) {
    //   return 'Select Time';
    // }
    if (value > 12) {
      suffix = ':00 PM';
    } else {
      suffix = ':00 AM';
    }
    const newTime = ((+value + 11) % 12 + 1).toString();
    return newTime + suffix;
  }

}
// :00 {{ value.hour > 12 ? 'pm' : 'am'
