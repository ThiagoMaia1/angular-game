import { Component } from '@angular/core';
import { Categories } from 'src/models/Score';
// import { firestore } from '../firebase/Firebase';

@Component({
  selector: 'app-root',
  template: `
    <app-logos 
      *ngIf='!gameIsActive' 
      (gameActiveEvent)='gameIsActive = $event'
    ></app-logos>
    <app-gameframe 
      *ngIf='gameIsActive' 
      [category]='category'
      (gameActiveEvent)='resetGame()' 
      (setCategoryEvent)='category = $event'  
      >
    </app-gameframe>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  gameIsActive = true;
  category = Categories[0];

  resetGame = () => {
    console.log(this.category);
    this.gameIsActive = false;
    setTimeout(() => this.gameIsActive= true, 0);
  }
}
