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
      >
      </app-ranking-input>
      <app-ranking *ngIf='rankingIsVisible'></app-ranking>
      <div>Pressione "Espaço" ou clique para jogar novamente</div>
      <div>
        <div (click)='setCategoryStill()' class='button-div'>Muito difícil? Jogar sem girar.</div>
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
  `]
})

export class RankingMenuComponent implements OnInit {

  @Input() score !: Score;
  @Output() setCategoryEvent = new EventEmitter<Category>();

  setCategoryStill = () => this.setCategoryEvent.emit(Categories[0]);

  rankingIsVisible = false;
  
  ngOnInit(): void {
  }

}
