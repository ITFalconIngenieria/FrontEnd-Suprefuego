import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SenialService {

  private apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  // SENIAL
  dataGet() { return this.http.get(this.apiURL + 'senial?isDeleted=1') }
  dataPost(body) { return this.http.post(this.apiURL + 'senial', { 'queryParams': body }) }
  dataPut(body) { return this.http.put(this.apiURL + 'senial', { 'queryParams': body }) }
  dataDelete(body) { return this.http.patch(this.apiURL + 'senial', { 'queryParams': body }) }

  /*
    getJockey() { return this.http.get(this.apiURL + 'motor?estado=1&tipo=[4]') }
  // GENERAL
  dataDelete(body) { return this.http.patch(this.apiURL + 'motor', { 'queryParams': body }) }
  dataPost(body) { return this.http.post(this.apiURL + 'motor', { 'queryParams': body }) }
  dataPut(body) { return this.http.put(this.apiURL + 'motor', { 'queryParams': body }) }
  */
}
