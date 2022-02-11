import { PriceModel } from './../../models/price.model';
import { Component, Input, OnInit } from '@angular/core';
import Chart, { TimeUnit } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {


  @Input() datos: PriceModel[] = []

  chart: any;
  unit: TimeUnit = 'minute';
  @Input() barras?: string;;

  thick:number = 18;

  constructor() {

  }

  ngOnInit(): void {



    if (this.chart) {
      this.chart.destroy();
    }

    let size = this.datos.length;

    if (size > 120) {
      this.unit = 'hour'
      this.thick = 5
    }

    if (size > 200) {
      this.unit = 'day'
      this.thick = 1
    }

    if (size < 120) {
      this.unit = 'minute'
      this.thick = 10
    }


    if (this.barras == 'bar') {
      this.barChart();
    } else {
      if (this.barras == 'line')
        this.lineChart();
    }


  }

  lineChart() {

    if (this.chart) {
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
          xAxisKey: 'date',
          yAxisKey: 'value'
        },
        scales: {
          x: {
            type: 'time',
            display: true,
            offset: true,
            time: {
              displayFormats: {

              },
              unit: this.unit


            }
          }
        }

      }
    });


  }

  barChart() {

    if (this.chart) {
      this.chart.destroy();
    }

    const getMinY = () => {
      const val = this.datos.reduce((min, p) => p.value! < min! ? p.value : min, this.datos[0].value);
      return val!
    }

    this.chart = new Chart('coin_chart', {
      type: 'bar',
      data: {

        datasets: [{
          label: 'Valor USD',
          data: this.datos,
          borderColor: 'rgb(153, 102, 255)',
          borderWidth: 1,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          barThickness: this.thick


        }]
      },
      options: {
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'value'
        },
        scales: {


          x: {
            type: 'time',
            display: true,
            offset: false,
            time: {
              unit: this.unit



            },

          },
          y: {
            min: getMinY()

          },

        },
        elements:{
          bar:{

          }
        }

      }
    });
  }









  ngOnChanges() {




    this.ngOnInit();
  }




}
