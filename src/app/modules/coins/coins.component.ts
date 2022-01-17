import { CoinService } from './../../services/coin.service';
import { Component, OnInit } from '@angular/core';
import { CoinModel } from 'src/app/models/coin.model';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {

  coinList: CoinModel[] = [];
  constructor(
    private service: CoinService
  ) { }

  ngOnInit(): void {
    this.getCoinList();
  }

  ngOnchanges(): void {
    this.getCoinList();
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
      }
    }

    )
  }

}
