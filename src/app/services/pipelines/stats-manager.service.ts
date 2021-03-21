import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Stats} from '../../classes/stats';
import {ManagerService} from '../manager.service';
import {Account} from '../../classes/account';

@Injectable({
  providedIn: 'root'
})
export class StatsManagerService {
  stats: BehaviorSubject<Stats>;
  listen: boolean = true;
  save_timeout: any;

  constructor(private manager: ManagerService) {
    this.stats = new BehaviorSubject<Stats>({
      wins: 0, losses: 0, rank: {tier: 'Unranked'}
    });
    this.manager.streamlabs.subscribe(streamlabs => {
      if (streamlabs) {
        streamlabs.userSettings.get('stats')
          .then(stats => {
            if (stats) {
              this.stats.next(stats);
            }
          });
      }
    });

    this.manager.local.subscribe(message => {
      switch (message.type) {
        case 'reset': {
          this.reset();
        }
          break;
        case 'change_wins': {
          this.change_stats(message.data[0], null, message.data[1]);
        }
          break;
        case 'change_losses': {
          this.change_stats(null, message.data[0], message.data[1]);
        }
          break;
      }
    });
    this.stats.subscribe(stats => {
      clearTimeout(this.save_timeout);
      this.save_timeout = setTimeout(function () {
        this.manager.updateSettings('stats', stats);
      }.bind(this), 500);
    });
  }

  update_stats(account: Account) {
    let stats = this.stats.value;
    if (account.rank_SQ.tier) {
      stats.rank = account.rank_SQ;
    } else {
      if (account.rank_FQ.tier) {
        stats.rank = account.rank_FQ;
      } else {
        stats.rank = {tier: 'Unranked'};
      }
    }
    this.stats.next(stats);
  }

  reset() {
    let stats = this.stats.value;
    stats.wins = 0;
    stats.losses = 0;
    this.stats.next(stats);
  }

  change_stats(wins: number = null, losses: number = null, previous_stats) {
    let stats = this.stats.value;
    stats.wins = previous_stats.wins;
    stats.losses = previous_stats.losses;
    if (wins) {
      stats.wins = Math.max(0, stats.wins + wins);
    }
    if (losses) {
      stats.losses = Math.max(0, stats.losses + losses);
    }
    this.stats.next(stats);
  }
}
