import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

    ws: any;
    url: any;
    receiver: Subject<any>;
    status: BehaviorSubject<any>;


    constructor() {
        this.status = new BehaviorSubject(false);

        console.log("Started websocket");
        this.url = "wss://chime.lightshield.dev/wss/";
        this.url = "ws://0.0.0.0:8000";
        const ws = new WebSocket(this.url);
        this.ws = ws;
        ws.onopen = function(event) {
            this.status.next(true);
        }.bind(this);
        this.receiver = new Subject<any>();
        ws.onmessage = function(event) {

            this.receiver.next(
            JSON.parse(event.data));

        }.bind(this);
    
    }



}
