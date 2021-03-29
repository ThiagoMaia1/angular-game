import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Score, { Categories, Category } from 'src/models/Score';

@Component({
  selector: 'app-ranking-menu',
  template: `
    <div class='end-menu'>
      <app-ranking-input 
        *ngIf='!rankingIsVisible' 
        (showRankingEvent)='rankingIsVisible = true'
        [score]='score'  
        (updateNicknameEvent)='lastScore.nickname = $event'
      >
      </app-ranking-input>
      <app-ranking *ngIf='rankingIsVisible' [lastScore]='lastScore'></app-ranking>
      <div>Jogar novamente:</div>
      <div class='choose-difficulty'>
        <div (click)='setCategory(0)' class='button-div with-padding'>
          Difícil (Girando)
        </div>
        <div (click)='setCategory(1)' class='button-div with-padding'>
          Fácil (Parado)
        </div>
      </div>
    </div>
  `,
  styles: [`
    .end-menu {
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background-color: rgba(0,0,0,.75);
      padding: 0 5vw;
    }
    .choose-difficulty {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
    }
  `]
})

export class RankingMenuComponent implements OnInit {

  @Input() score !: Score;
  @Output() setCategoryEvent = new EventEmitter<Category>();
  
  rankingIsVisible = false;
  lastScore !: Score;

  setCategory = (categoryIndex : number) => {
    this.setCategoryEvent.emit(Categories[categoryIndex]);
  }

  ngOnInit(): void {
    this.lastScore = this.score;
  }

}
