import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {WebSocketService} from './web.socket.service';
import {BackendService} from './backend.service';
import * as manifest from '../../manifest.json';

declare var streamlabs;

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  streamlabs: BehaviorSubject<any>;
  settings: any;

  // Incoming datastreams
  local: Subject<any>; // Local cross application communication

  version: string;
  profiles: any;
  jwt: string;


  constructor(private backend: BackendService) {
    this.version = manifest.version;
    // Init Datastreams
    this.local = new Subject<any>();  // Distribute local events
    this.streamlabs = new BehaviorSubject<any>(null); // streamlabs behav. subject to track changes


  }

  set_type(out) {
    // Called by the app itself to initiate websocket connection with the correct path
    streamlabs.init({receiveEvents: true})
      .then(data => {
        this.jwt = data.jwtToken;
        this.profiles = data.profiles;
        this.settings = data.settings;
        this.backend.init(this.settings.host + this.version, this.jwt);
      }).catch(data => {
      this.jwt = 'Test';
    }).finally(() => {
      this.streamlabs.next(streamlabs);
      streamlabs.onMessage((event) => {
        this.local.next(event);
      });
    });
  }

  sendLocal(tag, message) {
    this.streamlabs.value.postMessage(tag, message);
  }


  updateSettings(tag, message) {
    // Write data to streamlabs settings.
    if (this.streamlabs) {
      if (!message) {
        this.streamlabs.value.userSettings.delete(tag);
        return;
      }
      this.streamlabs.value.userSettings.set(tag, message);
    }
  }

}
