import { Component, OnInit } from '@angular/core';
import {ManagerService} from '../../services/manager.service';
import {StatsManagerService} from '../../services/pipelines/stats-manager.service';

@Component({
  selector: 'app-large',
  templateUrl: './large.component.html',
  styleUrls: ['./large.component.scss']
})
export class LargeComponent implements OnInit {

  stats: any;

  constructor(private stats_manager: StatsManagerService) {
    this.stats_manager.stats.subscribe((stats) => {
      this.stats = stats;
    });
  }

  ngOnInit() {
  }

}
