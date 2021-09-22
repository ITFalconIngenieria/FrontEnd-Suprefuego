import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tmotor',
  pure: false
})
export class TmotorPipe implements PipeTransform {

  transform(array: any, args?: any): unknown {
    return array.filter(d=>d.tipo===args);
  }

}

