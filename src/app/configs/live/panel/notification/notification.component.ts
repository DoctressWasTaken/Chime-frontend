import { Component, OnInit } from '@angular/core';
import {ManagerService} from '../../../../services/manager.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  manager: ManagerService;

  constructor(private manager_: ManagerService) {
    this.manager = manager_;
  }

  ngOnInit(): void {
  }

}
