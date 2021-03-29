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
      <div (click)='reopen()' class='button-div'>Pressione "Espaço" ou clique para jogar novamente</div>
      <div (click)='setCategory()' class='button-div'>
        <div>
          {{score.category === 'spinning' 
            ? 'Muito difícil? Jogar sem girar.' 
            : 'Muito fácil? Faça a tela para girar.'
          }}
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
    .button-div {
      padding: 3vh;
    }
  `]
})

export class RankingMenuComponent implements OnInit {

  @Input() score !: Score;
  @Output() setCategoryEvent = new EventEmitter<Category>();
  
  rankingIsVisible = false;
  lastScore !: Score;

  setCategory = () => {
    let i = 0;
    if (this.score.category === 'spinning') i = 1;
    if (this.score.category === 'still') i = 0;
    this.setCategoryEvent.emit(Categories[i]);
  }

  reopen = () => this.setCategoryEvent.emit(Categories.filter(c => c.name === this.score.category)[0]);
  
  ngOnInit(): void {
    this.lastScore = this.score;
  }

}
