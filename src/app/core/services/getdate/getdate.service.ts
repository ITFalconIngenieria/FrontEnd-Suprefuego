import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GetdateService {

  constructor() { }

  getDate(dateOption: string, countDate: number) {
    let date: any;
    switch (dateOption) {
      case 'day':
        date = this.getDailyDate(countDate);
        break;

      case 'month':
        date = this.getMonthlyDate(countDate);
        break;

      case 'year':
        date = this.getYearlyDate(countDate);
        break;
    }
    return date;
  }

  getDailyDate(countDate: number) {
    console.log( moment().subtract((1 + countDate), 'day').startOf('day').toISOString() );
    console.log( moment().subtract(countDate, 'day').startOf('day').add(1, 'hour').toISOString() );
    const fechaInicio = new Date(moment().subtract((1 + countDate), 'day').startOf('day').toISOString()).getTime();
    const fechaFin = new Date(moment().subtract(countDate, 'day').startOf('day').add(1, 'hour').toISOString()).getTime();
    const textDate = moment().subtract((1 + countDate), 'day').startOf('day').format('dddd, MMMM Do YYYY');
    const intervalo = 1;
    return { fechaInicio, fechaFin, intervalo, textDate };
  }

  getMonthlyDate(countDate: number) {
    // console.log( moment().subtract(( 1 + countDate), 'month').startOf('month').toISOString() );
    // console.log( moment().subtract(countDate, 'month').startOf('month').toISOString()  );
    const fechaInicio = new Date(moment().subtract((1 + countDate), 'month').startOf('month').toISOString()).getTime();
    const fechaFin = new Date(moment().subtract(countDate, 'month').startOf('month').add(1, 'hour').toISOString()).getTime();
    const textDate = moment().subtract((1 + countDate), 'month').startOf('month').format('MMMM');
    const intervalo = 2;
    return { fechaInicio, fechaFin, intervalo, textDate };
  }

  getYearlyDate(countDate: number) {
    // console.log( moment().subtract(( 1 + countDate), 'year').startOf('year').toISOString() );
    // console.log( moment().subtract(countDate, 'year').startOf('year').toISOString()  );
    const fechaInicio = new Date(moment().subtract((1 + countDate), 'year').startOf('year').toISOString()).getTime();
    const fechaFin = new Date(moment().subtract(countDate, 'year').startOf('year').add(1, 'hour').toISOString()).getTime();
    const intervalo = 3;
    return { fechaInicio, fechaFin, intervalo };
  }

}
