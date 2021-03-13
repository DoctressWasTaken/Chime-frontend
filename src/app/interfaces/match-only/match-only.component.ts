import { Component, OnInit } from '@angular/core';
import {ManagerService} from '../../services/manager.service';
import {StatsManagerService} from '../../services/pipelines/stats-manager.service';
import {AccountManagerService} from '../../services/pipelines/account-manager.service';

@Component({
  selector: 'app-match-only',
  templateUrl: './match-only.component.html',
  styleUrls: ['./match-only.component.scss']
})
export class MatchOnlyComponent implements OnInit {

  stats: any;

  constructor(private stats_manager: StatsManagerService,
              private account_manager: AccountManagerService) {
    this.stats_manager.stats.subscribe((stats) => {
      this.stats = stats;
    });
  }
  ngOnInit() {
  }

}
