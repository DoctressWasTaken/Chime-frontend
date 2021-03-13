import {Component} from '@angular/core';
import {Account} from './classes/account';
import {ActivatedRoute, Params} from '@angular/router';
import {webSocket} from 'rxjs/webSocket';
import {ManagerService} from './services/manager.service';

declare var out;

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

  constructor(
    private manager: ManagerService
  ) {
    this.out = out;
    this.manager.set_type(this.out);
  }

  ngOnInit() {
  }

}
