import {Component, Input, OnInit} from '@angular/core';
import {ManagerService} from '../../../../services/manager.service';
import {Account} from '../../../../classes/account';
import {AccountManagerService} from '../../../../services/pipelines/account-manager.service';

declare var M;

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accounts: Account[];
  @Input() server: string;
  summoner_name: string;

  constructor(private account_manager: AccountManagerService) {
    this.account_manager.accounts.subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  ngOnInit(): void {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    var auto = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(auto, {
      data: {
        'EUW': null,
        'NA': null,
        'KR': null,
        'EUNE': null
      }
    });

  }

  addAccount() {
    if (this.summoner_name && this.server) {
      this.account_manager.add_account(this.summoner_name, this.server.toLowerCase());
      this.summoner_name = '';
      this.server = '';
    }
  }

}
