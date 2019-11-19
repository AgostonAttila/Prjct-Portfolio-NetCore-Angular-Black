import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js';

@Component({
    selector: 'line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

    //@ViewChild('lineChart', { static: false }) private chartRef;

    @Input() id: string;
    @Input() dataarray: any[];
    @Input() labelarray: any[];
    @Input() label: string;
    @Input() gradientColor: string;

    public canvas: any;
    public ctx;
    //public gradient: any;
    public myChartData;

    innerId = this.id;

    ngOnInit() {
   
        this.canvas = document.getElementById('chartLineRed');
        this.ctx = this.canvas.getContext("2d"); //this.chartRef.nativeElement
        var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
        gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
        gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

        var data = {
            labels: this.labelarray,
            datasets: [{
                label: this.label,
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
                data: this.dataarray,
            }]
        };

        this.myChartData = new Chart(this.ctx , {
            type: 'line',
            data: data,
            options: this.gradient
        });
    }

    ngOnChanges(changes: SimpleChanges) {

        if (typeof changes['dataarray'] !== "undefined") {        
            var change = changes['dataarray'];          
            if (!change.isFirstChange()) {
                this.updateRedChart();            
            }
        }

        this.updateRedChart();
    }


    public updateRedChart() {
        this.myChartData.data.datasets[0].data = this.dataarray;
        this.myChartData.update();
    }



    gradient = {
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

}




  //constructor() { }

    //switch(gradientColor) { 
    //    case red: {
    //        this.gradient = {
    //            maintainAspectRatio: false,
    //            legend: {
    //                display: false
    //            },

    //            tooltips: {
    //                backgroundColor: '#f5f5f5',
    //                titleFontColor: '#333',
    //                bodyFontColor: '#666',
    //                bodySpacing: 4,
    //                xPadding: 12,
    //                mode: "nearest",
    //                intersect: 0,
    //                position: "nearest"
    //            },
    //            responsive: true,
    //            scales: {
    //                yAxes: [{
    //                    barPercentage: 1.6,
    //                    gridLines: {
    //                        drawBorder: false,
    //                        color: 'rgba(29,140,248,0.0)',
    //                        zeroLineColor: "transparent",
    //                    },
    //                    ticks: {
    //                        suggestedMin: 60,
    //                        suggestedMax: 125,
    //                        padding: 20,
    //                        fontColor: "#9a9a9a"
    //                    }
    //                }],

    //                xAxes: [{
    //                    barPercentage: 1.6,
    //                    gridLines: {
    //                        drawBorder: false,
    //                        color: 'rgba(233,32,16,0.1)',
    //                        zeroLineColor: "transparent",
    //                    },
    //                    ticks: {
    //                        padding: 20,
    //                        fontColor: "#9a9a9a"
    //                    }
    //                }]
    //            }
    //        };
    //        break;
    //    }     
    //    case orange: {
    //        this.gradient = {
    //            maintainAspectRatio: false,
    //            legend: {
    //                display: false
    //            },

    //            tooltips: {
    //                backgroundColor: '#f5f5f5',
    //                titleFontColor: '#333',
    //                bodyFontColor: '#666',
    //                bodySpacing: 4,
    //                xPadding: 12,
    //                mode: "nearest",
    //                intersect: 0,
    //                position: "nearest"
    //            },
    //            responsive: true,
    //            scales: {
    //                yAxes: [{
    //                    barPercentage: 1.6,
    //                    gridLines: {
    //                        drawBorder: false,
    //                        color: 'rgba(29,140,248,0.0)',
    //                        zeroLineColor: "transparent",
    //                    },
    //                    ticks: {
    //                        suggestedMin: 50,
    //                        suggestedMax: 110,
    //                        padding: 20,
    //                        fontColor: "#ff8a76"
    //                    }
    //                }],

    //                xAxes: [{
    //                    barPercentage: 1.6,
    //                    gridLines: {
    //                        drawBorder: false,
    //                        color: 'rgba(220,53,69,0.1)',
    //                        zeroLineColor: "transparent",
    //                    },
    //                    ticks: {
    //                        padding: 20,
    //                        fontColor: "#ff8a76"
    //                    }
    //                }]
    //            }
    //        };
    //        break;
    //    }
    //    case blue: {
    //        this.gradient = {
    //            maintainAspectRatio: false,
    //            legend: {
    //                display: false
    //            },

    //            tooltips: {
    //                backgroundColor: '#f5f5f5',
    //                titleFontColor: '#333',
    //                bodyFontColor: '#666',
    //                bodySpacing: 4,
    //                xPadding: 12,
    //                mode: "nearest",
    //                intersect: 0,
    //                position: "nearest"
    //            },
    //            responsive: true,
    //            scales: {
    //                yAxes: [{
    //                    barPercentage: 1.6,
    //                    gridLines: {
    //                        drawBorder: false,
    //                        color: 'rgba(29,140,248,0.0)',
    //                        zeroLineColor: "transparent",
    //                    },
    //                    ticks: {
    //                        suggestedMin: 60,
    //                        suggestedMax: 125,
    //                        padding: 20,
    //                        fontColor: "#2380f7"
    //                    }
    //                }],

    //                xAxes: [{
    //                    barPercentage: 1.6,
    //                    gridLines: {
    //                        drawBorder: false,
    //                        color: 'rgba(29,140,248,0.1)',
    //                        zeroLineColor: "transparent",
    //                    },
    //                    ticks: {
    //                        padding: 20,
    //                        fontColor: "#2380f7"
    //                    }
    //                }]
    //            }
    //        };
    //        break;
    //    }
    //    case purple: {
    //        this.gradient = {
    //            maintainAspectRatio: false,
    //            legend: {
    //                display: false
    //            },

    //            tooltips: {
    //                backgroundColor: '#f5f5f5',
    //                titleFontColor: '#333',
    //                bodyFontColor: '#666',
    //                bodySpacing: 4,
    //                xPadding: 12,
    //                mode: "nearest",
    //                intersect: 0,
    //                position: "nearest"
    //            },
    //            responsive: true,
    //            scales: {
    //                yAxes: [{
    //                    barPercentage: 1.6,
    //                    gridLines: {
    //                        drawBorder: false,
    //                        color: 'rgba(29,140,248,0.0)',
    //                        zeroLineColor: "transparent",
    //                    },
    //                    ticks: {
    //                        suggestedMin: 60,
    //                        suggestedMax: 125,
    //                        padding: 20,
    //                        fontColor: "#9a9a9a"
    //                    }
    //                }],

    //                xAxes: [{
    //                    barPercentage: 1.6,
    //                    gridLines: {
    //                        drawBorder: false,
    //                        color: 'rgba(225,78,202,0.1)',
    //                        zeroLineColor: "transparent",
    //                    },
    //                    ticks: {
    //                        padding: 20,
    //                        fontColor: "#9a9a9a"
    //                    }
    //                }]
    //            }
    //        };
    //        break;
    //    }
    //    case green: {
    //        this.gradient = {
    //            maintainAspectRatio: false,
    //            legend: {
    //                display: false
    //            },

    //            tooltips: {
    //                backgroundColor: '#f5f5f5',
    //                titleFontColor: '#333',
    //                bodyFontColor: '#666',
    //                bodySpacing: 4,
    //                xPadding: 12,
    //                mode: "nearest",
    //                intersect: 0,
    //                position: "nearest"
    //            },
    //            responsive: true,
    //            scales: {
    //                yAxes: [{
    //                    barPercentage: 1.6,
    //                    gridLines: {
    //                        drawBorder: false,
    //                        color: 'rgba(29,140,248,0.0)',
    //                        zeroLineColor: "transparent",
    //                    },
    //                    ticks: {
    //                        suggestedMin: 50,
    //                        suggestedMax: 125,
    //                        padding: 20,
    //                        fontColor: "#9e9e9e"
    //                    }
    //                }],

    //                xAxes: [{
    //                    barPercentage: 1.6,
    //                    gridLines: {
    //                        drawBorder: false,
    //                        color: 'rgba(0,242,195,0.1)',
    //                        zeroLineColor: "transparent",
    //                    },
    //                    ticks: {
    //                        padding: 20,
    //                        fontColor: "#9e9e9e"
    //                    }
    //                }]
    //            }
    //        };
    //        break;
    //    }
    //    case conf: {
    //        this.gradient = {
    //            maintainAspectRatio: false,
    //            legend: {
    //                display: false
    //            },

    //            tooltips: {
    //                backgroundColor: '#f5f5f5',
    //                titleFontColor: '#333',
    //                bodyFontColor: '#666',
    //                bodySpacing: 4,
    //                xPadding: 12,
    //                mode: "nearest",
    //                intersect: 0,
    //                position: "nearest"
    //            },
    //            responsive: true,
    //            scales: {
    //                yAxes: [{

    //                    gridLines: {
    //                        drawBorder: false,
    //                        color: 'rgba(29,140,248,0.1)',
    //                        zeroLineColor: "transparent",
    //                    },
    //                    ticks: {
    //                        suggestedMin: 60,
    //                        suggestedMax: 120,
    //                        padding: 20,
    //                        fontColor: "#9e9e9e"
    //                    }
    //                }],

    //                xAxes: [{

    //                    gridLines: {
    //                        drawBorder: false,
    //                        color: 'rgba(29,140,248,0.1)',
    //                        zeroLineColor: "transparent",
    //                    },
    //                    ticks: {
    //                        padding: 20,
    //                        fontColor: "#9e9e9e"
    //                    }
    //                }]
    //            }
    //        };
    //        break;
    //    } 
    //    default: {
    //        //statements; 
    //        break;
    //    }
