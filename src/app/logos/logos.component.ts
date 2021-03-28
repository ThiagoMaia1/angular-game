import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-logos',
  template: `
    <div class='logos-container'>
      <div *ngFor='let l of logosVisibility; let i = index'>
          <app-logo [ngStyle]="!l || (i > 0 && ballIsActive) ? {'visibility': 'hidden'} : {}" [isInversed]='(i % 2) !== inversedIndex'
                    [yTranslation]="linesTogether ? (-i + (numberOfLogos - 1)/2) : 0"
                    [columnsTogether]="columnsTogether"
                    [ballIsActive]='ballIsActive'
                    [gamePreparation]='gamePreparation'
          >
          </app-logo>
      </div>
      <div *ngIf='gameMessage' class='game-message'>Pressione "Espaço" ou clique para jogar</div>
    </div>
`,
  styleUrls: ['./logos.component.scss']
})
export class LogosComponent implements OnInit {

  numberOfLogos = 5;
  logosVisibility = new Array(this.numberOfLogos).fill(false);
  inversedIndex = 1;
  linesTogether = false;
  columnsTogether = false;
  ballIsActive = false;
  gamePreparation = false;

  @Output() gameActiveEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    const activateGame = () => this.gameActiveEvent.emit(true);
    const showLogo = (index = 0) => {
      this.logosVisibility[index] = true;
      if (index < this.numberOfLogos - 1) {
        setTimeout(() => showLogo(index + 1), 300);
      } else {
        setTimeout(() => this.inversedIndex = 0, 500);
        setTimeout(() => this.linesTogether = true, 1500);
        setTimeout(() => this.ballIsActive = true, 2500);
        setTimeout(() => this.columnsTogether = true, 3000);
        setTimeout(() => {
          this.gamePreparation = true;
          document.addEventListener('keyup', e => {
            if (e.code === 'Space') activateGame();
          })
          document.addEventListener('click', activateGame)
        }, 3500);
      }
    }
    setTimeout(showLogo, 10);
  }

}
