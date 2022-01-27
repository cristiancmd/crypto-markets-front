import { AuthService } from '@auth0/auth0-angular';
import { CoinService } from './../../services/coin.service';
import { ExchangeModel } from './../../models/exchange.model';
import { Component, OnInit } from '@angular/core';
import { ExchangeService } from 'src/app/services/exchange.service';
import { CoinModel } from 'src/app/models/coin.model';
import { SecurityService } from 'src/app/services/security.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css']
})
export class ExchangesComponent implements OnInit {
  coinId?:string ;
  selected?:string;
  exchangeList: ExchangeModel[] = [];
  coinList: CoinModel[] = [];

  constructor(
    private _exchangeService: ExchangeService,
    private _coinService: CoinService,
    private security: SecurityService,
    public auth: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
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
        this.getExchangeList();
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

      this.getExchangeList();

    }
  }

  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
  }


}
