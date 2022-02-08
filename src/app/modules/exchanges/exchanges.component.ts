import { AuthService } from '@auth0/auth0-angular';
import { CoinService } from './../../services/coin.service';
import { ExchangeModel } from './../../models/exchange.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExchangeService } from 'src/app/services/exchange.service';
import { CoinModel } from 'src/app/models/coin.model';
import { SecurityService } from 'src/app/services/security.service';
import { NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css'],
  providers: [NgbAccordionConfig]
})
export class ExchangesComponent implements OnInit {
  coinId?:string ;
  selected?:string;
  exchangeList: ExchangeModel[] = [];
  coinList: CoinModel[] = [];
  @ViewChild('confirm')
  confirm!: ElementRef;

  constructor(
    private _exchangeService: ExchangeService,
    private _coinService: CoinService,
    private security: SecurityService,
    public auth: AuthService,
    private modalService: NgbModal,
    config: NgbAccordionConfig
  ) {
    config.closeOthers = true;
    // config.type = 'secondary';
   }

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


    const alertmodal= this.modalService.open(this.confirm, { modalDialogClass: 'dark-modal' });
    alertmodal.result.then((eliminar) => {
      this.deleteExchange(name);

    },
      (cancelar) => {

      }
    )
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
