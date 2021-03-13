import {Component, Input, OnInit} from '@angular/core';
import {WebSocketService} from '../../services/web.socket.service';
import * as $ from 'jquery';

import {Account} from '../../classes/account';
import {ManagerService} from '../../services/manager.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  manager: ManagerService;
  account_add: string;
  send_timeout: any;
  local_wins: number;
  local_losses: number;
  server: string;
  accounts: any;


  constructor(private manager_: ManagerService) {
    this.local_wins = 0;
    this.local_losses = 0;
    this.manager = manager_;
  }

  ngOnInit() {
  }

}
