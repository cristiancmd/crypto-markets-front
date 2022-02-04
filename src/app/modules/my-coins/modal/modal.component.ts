import { ToastrService } from 'ngx-toastr';
import { UserCoinModel } from './../../../models/usercoin.model';
import { UserService } from './../../../services/user.service';
import { CoinModel } from './../../../models/coin.model';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  userForm: FormGroup;
  coin? : CoinModel;
  submited= false;
  selected?: number;
  ucoin?:UserCoinModel;
  loading=false;

    options = [
        { id: 1, name: 'MENOR A' },
        { id: 2, name: 'MAYOR A' }
    ];

  constructor(public modal: NgbActiveModal,
    private user$: UserService,
    private form: FormBuilder,
    private toastr: ToastrService
    ) {



      this.userForm= this.form.group({
        precio: ['', Validators.required],
        options: ['', Validators.required],

      })

    }

  ngOnInit(): void {
    console.log(this.coin);

  }

  onSelectOptions(op:number){
    this.selected = op;

  }

  submit(){
    this.submited =true;
    this.loading=true;
    if(this.selected==1){
      this.ucoin = {
        coinId: this.coin?.id,
        min: this.userForm.value.precio
      }
    }
    if(this.selected==2){
      this.ucoin = {
        coinId: this.coin?.id,
        max: this.userForm.value.precio
      }
    }

    if((this.ucoin?.max || this.ucoin?.min)  ){
      console.log('enviando info..', this.ucoin);
      this.user$.addMaxOrMinToCoin(this.ucoin).subscribe({
        next: (data)=> {console.log(data)
          this.modal.close();
          this.loading=false;
          this.toastr.success(`Alerta para ${this.coin?.name} agregada`);
        },
        error: (err)=> {console.log(err)
          this.toastr.error(`Ocurrio un error`);
          this.loading=false;

        }
      },
      )

    }else{
      console.log('No coin');
      this.loading=false;


    }





  }
}
