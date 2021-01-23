import { Component, OnInit } from '@angular/core';
import {ConnectionManagerService} from '../../services/connection-manager.service';

@Component({
  selector: 'app-match-only',
  templateUrl: './match-only.component.html',
  styleUrls: ['./match-only.component.scss']
})
export class MatchOnlyComponent implements OnInit {

  manager: ConnectionManagerService;

  constructor(
    private _manager: ConnectionManagerService
  ) {
    this.manager = _manager;
  }

  ngOnInit(): void {
  }

}
