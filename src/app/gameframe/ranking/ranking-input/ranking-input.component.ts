import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { createNewRecord, FirebaseCollections } from 'src/firebase/Firebase';
import Score from 'src/models/Score';

@Component({
  selector: 'app-ranking-input',
  template: `
    <div class='input-nickname-container'>
      <div>Digite seu apelido para incluir sua pontuação no ranking:</div>
      <input autofocus (keyup)='keyup($event)'/>
      <div class='button-div with-padding' (click)='this.showRankingEvent.emit()'>
        Pular e ver ranking (sua pontuação será perdida)
      </div>
    </div>
  `,
  styleUrls: ['./ranking-input.component.scss']
})
export class RankingInputComponent implements OnInit {

  @Input() score !: Score;
  @Output() showRankingEvent = new EventEmitter();
  @Output() updateNicknameEvent = new EventEmitter<string>();

  keyup = (e : KeyboardEvent) => {
    e.stopPropagation();
    if (e.code !== 'Enter') return;
    let el = e.target as HTMLInputElement; 
    if(el.value) {
      let nick = el.value.trim();
      this.score.nickname = nick;
      this.updateNicknameEvent.emit(nick);
      createNewRecord(
        FirebaseCollections.scores,
        this.score,
      )
      this.showRankingEvent.emit();
    }
  }

  ngOnInit(): void {}
}
