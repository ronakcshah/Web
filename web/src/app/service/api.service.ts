import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public getUser(): Observable<string> {
    return this.httpClient.get(`${this.apiURL}/user`, {responseType: 'text'});
  }

  public postData(body: string): Observable<string> {
    return this.httpClient.post(`${this.apiURL}/data`, body, {
      headers: {'Content-Type': 'text/plain'},
      responseType: 'text'
    });
  }

  public getContactById(resourceId: string) {
    return this.httpClient.get(`${this.apiURL}/path/${resourceId}`);
  }

}
