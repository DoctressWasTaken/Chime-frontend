import {Component, Input, OnInit} from '@angular/core';
import {Account} from '../../../../../classes/account';
import {ManagerService} from '../../../../../services/manager.service';
import {Rank} from '../../../../../classes/rank';
import {AccountManagerService} from '../../../../../services/pipelines/account-manager.service';

@Component({
  selector: '[app-account]',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() account: Account;
  locked: boolean = false;
  rank: Rank;
  a_m: AccountManagerService;

  constructor(private account_manager: AccountManagerService,
              private manager: ManagerService) {
    this.a_m = account_manager
  }

  ngOnInit(): void {
    this.account_manager.locked.subscribe(lock_id => {
      this.locked = this.account.id && lock_id == this.account.id;
    });
    this.rank = this.account.rank_SQ;
    this.locked = this.account.locked;
  }

  lock() {

    if (this.locked) {
      this.manager.sendLocal('lock', [this.account.id]);
    } else {
      this.manager.sendLocal('lock', [null]);
    }
  }
  remove() {
    this.account_manager.remove_account(this.account.id);
  }

}
