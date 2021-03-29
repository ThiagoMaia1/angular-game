import { Component, Input, OnInit } from '@angular/core';
import { FirebaseCollections, getQueryRecords } from 'src/firebase/Firebase';
import Score, { Categories } from 'src/models/Score'; 

@Component({
  selector: 'app-ranking',
  template: `
    <div style='overflow: hidden'>
      <div class='category-selector'>
        <div *ngFor='let c of categories;' 
             (click)='category = c.name' 
             [ngClass]="{'category-tab': true, 'gray-highlight': c.name === category}">
          {{c.label}}
        </div>
      </div>
      <div class='list-container'>
        <div class='ranking-line'>
          <div style='width: 15vw'>Nome</div>
          <div>Pontos</div>
          <div>Voltas</div>
          <div style='width: 20vw; text-align: center;'>Data</div>
        </div>
        <div *ngFor='let s of getFilteredScores(); let i = index' class='ranking-line' 
          [ngStyle]='getBackgroundColor(s, i)'>
          <div style='width: 15vw'>{{s.nickname}}</div>
          <div>{{s.points}}</div>
          <div>{{s.laps}}</div>
          <div>{{s.strDate}}</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  @Input() lastScore !: Score;

  scores : Score[] = [];
  category !: string;
  categories = Categories;

  constructor() {};

  getFilteredScores = () => 
    this.scores.filter(s => (s.category === this.category) || this.category === 'all');

  getBackgroundColor = (score : Score, index : number) => {
    if (this.lastScore.isEqualTo(score)) 
      return {backgroundColor: 'white', color: 'black', padding: '2vh 0'};
    else if (index % 2 === 1) 
      return {backgroundColor: "rgba(255, 255, 255, 0.2)"};
    return {};
  }

  ngOnInit() {
    this.category = this.lastScore.category;
    getQueryRecords<Score>(
      FirebaseCollections.scores
    ).then(scores => {
      this.scores = scores.sort((a, b) => b.points - a.points);
    });
  }
}
