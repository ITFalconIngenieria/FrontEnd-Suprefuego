import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getHisLectura(fechai: number, fechaf: number, tagname: string, intervalo: number) {    
    console.log(
      '/histdata'
      + '?fechai=' + fechai
      + '&fechaf=' + fechaf
      + '&intervalo=' + intervalo
      + '&variable=' + tagname
      + '&lectura=2'
    );
    return this.http.get(this.apiURL + '/histdata'
      + '?fechai=' + fechai
      + '&fechaf=' + fechaf
      + '&intervalo=' + intervalo
      + '&variable=' + tagname
      + '&lectura=2');
  }
}