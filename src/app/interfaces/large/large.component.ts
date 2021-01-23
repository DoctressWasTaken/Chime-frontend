import { Component, OnInit } from '@angular/core';
import {ConnectionManagerService} from '../../services/connection-manager.service';

@Component({
  selector: 'app-large',
  templateUrl: './large.component.html',
  styleUrls: ['./large.component.scss']
})
export class LargeComponent implements OnInit {

  manager: ConnectionManagerService;

  constructor(
    private _manager: ConnectionManagerService
  ) {
    this.manager = _manager;
  }

  ngOnInit(): void {
  }

}
