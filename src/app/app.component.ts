import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-logos *ngIf='!gameIsActive' (gameActiveEvent)='gameIsActive = $event'></app-logos>
    <app-gameframe *ngIf='gameIsActive' (gameActiveEvent)='resetGame()'></app-gameframe>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  gameIsActive = false;

  resetGame = () => {
    this.gameIsActive = false;
    setTimeout(() => this.gameIsActive= true, 0);
  }
}
