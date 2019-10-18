import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
//import 'rxjs/add/operator/map';

@Injectable()
export class FileService {

  private readonly endpoint = '/api/File';

  constructor(private http: HttpClient) { }
   

  upload(files: any, folderName: string): Observable<string> {

    if (files.length === 0)
      return;   

    const formData = new FormData();

    for (const file of files) {
      formData.append(file.name, file);
    }

    const uploadReq = new HttpRequest('POST', 'api/File', formData);

    this.http.request(uploadReq).subscribe(event => {
      //if (event.type === HttpEventType.UploadProgress)
      //  this.progress = Math.round(100 * event.loaded / event.total);
      if (event.type === HttpEventType.Response)
        return event.body.toString();
    });
  
  }
  
   
  public GetListOfFiles = (): Observable<string[]> => {  

    //return this._http.get(this.fileExplorerUrl + "?access_token=" + token, {
    //}).map(res => res.json());

    return this.http.get<string[]>(this.endpoint); // + managementName, managementName
    
  }



}
