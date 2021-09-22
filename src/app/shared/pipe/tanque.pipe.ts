import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tanque',
  pure: false
})
export class TanquePipe implements PipeTransform {

  transform(array: any, args?: any): unknown {
    return array.filter(d=>d.isDeleted===1);
  }
}
