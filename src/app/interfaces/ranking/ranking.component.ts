import { Component, OnInit, Input } from '@angular/core';
import {ConnectionManagerService} from '../../services/connection-manager.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  manager: ConnectionManagerService;

  constructor(
    private _manager: ConnectionManagerService
  ) {
    this.manager = _manager;
  }

  ngOnInit() {
  }

}
