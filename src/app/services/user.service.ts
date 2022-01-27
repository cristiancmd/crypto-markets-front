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
    console.log(usercoin);
    return this.http.post(`${this.url}/user-coins`, usercoin)
  }

  getUserWithCoinList(): Observable<UserModel> {


    return this.http.get<UserModel>(`${this.url}/current-user?filter[include][]=usercoins&filter[fields][password]=false`)



  }



  removeUserCoin(id: string): Observable<UserCoinModel> {
    return this.http.delete<UserCoinModel>(`${this.url}/current-user-coins/${id}`)
  }









}
