import { Router } from '@angular/router';
import { CoinService } from './../../services/coin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-coin-new',
  templateUrl: './coin-new.component.html',
  styleUrls: ['./coin-new.component.css']
})
export class CoinNewComponent implements OnInit {
  newCoin: FormGroup;
  submited = false;

  constructor(
    private form: FormBuilder,
    private _coinSvc: CoinService,
    private router: Router

  ) {
    this.newCoin= this.form.group({
      name: ['', Validators.required],
      symbol: ['', Validators.required],
      wikiUrl: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  addCoin(){
    this.submited= true
    if(this.newCoin.invalid){
      return;
    }
    const coin:any = {
      name: this.newCoin.value.name,
      symbol: this.newCoin.value.symbol,
      description: this.newCoin.value.description,
      wikiUrl: this.newCoin.value.wikiUrl
    }
    this._coinSvc.addCoin(coin).subscribe({
      next(data) {
        console.log('Agregado: ', data);


      },
      error(data) {
        console.log('Error : ', data);
      }
    });
    this.router.navigate(['/coins'])
  }

}
