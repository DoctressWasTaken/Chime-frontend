import {Injectable} from '@angular/core';
import {ManagerService} from '../manager.service';
import {Account} from '../../classes/account';
import {BehaviorSubject} from 'rxjs';
import {StatsManagerService} from './stats-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AccountManagerService {

  accounts: BehaviorSubject<Account[]>;
  locked: BehaviorSubject<any>;
  save_delay: any;

  constructor(private manager: ManagerService,
              private stats: StatsManagerService) {
    this.accounts = new BehaviorSubject<Account[]>([]);
    this.locked = new BehaviorSubject<any>(null);

    // On change to the accounts data stats are recalculated
    // And the local save is updated
    this.accounts.subscribe(accounts => {
      if (accounts.length > 0) {
        this.stats.update_stats(this.calculate_stats(accounts));
      }

      clearTimeout(this.save_delay);
      setTimeout(function () {
        if (!accounts || accounts.length == 0) {
          this.manager.updateSettings('accounts', null);
        } else {
          this.manager.updateSettings('accounts', accounts);
        }
      }.bind(this), 5000);

    });
    // Pass backend message to check for account updates
    this.manager.backend.subscribe(message => {
      if (message['tag'] == 'update') {
        this.update_accounts(message['data']);
      }
    });
    // Work through local
    this.manager.local.subscribe(message => {
      switch (message.type) {
        case 'lock': {
          this.lock(message.data[0]);
        }
          break;
        case 'remove_account': {
          let accounts: Account[] = [];
          for (let account of this.accounts.value) {
            if (account.id !== message.data[0]) {
              accounts.push(account);
            }
          }
          this.update_accounts(accounts);
        }
      }
    });

    this.manager.streamlabs.subscribe(streamlabs => {
      if (streamlabs) {
        console.log('Streamlabs initiated.');
        this.manager.streamlabs.value.userSettings.get('accounts')
          .then(accounts => {
            console.log('Setting accounts from storage.');
            if (!accounts) {
              accounts = [];
            }
            this.accounts.next(accounts);
          });
      }
    });
  }

  lock(id) {
    let accounts: Account[] = [];
    this.locked.next(id);
    for (let account of this.accounts.value) {
      account.locked = account.id && account.id == id;
      accounts.push(account);
    }
    this.accounts.next(accounts);
  }

  add_account(summonerName: string, server: string) {
    this.manager.sendBackend(JSON.stringify({
      'task': 'add_account',
      'account': {
        'summonerName': summonerName,
        'server': server
      }
    }));
    let sub_: any;
    let id: any;
    let accounts: Account[] = this.accounts.value;
    accounts.push({summonerName: summonerName, server: server});
    this.update_accounts(accounts);
  }

  remove_account(id: number) {
    this.manager.sendBackend(JSON.stringify({
      'task': 'remove_account',
      'account': {
        'id': id
      }
    }));
    this.manager.sendLocal('remove_account', [id]);
  }

  calculate_stats(accounts) {
    let active_account: Account;
    let locked_account: Account;
    for (let account of accounts) {
      if (account.active) {
        active_account = account;
      }
      if (account.locked) {
        locked_account = account;
      }
    }
    if (locked_account) {
      return locked_account;
    }
    if (active_account) {
      return active_account;
    }
  }

  get_active(accounts) {
    // Return the last updated account
    let last_updated_account: Account;
    let last_updated_timestamp: number = 0;
    for (let account of accounts) {
      if (account.last_updated > last_updated_timestamp) {
        last_updated_timestamp = account.last_updated;
        last_updated_account = account;
      }
    }
    return last_updated_account.id;
  }

  update_accounts(accounts) {
    let accounts_updated: Account[] = [];

    let changed: boolean = false;

    let accounts_slimmed: Account[] = [];
    for (let account of accounts) {
      if (account.id) {
        accounts_slimmed.push(account);
      } else {
        changed = true;
      }
    }
    accounts = accounts_slimmed;
    console.log(accounts);
    if (accounts.length == 0) {
      if (this.accounts.value.length != 0) {
        changed = true;
      }
    } else {
      if (this.accounts.value.length == 0) {
        let active_id = this.get_active(accounts);
        for (let account of accounts) {
          if (account.id == active_id) {
            account.active = true;
          }
          accounts_updated.push(account);
        }
        changed = true;
      } else {
        let active_id = this.get_active(accounts);
        for (let account of accounts) {
          let account_missing = true;
          for (let account_local of this.accounts.value) {
            if (account_local.id == account.id) {
              if (account_local.hash !== account.hash) {
                changed = true;
                if (account_local.rank_SQ.division) {
                  this.stats.change_stats(
                    account.rank_SQ.wins - account_local.rank_SQ.wins
                    ,
                    account.rank_SQ.losses - account_local.rank_SQ.losses
                  );
                }
                if (account_local.rank_FQ.division) {
                  this.stats.change_stats(
                    account.rank_FQ.wins - account_local.rank_FQ.wins
                    ,
                    account.rank_FQ.losses - account_local.rank_FQ.losses
                  );
                }
              }

              account.locked = account_local.locked;
              account.active = false;
              account_missing = false;
            }
          }
          if (account.id == active_id) {
            account.active = true;
          }
          if (account_missing) {
            changed = true;
          }
          accounts_updated.push(account);
        }
      }
      if (accounts_updated.length != this.accounts.value.length) {
        changed = true;
      }
    }

    if (changed) {
      console.log('Slimmmed', accounts_updated);
      this.accounts.next(accounts_updated);
    }
  }

}


/*

  calculateStats(accounts: Account[], lockId: number) {
    let lockedAccount: Account = null;
    let activeAccount: Account = null;
    let stats: Stats = {
      wins: this.stats.value.wins,
      losses: this.stats.value.losses,
      rank: {tier: 'Unranked'}
    };
    for (let account of accounts) {
      if (lockId && account.id == lockId) {
        lockedAccount = account;
      }
      if (account.active) {
        activeAccount = account;
      }
      if (account.rank_SQ) {
        stats.wins = stats.wins + account.rank_SQ.wins;
        stats.losses = stats.losses + account.rank_SQ.losses;
      }
      if (account.rank_FQ) {
        stats.wins = stats.wins + account.rank_FQ.wins;
        stats.losses = stats.losses + account.rank_FQ.losses;
      }
    }
    if (lockedAccount) {
      this.generateStats(lockedAccount, stats);
    } else {
      this.generateStats(activeAccount, stats);
    }
  }



 */

