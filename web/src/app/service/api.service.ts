import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// Headers
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Constants
  apiURL = '';
  protected httpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': '' // Token
    });
  }

  public getContactById(resourcetId) {
    return this.httpClient.get(`${this.apiURL}/path/${resourcetId}`, {headers: this.httpHeaders});
  }

}
