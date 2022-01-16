import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeModel } from '../models/exchange.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {




  url:string = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }



addExchange(exchange:ExchangeModel):Observable<ExchangeModel>{
  return this.http.post(`${this.url}/exchanges`, exchange)
}

getExchangeList():Observable<ExchangeModel[]> {

  return this.http.get<ExchangeModel[]>(`${this.url}/exchanges`)
}
getExchangeListFor(id:string):Observable<ExchangeModel[]> {

  return this.http.get<ExchangeModel[]>(`${this.url}/coins/${id}/exchanges`)
}

getExchange(id:string):Observable<ExchangeModel> {

  return this.http.get<ExchangeModel>(`${this.url}/exchanges/${id}`)
}

removeExchange(id:string):Observable<ExchangeModel>{
  return this.http.delete<ExchangeModel>(`${this.url}/exchanges/${id}`)
}
}
