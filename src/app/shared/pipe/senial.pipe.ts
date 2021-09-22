import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'senial',
  pure: false
})
export class SenialPipe implements PipeTransform {

  transform(array: any, args?: any): unknown {
    return array.filter(d=>d.isDeleted===1);
  }


}
