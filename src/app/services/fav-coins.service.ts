import { UserModel } from './../models/user.model';
import { UserService } from './user.service';
import { CoinModel } from './../models/coin.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavCoinsService {
  items_key='fav-coins';
  private coinList: CoinModel[] = [];

  constructor(
    private _user$: UserService
  ) { }

  obtenerCoins():CoinModel[]{


    return JSON.parse(localStorage.getItem(this.items_key) || "[]" );

  }



  setCoins(coins: CoinModel[]){
    localStorage.setItem(this.items_key, JSON.stringify(coins));
  }

}
