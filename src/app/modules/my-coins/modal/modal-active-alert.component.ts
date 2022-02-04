import { UserCoinModel } from './../../../models/usercoin.model';
import { CoinModel } from './../../../models/coin.model';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'ngbd-modal-content',

  styles: [` .modal-body , .modal-header , .modal-footer {
  background-color: #515557;
    color: white;
  }
  .dark-modal .close {
    color: white;
  }
  .light-blue-backdrop {
    background-color: #5cb3fd;
  }
  `],

  template: `

        <div class="modal-header">
      <h4 class="modal-title">{{this.coin?.name}}</h4>
      <button type="button" class="btn btn-outline-light" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p *ngIf="this.ucoin?.max" >Ya posee una alerta para maximo: $ {{this.ucoin?.max }} </p>
      <p *ngIf="this.ucoin?.min" >Ya posee una alerta para minimo: $ {{this.ucoin?.min}} </p>

      <p >Elimine la alerta antes de crear otra. </p>


    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-light" (click)="activeModal.dismiss('Close click')">Cancelar</button>
      <button type="button" class="btn btn-outline-danger" (click)="activeModal.close('Close click')">Eliminar</button>

    </div>

    `

})


export class NgbdModalContent implements OnInit {
  @Input() ucoin?: UserCoinModel;
  @Input() coin?: CoinModel;

  coinmax?: number;
  coinmin?: number;
  constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {


  }
  ngOnInit(): void {

  }



  open(mensaje: string) {

  }



}
