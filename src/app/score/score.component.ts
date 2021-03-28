import { Component, Input, OnInit } from '@angular/core';
import Score from 'src/models/Score';

@Component({
  selector: 'app-score',
  template: `
    <div class='score'>
      <div>Pontuação: {{score.points}}</div>
      <div *ngIf='score.laps > 0' style='margin: "2vh";'>Voltas: {{score.laps}}</div>
    </div>
  `
})
export class ScoreComponent implements OnInit {

  @Input() score !: Score;

  constructor() {}

  ngOnInit(): void {
  }

}
