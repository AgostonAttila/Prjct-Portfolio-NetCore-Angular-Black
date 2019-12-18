import { Component } from '@angular/core';
import { FundService } from '../../services/fund.service';
import { HttpClient } from '@angular/common/http';
import { Fund } from '../../models/fund';

import * as Highcharts from 'highcharts';



import StockModule from 'highcharts/modules/stock';
//import MapModule from 'highcharts/modules/map';
//import GanttModule from 'highcharts/modules/gantt';
import ExportingModule from 'highcharts/modules/exporting';

StockModule(Highcharts);
//MapModule(Highcharts);
//GanttModule(Highcharts);
ExportingModule(Highcharts);

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.scss']
})
export class CompareComponent {

    fundList: any;
    error: any;
    selectedFund1: Fund;
    selectedFund2: Fund;

    constructor(private service: FundService, private http: HttpClient) {
        service.getFundList().subscribe(
            res => {
                this.fundList = res;
                this.updateFund();
            }, // success path
            error => { this.error = error, console.log('rossz'), console.log(this.error) } // error path
        );
    }

    Highcharts: typeof Highcharts = Highcharts; // Highcharts, it's Highcharts   
    updateDemo2: boolean = false;
    usedIndex: number = 0;
    chartTitle: string = 'Compare'; // for init - change through titleChange   
    charts = undefined;




    rowSelected1(isinNumber: string) {
        this.selectedFund1 = this.fundList.find(x => x.isinNumber === isinNumber);
        this.updateOptions();
    }

    rowSelected2(isinNumber: string) {
        this.selectedFund2 = this.fundList.find(x => x.isinNumber === isinNumber);
        this.updateOptions();
    }

    updateFund() {
        //class="table-active"
        if (this.fundList !== undefined) {
            this.selectedFund1 = this.fundList[0];
            this.selectedFund2 = this.fundList[1];
            this.updateOptions();
        }
    }

    public updateOptions() {

        let zeroArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let nullArray = [null, null, null, null, null, null, null, null, null, null, null, null];

        if (this.selectedFund2 !== undefined && this.selectedFund1 != undefined) {

            let monthly1 = this.selectedFund1.monthlyPerformanceList;
            let monthly2 = this.selectedFund2.monthlyPerformanceList;

            let minYear = Math.min.apply(Math, [monthly1[0].year, monthly2[0].year]);
            let maxYear = Math.max.apply(Math, [monthly1[monthly1.length - 1].year, monthly2[monthly2.length - 1].year]);

            //let mainChartLabels = [];
            //for (var i = minYear; i < maxYear; i++)
            //    mainChartLabels = mainChartLabels.concat(this.monthMainChartLabels)       

            let data1 = [];
            let data2 = [];

            //Concat monthly vectors
            for (var i = minYear; i < maxYear; i++) {
                let element = monthly1.find(x => x.year === i.toString());
                if (element !== undefined)
                    data1 = data1.concat(element.performanceListByMonth)
                else
                    data1 = data1.concat(nullArray)

                let element2 = monthly2.find(x => x.year === i.toString());
                if (element2 !== undefined)
                    data2 = data2.concat(element2.performanceListByMonth)
                else
                    data2 = data2.concat(nullArray)
            }

            ////Replace nulls
            //for (var k = 0; k < data1.length; k++) {
            //    if (data1[k] === null) data1[k] = 1;
            //    if (data2[k] === null) data2[k] = 1;
            //}

            //Calculate cummulated matrix
            for (var k = 1; k < data1.length; k++) {

                if (data1[k - 1] === null)
                    data1[k - 1] = 1;

                if (data2[k - 1] === null)
                    data2[k - 1] = 1;

                data1[k] = data1[k - 1] * (1 + data1[k] / 100);

                data2[k] = data2[k - 1] * (1 + data2[k] / 100);
            }

            //Convert to chart format
            let startYear = minYear;
            let month = 1;
            var withDateData1 = [];
            var withDateData2 = [];

            for (var k = 0; k < data1.length; k++) {

                withDateData1.push([Date.UTC(startYear, month, 1), Math.round(data1[k] * 100) / 100]);
                withDateData2.push([Date.UTC(startYear, month, 1), Math.round(data2[k] * 100) / 100]);

                //withDateData1.push([Math.round(new Date(startYear.toString() + "/" + month + "/01 01:01:00").getTime() / 1000), data1[k]]);
                //withDateData2.push([Math.round(new Date(startYear.toString() + "/" + month + "/01 01:01:00").getTime() / 1000), data2[k]]);

                if (month === 12) { startYear++; month = 0 };

                month++;
            }

            this.charts = [{
                hcOptions: {
                    title: { text: this.chartTitle },
                    //subtitle: { text: '1st data set' },
                    //plotOptions: {
                    //    series: {
                    //        pointStart: Math.round(new Date(minYear.toString() + "/01/01 01:01:00").getTime() / 1000),
                    //        pointInterval: 86400000 * 30 // 1 day
                    //    }
                    //},
                    series: [
                        {
                            type: 'line',
                            name: this.selectedFund1.isinNumber,
                            data: withDateData1,
                            //threshold: 5,
                            //negativeColor: 'red',
                            //events: {
                            //    dblclick: function () {
                            //        console.log('dblclick - thanks to the Custom Events plugin');
                            //    }
                            //}
                        },
                        {
                            type: 'line',
                            data: withDateData2,
                            name: this.selectedFund2.isinNumber,
                        }

                    ]
                } as Highcharts.Options,
                hcCallback: (chart: Highcharts.Chart) => { console.log('some variables: ', Highcharts, chart, this.charts); }
            }];
        }
    }

}
