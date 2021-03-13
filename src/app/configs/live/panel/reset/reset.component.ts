import {Component, OnInit} from '@angular/core';
import {ManagerService} from '../../../../services/manager.service';
import {StatsManagerService} from '../../../../services/pipelines/stats-manager.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  manager: ManagerService;

  constructor(private stats_manager : StatsManagerService) {
  }

  ngOnInit(): void {
  }

  reset() {
    this.stats_manager.reset();
  }

}
