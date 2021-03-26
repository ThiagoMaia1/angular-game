import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-step',
  templateUrl: './game-step.component.html',
  styleUrls: ['./game-step.component.scss'],
})
export class GameStepComponent implements OnInit {

  @Input() height !: number;
  @Input() y !: number;

  ngOnInit(): void {
  }

}
