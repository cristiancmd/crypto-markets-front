import { ExchangeService } from 'src/app/services/exchange.service';
import { ExchangeModel } from './../../models/exchange.model';
import { PriceService } from './../../services/price.service';
import { PriceModel } from './../../models/price.model';
import { CoinModel } from 'src/app/models/coin.model';
import { CoinService } from './../../services/coin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css']
})
export class CoinDetailComponent implements OnInit {

  id: string | null;
  coin: CoinModel = {}
  prices: PriceModel[] = []
  exchanges: ExchangeModel[] = []
  selectedExchange: ExchangeModel = {}
  selected: string | undefined;
  last: number = 1;
  ranges: any = [
    { id: 0, name: "30 minutos", value: 0.5 },
    { id: 1, name: "1 hora", value: 1 },
    { id: 2, name: "3 horas", value: 3 },
    { id: 3, name: "6 horas", value: 6 },
    { id: 4, name: "12 horas", value: 12 },
    { id: 5, name: "1 dia", value: 24 },
    { id: 6, name: "3 dias", value: 72 },
    { id: 7, name: "7 dias", value: 168 },
    { id: 8, name: "30 dias", value: 720 },
    { id: 9, name: "90 dias", value: 2160 },
    { id: 10, name: "desde siempre", value: 999999 }
  ]


  constructor(
    private _coinService: CoinService,
    private _priceService: PriceService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private form: FormBuilder,
    private _exchangeService: ExchangeService
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');


  }

  ngOnInit(): void {
    this.getCoin();
    this.getExchanges();
    this.getPriceList();


  }

  onSelectExchange(e: string): void {
    if (this.id !== null) {
      this.selected = e;
      this.getPriceList();

    }
  }
  onSelectRange(e: number): void {
    if (this.id !== null) {
      this.last = e;
      // console.log('numero es  ', this.last);
      this.getPriceList();

    }
  }

  getCoin() {
    if (this.id !== null) {
      this._coinService.getCoin(this.id).subscribe({
        next: (data: CoinModel) => {
          this.coin = data;
        }
      });
    }
  }

  // getExchanges() {
  //   if (this.id !== null) {
  //     this._coinService.getRelatedExchanges(this.id).subscribe({
  //       next: (data: ExchangeModel[]) => {
  //         this.exchanges = data;
  //         console.log('exchanges', this.exchanges);
  //         if (!this.selectedExchange.id) {
  //           this.selectedExchange = this.exchanges[0];
  //           this.selected = this.selectedExchange.id;
  //         }

  //         this.getPriceList();
  //       }
  //     });
  //   }
  // }
  getExchanges() {
    if (this.id !== null) {
      this._exchangeService.getExchangeInfoForCoin(this.id).subscribe({
        next: (data: ExchangeModel[]) => {
          this.exchanges = data;
          if (!this.selectedExchange.id) {
            this.selectedExchange = this.exchanges[0];
            this.selected = this.selectedExchange.id;
          }

          this.getPriceList();
        }
      });
    }
  }

  getPriceList() {
    let date = new Date(Date.now() - (this.last * 3600000));


    if (this.id !== null && this.selected !== undefined) {
      this._priceService.getPricesFor(date, this.id, this.selected).subscribe({
        next: (data: PriceModel[]) => {
          this.prices = data;
          // console.log(data)


        }
      })
    }
  }



}



