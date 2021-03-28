import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-step',
  template: `
    <div class="game-step">
      <div class="game-obstacle" 
          [style.bottom.%]="y"
          [style.height.%]="height"
      >
          <div class='obstacle-spikes'></div>
          <div class='obstacle-block'></div>
      </div>
    </div>
  `,
  styleUrls: ['./game-step.component.scss'],
})
export class GameStepComponent implements OnInit {

  @Input() height !: number;
  @Input() y !: number;

  ngOnInit(): void {
  }

}
