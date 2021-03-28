import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <div class="container" [ngStyle]="{transform: 'translateY(' + yTranslation*100 + '%)'}">
    <div [ngClass]="(isInversed ? 'active ' : '') + 'color-reverser'"></div>
    <div class='logo-container'>
        <div *ngFor='let l of word.split(""); let i = index' 
            [ngClass]="{'letter-container': true, 'letter-m': i == 0 && ballIsActive, 'game-prep': gamePreparation}" 
            [ngStyle]="getTransformX(i)">
            <div class='absolute-ball'></div>
            <img src='../../../assets/SVG/Mereo-{{l}}.svg' 
                [ngStyle]='(ballIsActive && l === "M") ? {zIndex: 100} : {}'>
        </div>
    </div>
  </div>
  `,
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() isInversed : boolean = false; 
  @Input() yTranslation : number = 0; 
  @Input() columnsTogether : boolean = false; 
  @Input() ballIsActive : boolean = false;
  @Input() gamePreparation : boolean = false;

  word = 'MEREO';
  getTransformX = (index : number) => 
    this.columnsTogether && !this.gamePreparation ? {transform: `translateX(${(-index + (this.word.length - 1)/2)*100}%)`} : {};
  ngOnInit(): void {
  }
}
