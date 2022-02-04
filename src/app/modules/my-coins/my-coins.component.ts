import { SpinnerService } from './../../services/spinner.service';
import { UserCoinModel } from './../../models/usercoin.model';
import { ModalComponent } from './modal/modal.component';
import { UserModel } from './../../models/user.model';
import { UserService } from './../../services/user.service';

import { FavCoinsService } from './../../services/fav-coins.service';
import { Observable, pipe, Subscription } from 'rxjs';
import { CoinService } from './../../services/coin.service';
import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Pipe, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { CoinModel } from 'src/app/models/coin.model';
import { ToastrService } from 'ngx-toastr';
import { SecurityService } from 'src/app/services/security.service';
import { AuthService } from '@auth0/auth0-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './modal/modal-active-alert.component';

@Component({
  selector: 'app-my-coins',
  templateUrl: './my-coins.component.html',
  styleUrls: ['./my-coins.component.css']
})
export class MyCoinsComponent implements OnInit, OnDestroy {

  coinList: CoinModel[] = [];
  public favList: CoinModel[] = [];
  suscription?: Subscription;
  alertCoinList: UserCoinModel[]=[];
  loading=true;

  @Input() mycoins?: string;
  @ViewChild('content')
  content!: ElementRef;



  // @ViewChild(TemplateRef, { static: true })
  // content!: TemplateRef<any>;

  constructor(
    private _coinService: CoinService,
    private toastr: ToastrService,
    private security: SecurityService,
    public auth: AuthService,
    private favcoins$: FavCoinsService,
    private modalService: NgbModal,
    private user$: UserService
  ) { }



  ngOnInit(): void {
    // this.getCoinList();

    this.loading=true;
    this.user$.getUserWithCoinList().subscribe({
      next: (data: UserModel) => {
        this.favList = data.usercoins || [];
        console.log(data);
        this.coinList = data.usercoins || [];
        // this.getCoinList();
        this.loading =false;

      }
    });

    this.user$.getAllUserCoins().subscribe(ucoins=>
      { this.alertCoinList = ucoins ;
        console.log('alertcoinList:   ',this.alertCoinList);
      }).closed




  }



  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }


  includesCoin(coin: CoinModel): boolean {
    return this.favList.some(c => c.id == coin.id);
  }

  includesAlertCoin(coin: CoinModel){
    return this.alertCoinList.some(uc => uc.coinId == coin.id );
  }

  // includesNotifiedCoin(coin: CoinModel){
  //   return this.alertCoinList.some(uc => uc.coinId == coin.id && uc.notified==true);
  // }


  favoriteCoin(coin?: CoinModel) {
    if (coin && this.includesCoin(coin)) {
      this.user$.removeUserCoin(coin.id!).subscribe(
        {
          next: data => {
            console.log(data);
            this.favList = this.favList.filter(c => c.id != coin.id);
            this.toastr.success(`Moneda: ${coin.name} quitada de favoritas`);
          }

        }
      )

    } else
      if (coin) {
        this.user$.addUserCoin(coin).subscribe(
          {
            next: data => {
              console.log(data)
              this.favList.push(coin);
              this.toastr.success(`Moneda: ${coin.name} agregada a favoritas`)
            }
          })

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



  getCoinList() {
    this._coinService.getCoinList().subscribe({
      next: (data: CoinModel[]) => {
        this.coinList = data
        this.coinList = this.coinList.filter(c => this.favList.map(f => f.id).includes(c.id));

      }
    });
  }


  openModal(coin: CoinModel) {
    this.user$.getUserCoinsFor(coin.id!).subscribe(
      {
        next: data => {
          console.log(data)
          if (!data || !data.length) {
            this.openCreationForm(coin);

          } else {
            console.log('alerta existe');
            // const alertmodal = this.modalService.open(NgbdModalContent, { centered: true })
            const alertmodal = this.modalService.open(NgbdModalContent, { centered: true });
            alertmodal.componentInstance.ucoin = data[0];
            alertmodal.componentInstance.coin = coin;
            console.log(data);
            alertmodal.result.then((eliminar) => {
              this.removeAlert(data[0])
              this.toastr.success('Alerta eliminada');
              this.user$.getAllUserCoins().subscribe(ucoins=>
                { this.alertCoinList = ucoins   })
            },

              (cancelar) => {
                console.log();
              }
            )
          }
        }
      })
  }



  openCreationForm(coin: CoinModel) {
    const modref = this.modalService.open(ModalComponent, { centered: true });
    modref.componentInstance.coin = coin;
    modref.result.then((guardar) => {
      console.log('alerta guardada');
      this.user$.getAllUserCoins().subscribe(ucoins=>
        { this.alertCoinList = ucoins})
    },
      (cancelar) => {
        console.log('cancelado');
      }

    )
  }


  removeAlert(ucoin: UserCoinModel) {
    this.user$.removeAlertFrom(ucoin).subscribe({
      next(data) {
        console.log('Agregado: ', data);

      },
      error(data) {
        console.log('Error : ', data);
      }
    })
  }





}










