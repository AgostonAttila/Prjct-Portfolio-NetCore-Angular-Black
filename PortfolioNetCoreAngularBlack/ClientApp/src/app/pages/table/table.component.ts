import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FundService } from '../../services/fund.service';
import { FileService } from '../../services/file.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  fundList: any;
  error: any;
  teststring: any;
  public message: string;
  public Files: string[];

  actualYear = (new Date()).getFullYear()

  constructor(private service: FundService, private fileService: FileService, private http: HttpClient) {
    service.getFundList().subscribe(
      res => {
        this.fundList = res         
      }, // success path
      error => { this.error = error, console.log('rossz'), console.log(this.error) } // error path
    );
  }

  ngOnInit() {
  } 


  getUpdatedFundList() {
    this.service.getUpdatedFundList().subscribe(
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

  upload(files) {
    this.fileService.upload(files, 'SourceText').subscribe(
      res => {
        this.message = res;
        console.log('jo');
        // getUpdatedFundList();
      },
      error => { console.log('rossz'); }
    );
  }

  download() {
    this.fileService.GetListOfFiles()
      .subscribe(data => this.Files = data,
        error => { },
        () => console.log('Get all completed'));
  }

}
