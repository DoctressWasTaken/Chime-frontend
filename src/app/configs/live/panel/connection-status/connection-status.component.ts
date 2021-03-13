import { Component, OnInit } from '@angular/core';
import {ManagerService} from '../../../../services/manager.service';
import {WebSocketService} from '../../../../services/web.socket.service';

@Component({
  selector: 'app-connection-status',
  templateUrl: './connection-status.component.html',
  styleUrls: ['./connection-status.component.scss']
})
export class ConnectionStatusComponent implements OnInit {
  connected: boolean;
  connected_buffer: boolean;

  constructor(private websocket: WebSocketService) {
    this.connected = null;

    this.websocket.status.subscribe((connected) => {
      if (!connected) {
        setTimeout(function(){
          this.connected = this.connected_buffer;}.bind(this), 5000)
      }
      else {
        this.connected = connected;
        this.connected_buffer = this.connected;
      }
      this.connected_buffer = connected;
    });
  }

  ngOnInit(): void {
  }

}
