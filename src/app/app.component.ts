import { Component } from '@angular/core';
import { WebSocketService } from './services/web.socket.service';
import { Account } from './classes/account';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Chime-Frontend';
    out = "";
    ready: Boolean;
    current: Account;
    wins: number;
    losses: number;
    accounts: Account[];


    constructor(
        private route: ActivatedRoute,
        private socket: WebSocketService
        ) {
        const self = this;
        // Set initial values
        this.current = null;
        this.wins = 0;
        this.losses = 0;
        this.ready = false;
        // Get interface type to show
        let display = this.route.queryParams.subscribe(
            params => {
			if (params && params['out']) {
                self.out = params['out'];
                display.unsubscribe();
            }
		});
        // Get subscription to the websocket
        let init_socket = this.socket.status.subscribe( evt => {
            if (evt) {
                init_socket.unsubscribe();
                self.start_listen();
                this.socket.ws.send(JSON.stringify(
                    {'task': 'AUTH', 'user': 'Doctress'}));
            }
        });

    this.current = {
        name: "Nurse",
        server: "EUW",
        ranking: "Grandmaster 112LP",
        recent: "x",
        id: 1,
        miniSeries: null};
    this.accounts = [{
        name: "Nurse2",
        server: "EUW",
        ranking: "Grandmaster 112LP",
        recent: "x",
        id: 1,
        miniSeries: null
    }, {
        name: "Nurse",
        server: "EUW",
        ranking: "Grandmaster 112LP",
        recent: "x",
        id: 1,
        miniSeries: null}
    ]
    }    
    
    ngOnInit() {
    }

    start_listen() {
        let self = this;
        console.log("Starting the listen task");
        this.socket.receiver.subscribe( data => {
            if (data["type"] === "update") {
                self.ready = true;
                self.wins = data['wins'];
                self.losses = data['losses'];
                
                console.log(data);
                if (data['type'] == 'update') {
                    console.log("This is an update");
                    }
            }
        });
    
    }

    }
