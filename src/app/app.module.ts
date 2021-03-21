import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SmallComponent } from './interfaces/small/small.component';
import { RouterModule } from '@angular/router';
import { LiveComponent } from './configs/live/live.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RankingComponent } from './interfaces/ranking/ranking.component';
import { LargeComponent } from './interfaces/large/large.component';
import { MatchOnlyComponent } from './interfaces/match-only/match-only.component';
import { AccountComponent } from './configs/live/panel/accounts/account/account.component';
import { StatusComponent } from './configs/live/panel/status/status.component';
import { AccountsComponent } from './configs/live/panel/accounts/accounts.component';
import { ConnectionStatusComponent } from './configs/live/panel/connection-status/connection-status.component';
import { ResetComponent } from './configs/live/panel/reset/reset.component';
import { SampleComponent } from './configs/live/panel/sample/sample.component';
import { NotificationComponent } from './configs/live/panel/notification/notification.component';
import {DisclaimerComponent} from './configs/live/panel/disclaimer/disclaimer.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SmallComponent,
    LiveComponent,
    RankingComponent,
    LargeComponent,
    MatchOnlyComponent,
    AccountComponent,
    StatusComponent,
    AccountsComponent,
    ConnectionStatusComponent,
    ResetComponent,
    SampleComponent,
    NotificationComponent,
    DisclaimerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
