import { FavCoinsService } from './../../services/fav-coins.service';
import { Observable } from 'rxjs';
import { CoinService } from './../../services/coin.service';
import { Component, Input, OnInit } from '@angular/core';
import { CoinModel } from 'src/app/models/coin.model';
import { ToastrService } from 'ngx-toastr';
import { SecurityService } from 'src/app/services/security.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {

  coinList: CoinModel[] = [];
  public favList: CoinModel[] = [];

  @Input() mycoins?:string;

  constructor(
    private service: CoinService,
    private toastr: ToastrService,
    private security: SecurityService,
    public auth: AuthService,
    private favcoins$: FavCoinsService
  ) { }

  ngOnInit(): void {
    this.getCoinList();
    this.favList = this.favcoins$.obtenerCoins();
    console.log('coinlist : ', this.favList)

  }



  includesCoin(coin: CoinModel): boolean {
    return this.favList.some(c => c.id == coin.id);
  }

  favoriteCoin(coin?: CoinModel) {
    if (coin && this.includesCoin(coin)) {
      // this.removeItem(this.favList, coin);
      this.favList = this.favList.filter(c => c.id != coin.id);
      this.toastr.success(`Moneda: ${coin.name} quitada de favoritas`)
    } else
      if (coin) {this.favList.push(coin)
        this.toastr.success(`Moneda: ${coin.name} agregada a favoritas`)
      }
    this.favcoins$.setCoins(this.favList);
    console.log(this.favList);
  }

  ngOnchanges(): void {
    this.getCoinList();

  }

  isSession(): boolean {
    return this.security.isActiveSession();
  }

  clickMethod(name: string) {
    if (confirm("Desea eliminar esta moneda? ")) {
      this.deleteCoin(name);

    }
  }

  getCoinList() {
    this.service.getCoinList().subscribe({
      next: (data: CoinModel[]) => {
        this.coinList = data;

      }
    });
  }

  deleteCoin(id: string) {
    this.service.removeCoin(id).subscribe({
      next: (data: any) => {
        console.log('eliminado ok', data);
        let coin = this.favList.find(c => c.id==id);
        // this.removeItem(this.favList, coin! );
        this.favList = this.favList.filter(c => c.id != coin?.id)
        this.favcoins$.setCoins(this.favList);
        this.ngOnInit();
        this.toastr.success('Moneda eliminada')
      }
    }

    )
  }

}
