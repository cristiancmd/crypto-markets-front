import { CoinModel } from './../models/coin.model';
import { UserModel } from './../models/user.model';
import { UserCoinModel } from './../models/usercoin.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  url: string = environment.API_URL;

  constructor(
    private http: HttpClient

  ) {

  }


  addUserCoin(userCoinId: CoinModel): Observable<UserCoinModel> {
    let usercoin = new UserCoinModel;
    usercoin.coinId = userCoinId.id;
    return this.http.post(`${this.url}/user-coins`, usercoin)
  }

  addMaxOrMinToCoin(userCoin: UserCoinModel): Observable<UserCoinModel> {
    return this.http.patch(`${this.url}/current-user-coins/${userCoin.coinId}`, userCoin)
  }

  getUserCoinsFor(coinid: string): Observable<UserCoinModel[]> {
    return this.http.get<UserCoinModel[]>(`${this.url}/my-coins?filter[where][notified]=false&filter[where][coinId]=${coinid}`)

  }

  getUserWithCoinList(): Observable<UserModel> {


    return this.http.get<UserModel>(`${this.url}/current-user?filter[include][]=usercoins&filter[fields][password]=false`)



  }

  getAllUserCoins():Observable<UserCoinModel[]>{

    return this.http.get<UserCoinModel[]>(`${this.url}/my-coins?filter[where][notified]=false`)
  }
  // return this.http.get<UserCoinModel[]>(`${this.url}/my-coins?filter[where][notified]=false`)



  removeAlertFrom(userCoin: UserCoinModel): Observable<UserCoinModel> {
    let newUserCoin = new UserCoinModel;
    newUserCoin.coinId = userCoin.coinId;
    newUserCoin.userId = userCoin.userId;
    newUserCoin.email = userCoin.email;

    return this.http.put(`${this.url}/user-coins/${userCoin.id}`, newUserCoin)
  }

  removeUserCoin(id: string): Observable<UserCoinModel> {
    return this.http.delete<UserCoinModel>(`${this.url}/current-user-coins/${id}`)
  }



  getPaymentLink():Observable<any>{
    return this.http.get<any>(`${this.url}/payment`)

  }


  testScript(script:any):Observable<any>{
    return this.http.post(`${this.url}/test`,script);

  }



}
