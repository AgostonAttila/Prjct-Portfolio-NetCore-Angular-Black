import { Component, OnInit } from '@angular/core';
import { FundService } from '../../services/fund.service';
import { HttpClient } from '@angular/common/http';
import { Fund } from '../../models/fund';

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

    fundList: any;
    error: any;
    selectedFund: Fund;

    constructor(private service: FundService, private http: HttpClient) {
        service.getFundList().subscribe(
            res => {
                this.fundList = res,
                this.selectedFund = this.fundList[0]
            }, // success path
            error => { this.error = error, console.log('rossz'), console.log(this.error) } // error path
        );
    }

    ngOnInit() {
    }

    rowSelected(isinNumber: string) {
        this.selectedFund = this.fundList.find(x => x.isinNumber === isinNumber);     
    }

}
