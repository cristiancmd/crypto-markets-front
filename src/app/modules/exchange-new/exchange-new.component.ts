import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import 'codemirror/mode/javascript/javascript';

@Component({
  selector: 'app-exchange-new',
  templateUrl: './exchange-new.component.html',
  styleUrls: ['./exchange-new.component.css']
})
export class ExchangeNewComponent implements OnInit {

  newExchange: FormGroup;
  submited = false;
  id: string | null;
  public javascriptinitvar:string = "var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; \n //escriba su script de obtención de precio aqui"
  scriptval?:number;

  @ViewChild('content')
  content!: ElementRef;

  @ViewChild('content2')
  content2!: ElementRef;

  @ViewChild('script')
  inputScript!: ElementRef;

  constructor(
    private form: FormBuilder,
    private exchangeSvc: ExchangeService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService,
    private user$: UserService,
    private modalService: NgbModal

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

    if(this.javascriptinitvar.length==0 ) return;

    this.user$.testScript(this.javascriptinitvar).subscribe(data=>{
      if(data==0) {
        this.modalService.open(this.content, { modalDialogClass: 'dark-modal' });
        return;
      }else{
        this.addExchangeSubmit();

      }
    })
  }


  addExchangeSubmit(){
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
    this.toastr.success('Exchange agregado');
    this.router.navigate(['/exchanges'])
   .then(() => {
      // window.location.reload();
   })
  }



  test(script:string){

    this.user$.testScript(script).subscribe(data=>{
      this.scriptval=data;
      if(data==0){
        this.modalService.open(this.content, { modalDialogClass: 'dark-modal' });
      }else{
        this.modalService.open(this.content2, { modalDialogClass: 'dark-modal' });
      }


    })

  }








}
