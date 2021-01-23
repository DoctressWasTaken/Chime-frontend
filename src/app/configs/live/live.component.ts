import {Component, Input, OnInit} from '@angular/core';
import {WebSocketService} from '../../services/web.socket.service';
import * as $ from 'jquery';

import {Account} from '../../classes/account';
import {ConnectionManagerService} from '../../services/connection-manager.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  manager: ConnectionManagerService;

  account_add: string;
  send_timeout: any;
  local_wins: number;
  local_losses: number;
  server: string;

  constructor(
    private _manager: ConnectionManagerService,
    private socket: WebSocketService) {
    this.local_wins = 0;
    this.local_losses = 0;
    this.manager = _manager;
  }

  ngOnInit() {
  }

  change_wins(val) {
    this.local_wins = this.local_wins + val;
    clearTimeout(this.send_timeout);
    this.send_timeout = setTimeout(this.updateServer.bind(this), 1000);
  }

  change_losses(val) {
    this.local_losses = this.local_losses + val;
    clearTimeout(this.send_timeout);
    this.send_timeout = setTimeout(this.updateServer.bind(this), 1000);
  }

  reset() {
    this.socket.ws.send(JSON.stringify({'task': 'reset'}));

  }

  updateServer() {
    console.log('Sending');
    this.socket.ws.send(JSON.stringify({'task': 'change_win', 'count': this.local_wins}));
    this.socket.ws.send(JSON.stringify({'task': 'change_loss', 'count': this.local_losses}));
    this.local_wins = 0;
    this.local_losses = 0;
  }


  addAccount() {
    this.socket.ws.send(JSON.stringify({'task': 'add_account', 'username': this.account_add, 'server': this.server}));
  }

  removeAccount(accountId) {
    this.socket.ws.send(JSON.stringify({
        'task': 'remove_account', 'id': accountId
      }
    ));
  }
  forceActive(accountId) {
    this.socket.ws.send(JSON.stringify({
        'task': 'lock_account', 'id': accountId
      }
    ));
  }
}
