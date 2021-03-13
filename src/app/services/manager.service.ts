import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {WebSocketService} from './web.socket.service';

declare var streamlabs;

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  streamlabs: BehaviorSubject<any>;
  settings: any;

  // Incoming datastreams
  backend: Subject<any>; // Websocket connection to the backend
  local: Subject<any>; // Local cross application communication

  version = '0.0.1';
  jwt: string;


  constructor(private socket: WebSocketService) {
    const self = this;

    // Init Datastreams
    this.backend = new Subject<any>();  // Distribute backend events
    this.local = new Subject<any>();  // Distribute local events
    this.streamlabs = new BehaviorSubject<any>(null); // streamlabs behav. subject to track changes


  }

  set_type(out) {
    // Called by the app itself to initiate websocket connection with the correct path
    streamlabs.init({receiveEvents: true})
      .then(data => {
        this.jwt = data.jwtToken;
        this.settings = data.settings;
      }).catch(data => {
      this.jwt = 'Test';
    }).finally(() => {
      this.streamlabs.next(streamlabs);
      streamlabs.onMessage((event) => {
        this.local.next(event);
      });
      this.socket.status
        .subscribe(status => {
          if (status) {
            this.sendBackend(JSON.stringify(
              {'task': 'auth', 'jwt': this.jwt}));
          }
        });
      switch (out) {
        case 'interface': {
          setTimeout(function () {
            this.socket.init(this, this.settings.url + 'config/');
            this.socket.connect();
          }.bind(this), 1000);
        }
          break;
        default: {
          setTimeout(function () {
            this.socket.init(this, this.settings.url + 'overlay/');
            this.socket.connect();
          }.bind(this), 1000);
        }
      }
    });
  }

  sendBackend(message) {
    this.socket.ws.send(message);
  }

  sendLocal(tag, message) {
    this.streamlabs.value.postMessage(tag, message);
  }


  updateSettings(tag, message) {
    // Write data to streamlabs settings.
    if (this.streamlabs) {
      console.log('Triggered settings update.');
      if (!message) {
        this.streamlabs.value.userSettings.delete(tag);
        return;
      }
      this.streamlabs.value.userSettings.set(tag, message);
    }
  }

}
