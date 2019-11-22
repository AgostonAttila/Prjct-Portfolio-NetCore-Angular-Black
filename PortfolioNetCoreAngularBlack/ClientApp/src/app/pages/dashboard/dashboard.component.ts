import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import Chart from 'chart.js';
import { FundService } from '../../services/fund.service';
import { FileService } from '../../services/file.service';
import { HttpClient } from '@angular/common/http';

import { Fund } from '../../models/fund';

@Component({
    selector: "app-dashboard",
    templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit  {

    @Output() changeDataChartEmit = new EventEmitter<{}>()

    public canvas: any;
    public ctx;

    public clicked: boolean = true;
    public clicked1: boolean = false;
    public clicked2: boolean = false;

    public first = new Date().getFullYear();
    public second = this.first - 1;
    public third = this.first - 2;

    public datasets: any;
    public data: any;
    public myChartDataBigRed;

    public myChartDataGreen;
    public myChartDataBlue;
    public myChartDataRed;

    selectedFund: Fund;

    volatilitySum = 100;
    performanceSum = 100;
    sharpeSum = 100;
    fundlabel = 'Fund title';

    //services
    fundList: Fund[];
    error: any;
    teststring: any;
    public message: string;
    public Files: string[];

    actualYear = (new Date()).getFullYear()

    //charts
    max = 10;
    min = -10;

    mainChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUL', 'JUN', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    ////this.mainChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUL', 'JUN', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    //mainChartLabels = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];
    mainChartData =
        [
            [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
            [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
            [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
        ];



    labelChartPerf = ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    labelChartVolatility = this.labelChartPerf;
    labelChartSharpe = this.labelChartPerf;

    labelChartPerfData = "Value";
    labelChartVolatilityData = this.labelChartPerfData;
    labelChartSharpeLabelData = this.labelChartPerfData;
    mainChartLabelData = this.labelChartPerfData;

    dataPerfChart = [parseInt('100' || this.selectedFund.performanceActualMinus6), parseInt('100' || this.selectedFund.performanceActualMinus5), parseInt('100' || this.selectedFund.performanceActualMinus4), parseInt('100' || this.selectedFund.performanceActualMinus3), parseInt('100' || this.selectedFund.performanceActualMinus2), parseInt('100' || this.selectedFund.performanceActualMinus1)];
    dataVolatilityChart = this.dataPerfChart;
    dataSharpeChart = this.dataPerfChart;


    constructor(private service: FundService, private fileService: FileService, private http: HttpClient) {
        service.getFundList().subscribe(
            res => {
                this.fundList = res;
                this.updateFund();
            }, // success path
            error => { this.error = error, console.log('rossz'), console.log(this.error) } // error path
        );       
    }

    ngOnInit()
    {              
        this.barBlue(this.gradientBarChartConfiguration);
        this.lineGreen(this.gradientChartOptionsConfigurationWithTooltipGreen);
        this.lineRed(this.gradientChartOptionsConfigurationWithTooltipRed);
        this.bigLineRed(this.gradientChartOptionsConfigurationWithTooltipRed);
    }

    updateFund()
    {
        //class="table-active"
        if (this.fundList !== undefined) {
            this.selectedFund = this.fundList[0];
            this.changeSelectedFund(this.selectedFund)
        }
    }

    getUpdatedFundList() {
        this.service.updateFundList().subscribe(
            res => {
                this.fundList = res
            }, // success path
            error => { this.error = error, console.log('rossz'), console.log(this.error) } // error path
        );
    }

    seedFundList() {
        this.service.seedFundList().subscribe(
            res => {
                this.fundList = res
            }, // success path
            error => { this.error = error, console.log('rossz'), console.log(this.error) } // error path
        );
    }

    deleteFundList() {
        this.service.deleteFundList().subscribe(
            res => {
                this.fundList = res
            }, // success path
            error => { this.error = error, console.log('rossz'), console.log(this.error) } // error path
        );
    }

    getExcelFundList() {
        this.service.getExcelFundList().subscribe(
            res => { console.log(res) },
            error => { this.error = error, console.log('rossz'), console.log(this.error) } // error path
        );
    }

    test() {
        this.service.getTest().subscribe(
            res => {
                this.teststring = res
            }, // success path
            error => { this.error = error, console.log('rossz'), console.log(this.error), console.log(this.teststring); } // error path
        );
    }





    public lineRed(gradientChartOptionsConfigurationWithTooltipRed) {
        this.canvas = document.getElementById("chartLineRed");
        this.ctx = this.canvas.getContext("2d");

        var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
        gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
        gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

        var data = {
            labels: this.labelChartPerf,
            datasets: [{
                label: this.labelChartPerfData,
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
                data: this.dataPerfChart,
            }]
        };

        this.myChartDataRed = new Chart(this.ctx, {
            type: 'line',
            data: data,
            options: gradientChartOptionsConfigurationWithTooltipRed
        });
    }

    public lineGreen(gradientChartOptionsConfigurationWithTooltipGreen) {
        this.canvas = document.getElementById("chartLineGreen");
        this.ctx = this.canvas.getContext("2d");


        var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
        gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
        gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

        var data = {
            labels: this.labelChartVolatility,
            datasets: [{
                label: this.labelChartVolatilityData,
                fill: true,
                backgroundColor: gradientStroke,
                borderColor: '#00d6b4',
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: '#00d6b4',
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: '#00d6b4',
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: this.dataVolatilityChart,
            }]
        };

        this.myChartDataGreen = new Chart(this.ctx, {
            type: 'line',
            data: data,
            options: gradientChartOptionsConfigurationWithTooltipGreen

        });
    }

    public barBlue(gradientBarChartConfiguration) {
        this.canvas = document.getElementById("CountryChart");
        this.ctx = this.canvas.getContext("2d");
        var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
        gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
        gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


        this.myChartDataBlue = new Chart(this.ctx, {
            type: 'bar',
            responsive: true,
            legend: {
                display: false
            },
            data: {
                labels: this.labelChartSharpe,
                datasets: [{
                    label: this.labelChartSharpeLabelData,
                    fill: true,
                    backgroundColor: gradientStroke,
                    hoverBackgroundColor: gradientStroke,
                    borderColor: '#1f8ef1',
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    data: this.dataSharpeChart,
                }]
            },
            options: gradientBarChartConfiguration
        });
    }

    public bigLineRed(gradientChartOptionsConfigurationWithTooltipRed) {
        //var chart_labels = this.mainChartLabels;
        this.datasets = this.mainChartData;
        this.data = this.datasets[0];



        this.canvas = document.getElementById("chartBig1");
        this.ctx = this.canvas.getContext("2d");

        var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
        gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
        gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

        var config = {
            type: 'line',
            data: {
                labels: this.mainChartLabels,//var chart_labels 
                datasets: [{
                    label: this.mainChartLabelData,
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
            },
            options: gradientChartOptionsConfigurationWithTooltipRed
        };
        this.myChartDataBigRed = new Chart(this.ctx, config);
    }

    public updateOptions() {
        this.myChartDataBigRed.data.datasets[0].data = this.data;
        this.myChartDataBigRed.options.scales.yAxes[0].ticks.suggestedMin = Math.max.apply(Math, this.data);
        this.myChartDataBigRed.options.scales.yAxes[0].ticks.suggestedMax = Math.min.apply(Math, this.data);
        //this.myChartDataBigRed.data.labels = this.label;
        this.myChartDataBigRed.update();
    }

    public updateRedChart() {
        this.myChartDataRed.data.datasets[0].data = this.dataPerfChart;
        this.myChartDataRed.options.scales.yAxes[0].ticks.suggestedMin = Math.max.apply(Math, this.dataPerfChart);
        this.myChartDataRed.options.scales.yAxes[0].ticks.suggestedMax = Math.min.apply(Math, this.dataPerfChart);
        this.myChartDataRed.update();
    }

    public updateGreenChart() {
        this.myChartDataGreen.data.datasets[0].data = this.dataSharpeChart;
        this.myChartDataGreen.options.scales.yAxes[0].ticks.suggestedMin = Math.max.apply(Math, this.dataSharpeChart);
        this.myChartDataGreen.options.scales.yAxes[0].ticks.suggestedMax = Math.min.apply(Math, this.dataSharpeChart);
        this.myChartDataGreen.update();
    }

    public updateBlueChart() {
        this.myChartDataBlue.data.datasets[0].data = this.dataVolatilityChart;
        this.myChartDataBlue.options.scales.yAxes[0].ticks.suggestedMin = Math.max.apply(Math, this.dataVolatilityChart);
        this.myChartDataBlue.options.scales.yAxes[0].ticks.suggestedMax = Math.min.apply(Math, this.dataVolatilityChart);
        this.myChartDataBlue.update();
    }


    public changeSelectedFund(fund: Fund) {

        this.selectedFund = fund;
        this.changeDataChartEmit.emit(this.selectedFund);

        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        //this.array = [];
        //this.label = [];

        //fund.monthlyPerformanceList.forEach(function (item) {
        //    this.array.concat(item.performanceListByMonth);
        //    this.label.concat(this.mainChartLabels);
        //});

        //BIG CHART


        this.mainChartData =
            [
                fund.monthlyPerformanceList[fund.monthlyPerformanceList.length - 1].performanceListByMonth,
                fund.monthlyPerformanceList[fund.monthlyPerformanceList.length - 2].performanceListByMonth,
                fund.monthlyPerformanceList[fund.monthlyPerformanceList.length - 3].performanceListByMonth
            ];
        this.data = fund.monthlyPerformanceList[fund.monthlyPerformanceList.length - 1].performanceListByMonth;
        this.fundlabel = fund.name + ' ( ' + fund.isinNumber + ' )';
        this.updateOptions();

        //SUM RED    
        this.dataPerfChart = fund.monthlyPerformanceList[fund.monthlyPerformanceList.length - 1].performanceListByMonth.slice(Math.max(12 - 5, 1));
        this.performanceSum = Math.round(this.dataPerfChart.reduce(reducer) * 100) / 100;
        this.updateRedChart();

        //VOLATILITY BLUE     
        this.dataVolatilityChart = fund.volatilityArray.map(x => parseInt(x));
        this.volatilitySum = Math.round(this.dataVolatilityChart.reduce(reducer) * 100) / 100;
        this.updateBlueChart();

        //SHARPE GREEN
        this.dataSharpeChart = fund.sharpRateArray.map(x => parseInt(x));
        this.sharpeSum = Math.round(this.dataSharpeChart.reduce(reducer) * 100) / 100;
        this.updateGreenChart();

    }



    gradientChartOptionsConfigurationWithTooltipBlue: any = {
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
                    suggestedMin: 60,
                    suggestedMax: 125,
                    padding: 20,
                    fontColor: "#2380f7"
                }
            }],

            xAxes: [{
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.1)',
                    zeroLineColor: "transparent",
                },
                ticks: {
                    padding: 20,
                    fontColor: "#2380f7"
                }
            }]
        }
    };

    gradientChartOptionsConfigurationWithTooltipPurple: any = {
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
                    suggestedMin: 60,
                    suggestedMax: 125,
                    padding: 20,
                    fontColor: "#9a9a9a"
                }
            }],

            xAxes: [{
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: 'rgba(225,78,202,0.1)',
                    zeroLineColor: "transparent",
                },
                ticks: {
                    padding: 20,
                    fontColor: "#9a9a9a"
                }
            }]
        }
    };

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

    gradientChartOptionsConfigurationWithTooltipOrange: any = {
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
                    suggestedMin: 50,
                    suggestedMax: 110,
                    padding: 20,
                    fontColor: "#ff8a76"
                }
            }],

            xAxes: [{
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: 'rgba(220,53,69,0.1)',
                    zeroLineColor: "transparent",
                },
                ticks: {
                    padding: 20,
                    fontColor: "#ff8a76"
                }
            }]
        }
    };

    gradientChartOptionsConfigurationWithTooltipGreen: any = {
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
                    suggestedMin: 50,
                    suggestedMax: 125,
                    padding: 20,
                    fontColor: "#9e9e9e"
                }
            }],

            xAxes: [{
                barPercentage: 1.6,
                gridLines: {
                    drawBorder: false,
                    color: 'rgba(0,242,195,0.1)',
                    zeroLineColor: "transparent",
                },
                ticks: {
                    padding: 20,
                    fontColor: "#9e9e9e"
                }
            }]
        }
    };

    gradientBarChartConfiguration: any = {
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

                gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.1)',
                    zeroLineColor: "transparent",
                },
                ticks: {
                    suggestedMin: 60,
                    suggestedMax: 120,
                    padding: 20,
                    fontColor: "#9e9e9e"
                }
            }],

            xAxes: [{

                gridLines: {
                    drawBorder: false,
                    color: 'rgba(29,140,248,0.1)',
                    zeroLineColor: "transparent",
                },
                ticks: {
                    padding: 20,
                    fontColor: "#9e9e9e"
                }
            }]
        }
    };

}
