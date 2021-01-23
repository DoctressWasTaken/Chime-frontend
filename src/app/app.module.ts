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

@NgModule({
  declarations: [
    AppComponent,
    SmallComponent,
    LiveComponent,
    RankingComponent,
    LargeComponent,
    MatchOnlyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
