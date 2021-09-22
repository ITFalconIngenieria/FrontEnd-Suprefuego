import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MotorService {

  private apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }
  // MOTOR
  getMotor() { return this.http.get(this.apiURL + 'motor?estado=1&tipo=[1,2]') }
  // BOMBA PRINCIPAL
  getMain() { return this.http.get(this.apiURL + 'motor?estado=1&tipo=[3]') }
  // BOMBA JOCKEY
  getJockey() { return this.http.get(this.apiURL + 'motor?estado=1&tipo=[4]') }
  // GENERAL
  dataDelete(body) { return this.http.patch(this.apiURL + 'motor', { 'queryParams': body }) }
  dataPost(body) { return this.http.post(this.apiURL + 'motor', { 'queryParams': body }) }
  dataPut(body) { return this.http.put(this.apiURL + 'motor', { 'queryParams': body }) }
}
