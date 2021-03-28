import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogosComponent } from './logos/logos.component';
import { LogoComponent } from './logos/logo/logo.component';
import { GameframeComponent } from './gameframe/gameframe.component';
import { GameStepComponent } from './gameframe/game-step/game-step.component';
import { RankingComponent } from './gameframe/ranking/ranking.component';
import { RankingMenuComponent } from './gameframe/ranking/ranking-menu/ranking-menu.component';
import { RankingInputComponent } from './gameframe/ranking/ranking-input/ranking-input.component';
import { ScoreComponent } from './score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    LogosComponent,
    LogoComponent,
    GameframeComponent,
    GameStepComponent,
    RankingComponent,
    RankingMenuComponent,
    RankingInputComponent,
    ScoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
