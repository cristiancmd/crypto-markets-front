import { CoinModel } from './../models/coin.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavCoinsService {
  items_key='fav-coins';
  constructor() { }

  obtenerCoins(){
    return JSON.parse(localStorage.getItem(this.items_key) || "[]" );

  }


  setCoins(coins: CoinModel[]){
    localStorage.setItem(this.items_key, JSON.stringify(coins));
  }

}
