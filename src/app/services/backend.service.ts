import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Account} from '../classes/account';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  url: string;
  jwt: string;
  httpOptions: any;

  constructor(private http: HttpClient) {
  }

  init(url, jwt) {
    this.url = url;
    console.log('Connecting on', this.url);
    this.jwt = jwt;
    this.httpOptions = {
      headers: new HttpHeaders({
        'jwt': this.jwt
      })
    };
    console.log('Initiated backend service.');
  }


  get_update() {
    return this.http.get<Account[]>(this.url + '/update/', this.httpOptions);
  }

  add_account(summonerName: string, server: string) {
    return this.http.post(this.url + '/add_account/', JSON.stringify({
      summonerName: summonerName,
      server: server
    }), this.httpOptions);
  }

  remove_account(id: number) {
    return this.http.post(this.url + '/remove_account/', JSON.stringify({id: id}), this.httpOptions);
  }

}
