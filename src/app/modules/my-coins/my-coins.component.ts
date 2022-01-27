import { UserModel } from './../../models/user.model';
import { UserService } from './../../services/user.service';

import { FavCoinsService } from './../../services/fav-coins.service';
import { Observable, Subscription } from 'rxjs';
import { CoinService } from './../../services/coin.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CoinModel } from 'src/app/models/coin.model';
import { ToastrService } from 'ngx-toastr';
import { SecurityService } from 'src/app/services/security.service';
import { AuthService } from '@auth0/auth0-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-coins',
  templateUrl: './my-coins.component.html',
  styleUrls: ['./my-coins.component.css']
})
export class MyCoinsComponent implements OnInit, OnDestroy {

  coinList: CoinModel[] = [];
  public favList:CoinModel[] = [];
  suscription?:Subscription;

  @Input() mycoins?:string;

  constructor(
    private service: CoinService,
    private toastr: ToastrService,
    private security: SecurityService,
    public auth: AuthService,
    private favcoins$: FavCoinsService,
    private modalService: NgbModal,
    private user$: UserService
  ) { }

/////////////////////
  selectedCar?: number;

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

  ngOnInit(): void {
    // this.getCoinList();
    this.user$.getUserWithCoinList().subscribe({
      next: (data:UserModel) => {
        this.favList = data.usercoins || [];
        console.log(data);
        this.coinList = data.usercoins || [];
        // this.getCoinList();
      }
    });


  }

  ngOnDestroy():void{
    this.suscription?.unsubscribe();
  }


  includesCoin(coin: CoinModel): boolean {
    return this.favList.some(c => c.id == coin.id);
  }

  // favoriteCoin(coin?: CoinModel) {
  //   if (coin && this.includesCoin(coin)) {
  //     // this.removeItem(this.favList, coin);
  //     this.favList = this.favList.filter(c => c.id != coin.id);
  //     this.toastr.success(`Moneda: ${coin.name} quitada de favoritas`);

  //   } else
  //     if (coin) {this.favList.push(coin)
  //       this.toastr.success(`Moneda: ${coin.name} agregada a favoritas`)
  //     }
  //   this.favcoins$.setCoins(this.favList);

  // }

  favoriteCoin(coin?: CoinModel) {
    if (coin && this.includesCoin(coin)) {
      this.user$.removeUserCoin(coin.id!).subscribe(
        { next: data => { console.log(data);
          this.favList = this.favList.filter(c => c.id != coin.id);
          this.toastr.success(`Moneda: ${coin.name} quitada de favoritas`);
        }

        }
      )

    } else
      if (coin) {
        this.user$.addUserCoin(coin).subscribe(
        { next: data => {console.log(data)
          this.favList.push(coin);
          this.toastr.success(`Moneda: ${coin.name} agregada a favoritas`)
        }} )

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


// getCoinList(){
//   this.coinList=this.favcoins$.obtenerCoins();
// }
  getCoinList() {
    this.service.getCoinList().subscribe({
      next: (data: CoinModel[]) => {
        this.coinList = data
        this.coinList = this.coinList.filter(c => this.favList.map(f => f.id).includes(c.id) );

      }
    });
  }

  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
  }


}
