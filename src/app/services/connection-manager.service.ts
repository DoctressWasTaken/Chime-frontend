import {Injectable} from '@angular/core';
import {WebSocketService} from './web.socket.service';
import {Account} from '../classes/account';
import {throttleTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionManagerService {

  jwt_token: string;
  accounts: Account[];
  wins: number;
  losses: number;
  currentAccount: Account;
  locked: number;
  currentId: number;
  ready: Boolean;
  status: string;
  rank: string;

  constructor(
    private socket: WebSocketService
  ) {
    this.currentAccount = null;
    this.locked = null;
    this.wins = 0;
    this.losses = 0;
    this.rank = "Unranked"
    this.ready = false;
    console.log(this);

    this.socket.status.subscribe(evt => {
      if (evt === 'connected') {
        this.status = 'connected';
        this.authenticate();
      }
      if (evt === 'disconnected') {
        this.status = 'disconnected';
      }
    });
    this.socket.receiver.subscribe(message => {
      console.log('Manager received message', message);
      if (message['status'] === 'success') {
        this.ready = true;
      }
      if (message['status'] === 'score') {
        this.wins = message['wins'];
        this.losses = message['losses'];
        // For text width test purposes enable those lines
        //this.wins = 25;
        //this.losses = 25;

      }
      if (message['status'] === 'accounts') {
        this.accounts = message['accounts'];
        this.currentId = message['active'];
        this.locked = message['locked'];

        let lockedAccount;
        for (let account of this.accounts) {
          if (account.id === message['active']) {
            this.currentAccount = account;
          }
          if (account.id === message['locked']) {
            lockedAccount = account;
          }
        }
        if (lockedAccount) {
          this.currentAccount = lockedAccount;
        }
        this.rank = this.currentAccount.ranking.split(" ")[0];
      }

    });
  }

  authenticate() {
    this.socket.ws.send(JSON.stringify(
      {'task': 'auth', 'jwt': this.jwt_token}));
  }

  init(jwt: string) {
    console.log('Initiated');
    this.jwt_token = jwt;
    this.socket.connect();
  }

}
