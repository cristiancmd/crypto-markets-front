import { SpinnerService } from './../../services/spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="overlay" *ngIf="isLoading | async ">
  <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  </div> `,

  styleUrls: ['./spinner.component.css'],

})
export class SpinnerComponent implements OnInit {
  isLoading = this.spinnerService.isLoading;

  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
  }

}
