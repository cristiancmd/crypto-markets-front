import { PriceModel } from './../../models/price.model';
import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {



  @Input() datos:PriceModel[]=[]

  chart:any;

  constructor() {

   }

  ngOnInit(): void {
    // console.log('datos desde CoinDetail',this.datos);
    // const ctx = document.getElementById('coin_chart');



    if(this.chart ){
      this.chart.destroy();

    }

    this.chart = new Chart('coin_chart', {
      type: 'line',
      data: {

        datasets: [{
          label: 'Valor USD',
          data: this.datos,
          borderColor: 'rgb(255, 99, 132)'

        }]
      },
      options: {
        parsing: {
          xAxisKey:'date',
          yAxisKey:'value'
        },
        scales:{
          x:{
            type:'time',
            display: true,
            offset: true,
            time:{



            }
          }
        }

      }
    });

  }

  ngOnChanges() {




     this.ngOnInit();
    }




}
