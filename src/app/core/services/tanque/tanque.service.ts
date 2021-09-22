import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TanqueService {

  private apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  dataGet() { return this.http.get(this.apiURL + 'tanque?isDeleted=1') }
  dataPost(body) { return this.http.post(this.apiURL + 'tanque', { 'queryParams': body }) }
  dataPut(body) { return this.http.put(this.apiURL + 'tanque', { 'queryParams': body }) }
  dataDelete(body) { return this.http.patch(this.apiURL + 'tanque', { 'queryParams': body }) }
}
