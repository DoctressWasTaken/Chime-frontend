import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-small',
  templateUrl: './small.component.html',
  styleUrls: ['./small.component.scss']
})
export class SmallComponent implements OnInit {
    
    @Input() currentAccount: any;
    @Input() wins: number;
    @Input() losses: number;
    @Input() ready: Boolean;

    constructor() {
        console.log(this.currentAccount);
        }

  ngOnInit() {
    console.log(this.currentAccount);
  }

}
