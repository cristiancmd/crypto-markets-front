import { UserService } from './../../services/user.service';
import { FavCoinsService } from './../../services/fav-coins.service';
import { Observable } from 'rxjs';
import { CoinService } from './../../services/coin.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CoinModel } from 'src/app/models/coin.model';
import { ToastrService } from 'ngx-toastr';
import { SecurityService } from 'src/app/services/security.service';
import { AuthService } from '@auth0/auth0-angular';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit, OnDestroy {

  coinList: CoinModel[] = [];
  public favList: CoinModel[] = [];

  @Input() mycoins?:string;

  constructor(
    private _coinservice: CoinService,
    private toastr: ToastrService,
    private security: SecurityService,
    public auth: AuthService,
    private favcoins$: FavCoinsService,
    private user$: UserService
  ) { }
  ngOnDestroy(): void {


  }

  ngOnInit(): void {
    this.getCoinList();
    this.user$.getUserWithCoinList().subscribe({
      next: (data:UserModel) => {
        this.favList = data.usercoins || [];
        this.favcoins$.setCoins(this.favList);
        console.log(data);

        // this.getCoinList();
      }
    });
    this.favList = this.favcoins$.obtenerCoins();
    console.log('coinlist : ', this.favList)

  }



  includesCoin(coin: CoinModel): boolean {
    return this.favList.some(c => c.id == coin.id);
  }

  favoriteCoin(coin?: CoinModel) {
    if (coin && this.includesCoin(coin)) {
      // this.removeItem(this.favList, coin);
      this.user$.removeUserCoin(coin.id!).subscribe(
        { next: data => { console.log(data);
          this.favList = this.favList.filter(c => c.id != coin.id);
          this.favcoins$.setCoins(this.favList);
          this.toastr.success(`Moneda: ${coin.name} quitada de favoritas`);
        }

        }
      )

    } else
      if (coin) {
        this.user$.addUserCoin(coin).subscribe(
        { next: data => {console.log(data)
          this.favList.push(coin);
          this.favcoins$.setCoins(this.favList);
          this.toastr.success(`Moneda: ${coin.name} agregada a favoritas`)
        }} )

      }

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
    this._coinservice.getCoinList().subscribe({
      next: (data: CoinModel[]) => {
        this.coinList = data;

      }
    });
  }

  deleteCoin(id: string) {
    this._coinservice.removeCoin(id).subscribe({
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
