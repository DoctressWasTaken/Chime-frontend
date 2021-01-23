import { Component, OnInit, Input } from '@angular/core';
import {ConnectionManagerService} from '../../services/connection-manager.service';

@Component({
  selector: 'app-small',
  templateUrl: './small.component.html',
  styleUrls: ['./small.component.scss']
})
export class SmallComponent implements OnInit {

    manager: ConnectionManagerService;

    constructor(
      private _manager: ConnectionManagerService
    ) {
        this.manager = _manager;
        }

  ngOnInit() {
  }

}
