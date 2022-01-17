import { CoinService } from './../../services/coin.service';
import { ExchangeModel } from './../../models/exchange.model';
import { Component, OnInit } from '@angular/core';
import { ExchangeService } from 'src/app/services/exchange.service';
import { CoinModel } from 'src/app/models/coin.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css']
})
export class ExchangesComponent implements OnInit {
  coinId?:string = '61ad3d9e35ce236717d7f5e7'
  selected?:string;
  exchangeList: ExchangeModel[] = [];
  coinList: CoinModel[] = [];

  constructor(
    private _exchangeService: ExchangeService,
    private _coinService: CoinService,
    private security: SecurityService
  ) { }

  ngOnInit(): void {
    this.getExchangeList();
    this.getCoinList();


  }

  isSession():boolean {
    return this.security.isActiveSession();
  }

  getExchangeList(){
    if(this.coinId)
      this._exchangeService.getExchangeListFor(this.coinId).subscribe({
        next: (data: ExchangeModel[]) => {
          this.exchangeList = data;
          console.log(this.exchangeList)
        }
    });
  }

  deleteExchange(id:string){
    this._exchangeService.removeExchange(id).subscribe({
      next: (data:any) => {
        console.log('eliminado ok ',data);
        this.ngOnInit();
      }
    }

    )
  }

  getCoinList(){
    this._coinService.getCoinList().subscribe({
      next: (data: CoinModel[]) => {
        this.coinList = data;
        this.selected = this.coinList[0].id
        this.coinId = this.selected
      }
    });
  }

  clickMethod(name: string) {
    if(confirm("Desea eliminar este exchange? ")) {
        this.deleteExchange(name);
    }
  }

  onSelectExchange(e:string){

    if (this.selected) {
      this.coinId = e;
      console.log(this.selected);
      this.getExchangeList();

    }
  }
}
