import { CoinService } from './../../services/coin.service';
import { Component, OnInit } from '@angular/core';
import { CoinModel } from 'src/app/models/coin.model';
import { ToastrService } from 'ngx-toastr';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {

  coinList: CoinModel[] = [];
  constructor(
    private service: CoinService,
    private toastr: ToastrService,
    private security: SecurityService
  ) { }

  ngOnInit(): void {
    this.getCoinList();

      console.log(this.security.isActiveSession())
  }


  ngOnchanges(): void {
    this.getCoinList();
    console.log(this.security.isActiveSession())
  }

  isSession():boolean {
    return this.security.isActiveSession();
  }

  clickMethod(name: string) {
    if(confirm("Desea eliminar esta moneda? ")) {
      this.deleteCoin(name);

    }
  }

  getCoinList(){
    this.service.getCoinList().subscribe({
      next: (data: CoinModel[]) => {
        this.coinList = data;

      }
    });
  }

  deleteCoin(id:string){
    this.service.removeCoin(id).subscribe({
      next: (data:any) => {
        console.log('eliminado ok',data);
        this.ngOnInit();
        this.toastr.success('Moneda eliminada')
      }
    }

    )
  }

}
