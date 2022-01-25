import { environment } from './../../environments/environment';
import { CoinModel } from './../models/coin.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ExchangeModel } from '../models/exchange.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoinService {

  url:string = environment.API_URL;
  private refresh$ = new Subject<void>();


  constructor(
    private http: HttpClient
  ) { }

  get refresh(){
    return this.refresh$;
  }

getRelatedExchanges(id:string):Observable<ExchangeModel[]>{
  return this.http.get<ExchangeModel[]>(`${this.url}/coins/${id}/exchanges?filter[fields]=name&filter[fields]=id`)
}
//
addCoin(coin:CoinModel):Observable<CoinModel>{
  return this.http.post(`${this.url}/coins`, coin)
}

getCoinList():Observable<CoinModel[]> {

  return this.http.get<CoinModel[]>(`${this.url}/coins`)

}

getCoin(id:string):Observable<CoinModel> {

  return this.http.get<CoinModel>(`${this.url}/coins/${id}`)
}

removeCoin(id:string):Observable<CoinModel>{
  return this.http.delete<CoinModel>(`${this.url}/coins/${id}`)
}

}
