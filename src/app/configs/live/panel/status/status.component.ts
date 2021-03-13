import {Component, OnInit} from '@angular/core';
import {ManagerService} from '../../../../services/manager.service';
import {Stats} from '../../../../classes/stats';
import {StatsManagerService} from '../../../../services/pipelines/stats-manager.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  stats: Stats;

  constructor(private stats_manager: StatsManagerService,
              private manager: ManagerService) {
  }

  ngOnInit(): void {
    this.stats_manager.stats.subscribe(stats => {
      this.stats = stats;
    });
  }

  reset() {
    this.manager.sendLocal('reset', []);
  }

  change_wins(count) {
    console.log('Wins, Trigger.')
    this.manager.sendLocal('change_wins', [count]);
  }

  change_losses(count) {
    this.manager.sendLocal('change_losses', [count]);
  }
}
