import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws: any;
  url: any;
  receiver: Subject<any>;
  status: BehaviorSubject<any>;
  reconnect_delay: number;

  constructor() {
    this.status = new BehaviorSubject(false);

    console.log('Started websocket');
    this.url = environment.url;
    this.reconnect_delay = 0;
    this.ws = new WebSocket(this.url);

    this.receiver = new Subject<any>();
  }

  connect(this) {
      this.ws = new WebSocket(this.url);

      // Set ws to active
      this.ws.onopen = function (event) {
        console.log('Connected to websocket.');
        this.reconnect_delay = 0;
        this.status.next('connected');
      }.bind(this);

      // Pass messages to the receiver Subject to pass on.
      this.ws.onmessage = function (event) {
        this.receiver.next(
          JSON.parse(event.data));
      }.bind(this);

      // On close trigger
      this.ws.onclose = function (event) {
        this.status.next('disconnected');
        console.log('Connection lost.');
        setTimeout(function () {
          console.log('Attempting to reconnect (Timeout: ' + this.reconnect_delay + 's).');
          this.reconnect_delay = Math.min(this.reconnect_delay + 1, 25);
          this.connect();
        }.bind(this), this.reconnect_delay * 1000);
      }.bind(this);
  }
}
