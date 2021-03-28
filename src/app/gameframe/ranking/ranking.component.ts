import { Component, OnInit } from '@angular/core';
import { FirebaseCollections, getQueryRecords } from 'src/firebase/Firebase';
import Score, { Categories, Category } from 'src/models/Score'; 

@Component({
  selector: 'app-ranking',
  template: `
    <div>
      <div class='category-selector'>
        <div *ngFor='let c of categories;' 
             (click)='category = c' 
             [ngClass]="{'category-tab': true, 'gray-highlight': c === category}">
          {{c.label}}
        </div>
      </div>
      <div class='list-container'>
        <div *ngFor='let s of getFilteredScores(); let i = index' class='ranking-line' 
          [ngStyle]='i % 2 === 1 ? {backgroundColor: "rgba(255, 255, 255, 0.2)"} : {}'>
          <div style='width: 15vw;'>{{s.nickname}}</div>
          <div>{{s.points}}</div>
          <div>{{s.strDate}}</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  scores : Score[] = [];
  category : Category = Categories[0];
  categories = Categories;

  constructor() {};

  getFilteredScores = () => 
    this.scores.filter(s => (s.category === this.category.name) || this.category.name === 'all');

  ngOnInit() {
    getQueryRecords<Score>(
      FirebaseCollections.scores
    ).then(scores => {
      this.scores = scores.sort((a, b) => b.points - a.points);
      console.log(scores);
    });
  }
}
