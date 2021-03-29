import { Component, Input, OnInit } from '@angular/core';
import { FirebaseCollections, getQueryRecords } from 'src/firebase/Firebase';
import Score, { Categories } from 'src/models/Score'; 

// type PageButton = {
//   label : string;
//   name : string;
//   value : -1 | 1;
// };

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
        <table>
          <tr class='ranking-line'>
            <th>#</th>
            <th>Nome</th>
            <th>Pontos</th>
            <th *ngIf='category === "spinning"'>Voltas</th>
            <th>Data</th>
          </tr>
          <tr *ngFor='let s of getFilteredScores(); let i = index' class='ranking-line' 
            [ngStyle]='getBackgroundColor(s, i)'>
            <td>{{i+1+posicaoInicial}}</td>
            <td>{{s.nickname}}</td>
            <td>{{s.points}}</td>
            <td *ngIf='category === "spinning"'>{{s.laps}}</td>
            <td>{{s.strDate}}</td>
          </tr>
        </table>
        <!-- <div *ngFor='let p of pageButtons' class='button-div with-padding' 
          (click)=>

        </div> -->
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
  posicaoInicial = 0;

  // pageButtons : PageButton[] = [
  //   {label: '<', name: 'Anterior', value: -1},
  //   {label: '>', name: 'Próxima', value: 1},
  // ];

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
