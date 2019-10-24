import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { FundService } from '../../services/fund.service';
import { FileService } from '../../services/file.service';
import { HttpClient } from '@angular/common/http';

import { Fund } from '../../models/fund';

@Component({
    selector: "app-dashboard",
    templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
    public canvas: any;
    public ctx;
    public datasets: any;
    public data: any;
    public myChartData;
    public clicked: boolean = true;
    public clicked1: boolean = false;
    public clicked2: boolean = false;

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
    mainChartLabels = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];
    mainChartData =
        [
            [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
            [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
            [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
        ];
    mainChartLabelData = "My First dataset";


    labelChartPerf = ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    labelChartPerfData = "Data";
    dataPerfChart = [parseInt('100' || this.selectedFund.performanceActualMinus6), parseInt('100' || this.selectedFund.performanceActualMinus5), parseInt('100' || this.selectedFund.performanceActualMinus4), parseInt('100' || this.selectedFund.performanceActualMinus3), parseInt('100' || this.selectedFund.performanceActualMinus2), parseInt('100' || this.selectedFund.performanceActualMinus1)];
    labelChartVolatility = ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'];
    labelChartVolatilityData = "My First dataset";
    dataVolatilityChart = [90, 27, 60, 12, 80];
    labelChartSharpeLabel = ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'];
    labelChartSharpeLabelData = "Countries";
    dataSharpeChart = [53, 20, 10, 80, 100, 45];


    constructor(private service: FundService, private fileService: FileService, private http: HttpClient) {
        service.getFundList().subscribe(
            res => {
                this.fundList = res,
                    this.dataPerfChart = [parseInt(this.fundList[0].performanceActualMinus5), parseInt(this.fundList[0].performanceActualMinus5), parseInt(this.fundList[0].performanceActualMinus5), parseInt(this.fundList[0].performanceActualMinus5), parseInt(this.fundList[0].performanceActualMinus5), parseInt(this.fundList[0].performanceActualMinus5)];
            }, // success path
            error => { this.error = error, console.log('rossz'), console.log(this.error) } // error path
        );
    }

    getUpdatedFundList() {
        this.service.updateFundList().subscribe(
            res => {
                this.fundList = res,
                    console.log('jo'),
                    console.log(this.fundList)
            }, // success path
            error => { this.error = error, console.log('rossz'), console.log(this.error) } // error path
        );
    }

    seedFundList() {
        this.service.seedFundList().subscribe(
            res => {
                this.fundList = res,
                    console.log('jo'),
                    console.log(this.fundList)
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
                this.teststring = res,
                    console.log('jo'),
                    console.log(this.teststring);
            }, // success path
            error => { this.error = error, console.log('rossz'), console.log(this.error), console.log(this.teststring); } // error path
        );
    }


    ngOnInit() {
        var gradientChartOptionsConfigurationWithTooltipBlue: any = {
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

        var gradientChartOptionsConfigurationWithTooltipPurple: any = {
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

        var gradientChartOptionsConfigurationWithTooltipRed: any = {
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

        var gradientChartOptionsConfigurationWithTooltipOrange: any = {
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

        var gradientChartOptionsConfigurationWithTooltipGreen: any = {
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

        var gradientBarChartConfiguration: any = {
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

        this.barBlue(gradientBarChartConfiguration);
        this.lineGreen(gradientChartOptionsConfigurationWithTooltipGreen);
        this.lineRed(gradientChartOptionsConfigurationWithTooltipRed);
        this.bigLineRed(gradientChartOptionsConfigurationWithTooltipRed);
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

        var myChart = new Chart(this.ctx, {
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

        var myChart = new Chart(this.ctx, {
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


        var myChart = new Chart(this.ctx, {
            type: 'bar',
            responsive: true,
            legend: {
                display: false
            },
            data: {
                labels: this.labelChartSharpeLabel,
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
        var chart_labels = this.mainChartLabels;
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
                labels: chart_labels,
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
        this.myChartData = new Chart(this.ctx, config);
    }

    public updateOptions() {
        this.myChartData.data.datasets[0].data = this.data;
        this.myChartData.update();
    }

    public changeSelectedFund(fund: Fund) {
        var cgh: any = {
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


        //this.selectedFund = fund;
        var monthlyPerformanceArray = [];
        var monthlyTitleArray = [];
        for (var i = 0; i < fund.monthlyPerformanceList.length; i++) {
            for (var j = 0; j < fund.monthlyPerformanceList[i].performanceListByMonth.length; j++) {
                monthlyPerformanceArray.push(+fund.monthlyPerformanceList[i].performanceListByMonth[j]);
                if (j == 0)
                    monthlyTitleArray.push(fund.monthlyPerformanceList[i].year);
                else
                    monthlyTitleArray.push('');
            }
        }

        this.mainChartData =
            [
                monthlyTitleArray,
                monthlyTitleArray,
                monthlyTitleArray
            ];

        this.mainChartLabels = monthlyTitleArray;

        this.bigLineRed(cgh);


        this.dataPerfChart = [parseInt(fund.performanceActualMinus6) || 100, parseInt(fund.performanceActualMinus5) || 100, parseInt(fund.performanceActualMinus4) || 100, parseInt(fund.performanceActualMinus3) || 100, parseInt(fund.performanceActualMinus2) || 100, parseInt(fund.performanceActualMinus1) || 100];
        this.lineRed(cgh);
        this.fundlabel = fund.name + ' ( ' + fund.isinNumber + ' )';
        this.performanceSum = parseInt(fund.performanceActualMinus6) + parseInt(fund.performanceActualMinus5) + parseInt(fund.performanceActualMinus4) + parseInt(fund.performanceActualMinus3) + parseInt(fund.performanceActualMinus2) + parseInt(fund.performanceActualMinus1);
    }   

}
