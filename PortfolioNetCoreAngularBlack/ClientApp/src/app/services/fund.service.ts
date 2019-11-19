import { Injectable, Inject } from '@angular/core';
import { Fund } from '../models/fund';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { Http } from '@angular/http';


@Injectable()
export class FundService {

    private readonly endpoint = '/api/Fund';

    //private baseURLAndEndpoint = '';
    // @Inject('BASE_URL') private baseUrl: string
    // http://localhost:56476

    constructor(private http: HttpClient) { }


    getFund(isinNumber: string): Observable<Fund> {
        return this.http.post<Fund>(this.endpoint + '/GetFund/' + isinNumber, isinNumber);
    }

    getFundList(): Observable<Fund[]> {
        return this.http.get<Fund[]>(this.endpoint + '/GetFundList');
    }

    seedFundList(): Observable<Fund[]> {
        return this.http.get<Fund[]>(this.endpoint + '/SeedFundList');
    }

    updateFundList(): Observable<Fund[]> {
        return this.http.get<Fund[]>(this.endpoint + '/UpdateFundList');
    }

   deleteFundList(): Observable<Fund[]> {
       return this.http.get<Fund[]>(this.endpoint + '/RemoveAllFund');
    }

    getExcelFundList(): Observable<string> {
        return this.http.get<string>(this.endpoint + '/GenerateExcelFundList');
    }

    getTest(): Observable<Fund> {
        return this.http.get<Fund>(this.endpoint + '/Test');
    }


}
