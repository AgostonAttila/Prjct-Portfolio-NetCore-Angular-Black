import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FundService } from '../../services/fund.service';
import { HttpClient } from '@angular/common/http';
import { Fund } from '../../models/fund';
import Chart from 'chart.js';


import * as Highcharts from 'highcharts/highstock';




@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

    fundList: any;
    error: any;
    selectedFund1: Fund;
    selectedFund2: Fund;

    public canvas: any;
    public ctx;
    public myChart;


    monthMainChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUL', 'JUN', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    data = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3];
    max = 10;
    min = -10;
      

    constructor(private service: FundService, private http: HttpClient) {
        service.getFundList().subscribe(
            res => {
                this.fundList = res
            }, // success path
            error => { this.error = error, console.log('rossz'), console.log(this.error) } // error path
        );
    }


    ngOnInit() {
        this.lineRed(this.gradientChartOptionsConfigurationWithTooltipRed);               
    }


    rowSelected1(isinNumber: string) {
        this.selectedFund1 = this.fundList.find(x => x.isinNumber === isinNumber);
        this.updateOptions();
    }

    rowSelected2(isinNumber: string) {
        this.selectedFund2 = this.fundList.find(x => x.isinNumber === isinNumber);
        this.updateOptions();
    }



    public barBlue(gradientBarChartConfiguration) {
        this.canvas = document.getElementById("myChart");
        this.ctx = this.canvas.getContext("2d");
        var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
        gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
        gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


        this.myChart = new Chart(this.ctx, {
            type: 'bar',
            responsive: true,
            legend: {
                display: false
            },
            data: {
                labels: this.monthMainChartLabels,
                datasets: [{
                    label: 'Data',
                    fill: true,
                    backgroundColor: gradientStroke,
                    hoverBackgroundColor: gradientStroke,
                    borderColor: '#1f8ef1',
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    data: this.data,
                }
                ]
            },
            options: gradientBarChartConfiguration
        });
    }

    public lineRed(gradientBarChartConfiguration) {
        this.canvas = document.getElementById("myChart");
        this.ctx = this.canvas.getContext("2d");

        var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
        gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
        gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

        var data = {
            labels: this.monthMainChartLabels,
            datasets: [{
                label: 'Data',
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: '#ec250d',
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: '#ec250d',
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: '#ec250d',
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: this.data,
            },
            {
                label: 'Data',
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: '#ec250d',
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: '#ec250d',
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: '#ec250d',
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: this.data,
            }]
        };

        this.myChart = new Chart(this.ctx, {
            type: 'line',
            data: data,
            options: gradientBarChartConfiguration
        });
    }

    public updateOptions() {

        let emptyArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        if (this.selectedFund2 !== undefined && this.selectedFund1 != undefined) {

            let monthly1 = this.selectedFund1.monthlyPerformanceList;
            let monthly2 = this.selectedFund2.monthlyPerformanceList;

            let minYear = Math.min.apply(Math, [monthly1[0].year, monthly2[0].year]);
            let maxYear = Math.max.apply(Math, [monthly1[monthly1.length - 1].year, monthly2[monthly2.length - 1].year]);

            let mainChartLabels = [];
            for (var i = minYear; i < maxYear; i++)
                mainChartLabels = mainChartLabels.concat(this.monthMainChartLabels)
            // this.mainChartLabels.push(i.toString())

            let data1 = [];
            let data2 = [];

            for (var i = minYear; i < maxYear; i++) {
                let element = monthly1.find(x => x.year === i.toString());
                if (element !== undefined)
                    data1 = data1.concat(element.performanceListByMonth)
                else
                    data1 = data1.concat(emptyArray)

                let element2 = monthly2.find(x => x.year === i.toString());
                if (element2 !== undefined)
                    data2 = data2.concat(element2.performanceListByMonth)
                else
                    data2 = data2.concat(emptyArray)
            }

            this.myChart.data.datasets[0].data = data1;
            this.myChart.data.datasets[1].data = data2;
            this.myChart.options.scales.yAxes[0].ticks.suggestedMin = Math.max.apply(Math, data1);
            this.myChart.options.scales.yAxes[0].ticks.suggestedMax = Math.min.apply(Math, data1);
            this.myChart.data.labels = mainChartLabels;
            this.myChart.update();
        }
    }







    gradientChartOptionsConfigurationWithTooltipRed: any = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },

        tooltips: {
            backgroundColor: '#f5f5f5',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest"
        },
        responsive: true,
        scales: {
            yAxes: [{
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.0)',
                    zeroLineColor: "transparent",
                },
                ticks: {
                    suggestedMin: this.min,
                    suggestedMax: this.max,
                    padding: 1,
                    fontColor: "#9a9a9a"
                }
            }],

            xAxes: [{
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: 'rgba(233,32,16,0.1)',
                    zeroLineColor: "transparent",
                },
                ticks: {
                    padding: 20,
                    fontColor: "#9a9a9a"
                }
            }]
        }
    };



  

}
