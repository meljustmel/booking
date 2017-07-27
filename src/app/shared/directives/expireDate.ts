import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expireDatePipe'
})
export class ExpireDatePipe implements PipeTransform {
  transform(expireDate: string): string {
    let dt=expireDate.replace(/\D/g, '').trim();
    if(dt.length >= 2) {
      dt = [dt.slice(0, 2), '/', dt.slice(2)].join('');
    }
    return dt;
  }
}
