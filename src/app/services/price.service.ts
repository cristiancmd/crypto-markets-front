import { environment } from './../../environments/environment';
import { PriceModel } from './../models/price.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  url: string = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }


  getPricesFor(date: Date, coin: string, exchangeId:string): Observable<PriceModel[]> {

    return this.http.get<PriceModel[]>(
      `${this.url}/precios?filter[where][date][gt]=${date}&filter[where][coinId]=${coin}&filter[where][exchangeId]=${exchangeId}`)
  }
  addPrice(price: PriceModel): Observable<PriceModel> {
    return this.http.post(`${this.url}/precios`, price)
  }

  getPriceList(): Observable<PriceModel[]> {

    return this.http.get<PriceModel[]>(`${this.url}/precios`)
  }


  getPrice(id: string): Observable<PriceModel> {

    return this.http.get<PriceModel>(`${this.url}/precios/${id}`)
  }

  removePrice(id: string): Observable<PriceModel> {
    return this.http.delete<PriceModel>(`${this.url}/precios/${id}`)
  }
}
