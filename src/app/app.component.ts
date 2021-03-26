import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  gameIsActive = false;

  resetGame = () => {
    this.gameIsActive = false;
    setTimeout(() => this.gameIsActive= true, 0);
  }
}
