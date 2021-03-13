import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {ManagerService} from './manager.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws: any;
  url: any;
  receiver: Subject<any>;
  status: BehaviorSubject<any>;
  reconnect_delay: number;

  manager: ManagerService;

  constructor() {
    this.status = new BehaviorSubject<boolean>(null);
    this.reconnect_delay = 0;
  }

  init(manager, url) {
    this.url = url;
    console.log('Initiated websocket service.');
    this.manager = manager;
  }

  connect() {
    this.ws = new WebSocket(this.url);

    // Set ws to active
    this.ws.onopen = function (event) {
      console.log('Connected to websocket.');
      this.reconnect_delay = 0;
      this.status.next(true);
    }.bind(this);

    // Pass messages to the receiver Subject to pass on.
    this.ws.onmessage = function (event) {
      this.manager.backend.next(
        JSON.parse(event.data));
    }.bind(this);

    // On close trigger
    this.ws.onclose = function (event) {
      this.status.next(false);
      console.log('Connection lost.');
      setTimeout(function () {
        console.log('Attempting to reconnect (Timeout: ' + this.reconnect_delay + 's).');
        this.reconnect_delay = Math.min(this.reconnect_delay + 1, 25);
        this.connect();
      }.bind(this), this.reconnect_delay * 1000);
    }.bind(this);
  }
}
