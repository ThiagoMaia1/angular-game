import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogosComponent } from './logos/logos.component';
import { LogoComponent } from './logos/logo/logo.component';
import { GameframeComponent } from './gameframe/gameframe.component';
import { GameStepComponent } from './game-step/game-step.component';

@NgModule({
  declarations: [
    AppComponent,
    LogosComponent,
    LogoComponent,
    GameframeComponent,
    GameStepComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
