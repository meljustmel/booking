import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'first'
})
export class FirstPipe implements PipeTransform {
  transform(value: string, [separator]): string {
    const splits = value.split(separator);
    if (splits.length > 1) {
      return splits.shift();
    } else {
      return '';
    }
  }
}
