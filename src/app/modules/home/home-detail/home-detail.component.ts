import { Component, ViewChild } from '@angular/core';
import {
    ChartComponent,
    ApexChart,
    ApexAxisChartSeries,
    ApexTitleSubtitle,
    ApexDataLabels,
    ApexYAxis,
    ApexXAxis,
    ApexStroke,
    ApexLegend
} from 'ng-apexcharts';
import { series } from './series-date';


export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    labels: string[];
    legend: ApexLegend;
    subtitle: ApexTitleSubtitle;
  };

export interface PropsInterface {
    data: any;
  }

@Component({
    selector: 'home-detail',
    templateUrl: './home-detail.component.html',
    styleUrls: ['./home-detail.component.scss'],
    // encapsulation: ViewEncapsulation.None
})

export class HomeDetailComponent {
    @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
    /**
     * Constructor
     */
    constructor(
    ) {
        this.chartOptions = {
            series: [
              {
                name: 'People',
                data: series.monthDataSeries1.prices
              }
            ],
            chart: {
              type: 'area',
              height: 350,
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: 'Fundamental Analysis of Developer',
              align: 'left'
            },
            subtitle: {
              text: 'Movement of the number of People',
              align: 'left'
            },
            labels: series.monthDataSeries1.dates,
            xaxis: {
              type: 'datetime'
            },
            yaxis: {
              opposite: true
            },
            legend: {
              horizontalAlign: 'left'
            }
          };
        }
    }
