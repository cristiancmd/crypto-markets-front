import { UserService } from './../../services/user.service';
import { FavCoinsService } from './../../services/fav-coins.service';
import { Observable } from 'rxjs';
import { CoinService } from './../../services/coin.service';
import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CoinModel } from 'src/app/models/coin.model';
import { ToastrService } from 'ngx-toastr';
import { SecurityService } from 'src/app/services/security.service';
import { AuthService } from '@auth0/auth0-angular';
import { UserModel } from 'src/app/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit, OnDestroy {

  coinList: CoinModel[] = [];
  public favList: CoinModel[] = [];

  @Input() mycoins?:string;

  @ViewChild('confirm')
  confirm!: ElementRef;

  constructor(
    private _coinservice: CoinService,
    private toastr: ToastrService,
    private security: SecurityService,
    public auth: AuthService,
    private favcoins$: FavCoinsService,
    private user$: UserService,
    private modalService: NgbModal

  ) { }
  ngOnDestroy(): void {


  }

  ngOnInit(): void {
    this.getCoinList();
    this.auth.isAuthenticated$.subscribe(data=>
      {
        if(data){
          this.user$.getUserWithCoinList().subscribe({
            next: (data:UserModel) => {
              this.favList = data.usercoins || [];
              this.favcoins$.setCoins(this.favList);
              // this.getCoinList();
            }
          });
          this.favList = this.favcoins$.obtenerCoins();
          // console.log('coinlist : ', this.favList)
        }
      }

    )


  }



  includesCoin(coin: CoinModel): boolean {
    return this.favList.some(c => c.id == coin.id);
  }

  favoriteCoin(coin?: CoinModel) {
    if (coin && this.includesCoin(coin)) {
      // this.removeItem(this.favList, coin);
      this.user$.removeUserCoin(coin.id!).subscribe(
        { next: data => {
          this.favList = this.favList.filter(c => c.id != coin.id);
          this.favcoins$.setCoins(this.favList);
          this.toastr.success(`Moneda: ${coin.name} quitada de favoritas`);
        }

        }
      )

    } else
      if (coin) {
        this.user$.addUserCoin(coin).subscribe(
        { next: data => {
          this.favList.push(coin);
          this.favcoins$.setCoins(this.favList);
          this.toastr.success(`Moneda: ${coin.name} agregada a favoritas`)
        }} )

      }

  }

  ngOnchanges(): void {
    this.getCoinList();

  }

  isSession(): boolean {
    return this.security.isActiveSession();
  }

  clickMethod(name: string) {

    const alertmodal= this.modalService.open(this.confirm, { modalDialogClass: 'dark-modal' });
    alertmodal.result.then((eliminar) => {
      this.deleteCoin(name);
    },
      (cancelar) => {

      }
    )
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
