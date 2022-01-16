import { ExchangeService } from 'src/app/services/exchange.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exchange-new',
  templateUrl: './exchange-new.component.html',
  styleUrls: ['./exchange-new.component.css']
})
export class ExchangeNewComponent implements OnInit {

  newExchange: FormGroup;
  submited = false;
  id: string | null;

  constructor(
    private form: FormBuilder,
    private exchangeSvc: ExchangeService,
    private router: Router,
    private aRoute: ActivatedRoute

  ) {

    this.newExchange= this.form.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      script: ['', Validators.required]

    })

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

  addExchange(){
    this.submited= true
    if(this.newExchange.invalid){
      return;
    }
    const exch:any = {
      name: this.newExchange.value.name,
      url: this.newExchange.value.url,
      script: this.newExchange.value.script,
      coinId: this.id

    }
    this.exchangeSvc.addExchange(exch).subscribe({
      next(data) {
        console.log('Agregado: ', data);
      },
      error(data) {
        console.log('Error : ', data);
      }
    });
    // this.router.navigate(['/exchanges'])

    this.router.navigate(['/exchanges'])
   .then(() => {
      window.location.reload();
   });
  }

  ngOnChanges() {


  }

}
