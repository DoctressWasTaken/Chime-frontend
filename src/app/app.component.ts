import {Component} from '@angular/core';
import {WebSocketService} from './services/web.socket.service';
import {Account} from './classes/account';
import {ActivatedRoute, Params} from '@angular/router';
import {webSocket} from 'rxjs/webSocket';
import {ConnectionManagerService} from './services/connection-manager.service';

declare var out;
declare var streamlabs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chime-Frontend';
  out = '';
  ready: Boolean;
  current: Account;
  wins: number;
  losses: number;
  accounts: Account[];
  jwt: string;
  manager_: ConnectionManagerService;

  constructor(
    private route: ActivatedRoute,
    private manager: ConnectionManagerService
  ) {
    const self = this;
    // Get interface type to show
    this.out = out;
    this.manager_ = manager;
    streamlabs.init({receiveEvents: true})
      .then(data => {
        self.jwt = data.jwtToken;
      }).catch(data => {
      self.jwt = 'Test';
    }).finally(() => {
      this.manager_.init(this.jwt);
    });
    // Get subscription to the websocket

  }

  ngOnInit() {
  }

}
