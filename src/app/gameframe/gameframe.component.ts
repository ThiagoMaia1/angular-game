import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import Score, { Category } from 'src/models/Score';
import GameObstacle from '../../models/GameObstacle';

@Component({
  selector: 'app-gameframe',
  template: `
    <div class='game-frame-container'>
      <app-ranking-menu *ngIf='dead' (setCategoryEvent)='setCategory($event)' [score]='getScoreObject()'></app-ranking-menu>
      <app-score *ngIf='!dead' [score]='getScoreObject()'></app-score>
      <div (click)='pause()' class='pause-button' [ngStyle]='dead ? {visibility: "hidden"} : {}' name='Atalho: P'>
          {{(running ? 'P' : 'Desp') + 'ausar'}}
      </div>
      <div class='floor' [style.transform]="'rotate(' + getAngle() + 'deg)'">
          <div class='ball' [ngStyle]="{
              bottom: ballHeight + '%', 
              transform: 'rotate(' + ballRotation + 'deg)',
              border: '2px solid ' + ballColor
          }"></div>
          <div class='game-mover' [ngStyle]="{left: moverLeft + 'vw'}">
              <div *ngFor='let o of gameObstacles; let i = index'>
                  <app-game-step [height]='o.height' [y]='o.y'></app-game-step>
              </div>
          </div>
      </div>
    </div>
  `,
  styleUrls: ['./gameframe.component.scss']
})
export class GameframeComponent implements OnInit {

  @Output() gameActiveEvent = new EventEmitter<boolean>();
  @Output() setCategoryEvent = new EventEmitter<Category>();

  setCategory = (category : Category) => {
    this.setCategoryEvent.emit(category);
    this.gameActiveEvent.emit();
  }

  @Input() category !: Category;
  
  spinningIsActive !: boolean;
  initialFps = 60;
  fps = this.initialFps;
  stepWidth = 35;
  ballDiameter = 7;
  heightVW = (window.innerHeight*0.65)/window.innerWidth;
  diameterInPercentageHeight = this.ballDiameter/this.heightVW;
  moverLeft = 0;
  ballHeight = 0;
  ballFallingSpeed = 0;
  ballRotation = 0;
  ballRotatingSpeed = 7;
  score = 0;
  ballColor = 'white';
  baseFloorHeight = 0;
  baseCeilingHeight = 100;
  dead = false;
  ballOffset = 25;
  wholeBlockWidth = this.stepWidth/10;
  spikeWidth = this.wholeBlockWidth/5;
  blockWidth = this.wholeBlockWidth - this.spikeWidth;
  nStep = 0;
  gravityAcceleration = -0.2;
  elasticity = 1;
  jumpPower = 5;
  running = true;

  gameObstacles = Array(4).fill(null).map(_ => new GameObstacle());
  
  moveSteps = () => {
    if(this.moverLeft < -this.stepWidth) {
      let obstacles = this.gameObstacles.slice(1);
      obstacles.push(new GameObstacle());
      this.gameObstacles = [...obstacles];
      this.moverLeft = 0;
    }
    this.moverLeft -= this.stepWidth/this.initialFps;
  }

  ballFalling = () => {
    let floor = this.getFloorHeight();
    let ceiling = this.getCeilingHeight();
    this.setFallingSpeed(this.gravityAcceleration);
    this.ballHeight = Math.min(Math.max(floor, this.ballHeight + this.ballFallingSpeed), ceiling);
    if (this.ballHeight === floor) this.bounce(1.3*this.elasticity);
    if (this.ballHeight === ceiling) this.bounce(1*this.elasticity);
  }

  setFallingSpeed = (acceleration : number) => this.ballFallingSpeed += acceleration;

  shortCutListener = (e : KeyboardEvent) => {
    if (e.code === 'Space') this.jump();
    if (e.code === 'KeyP') this.pause();
  };

  clickListener = () => {
    this.jump();
  }

  jump = () => {
    if(this.running) 
      this.setFallingSpeed(this.jumpPower);
  };

  bounce = (strength : number) => this.setFallingSpeed(-this.ballFallingSpeed*strength);

  rotate = (angle : number) => this.ballRotation += angle;

  isOverBlock = () : boolean => {
    let x = this.moverLeft - this.ballDiameter - this.ballOffset + this.stepWidth*(this.nStep + 1);
    return x < this.wholeBlockWidth && x > 0;
  }

  getFloorCeilingHeight = (baseValue : number, getFromObstacle : (obstacle : GameObstacle) => number) => {
    if (!this.isOverBlock() || !this.obstacleHasHeight()) return baseValue;
    return getFromObstacle(this.gameObstacles[this.nStep]);
  }

  getFloorHeight = () => this.baseFloorHeight;//this.getFloorCeilingHeight(this.baseFloorHeight, (o : GameObstacle) => o.y + o.height);
  getCeilingHeight = () => this.baseCeilingHeight;//this.getFloorCeilingHeight(this.baseCeilingHeight, (o : GameObstacle) => o.y > 0o.y);

  obstacleHasHeight = () : boolean => this.gameObstacles[this.nStep].height > 0;

  getAngle = () => {
    return this.spinningIsActive ? (this.fps - this.initialFps)*25 : 0;
  }
  getLaps = () => Math.floor(this.getAngle()/360);
  getScore = () => Math.round(this.score/10);
  getScoreObject = () => new Score('', this.category.name, this.getScore(), this.getLaps())

  checkDeath = () => {
    let o = this.gameObstacles[this.nStep];
    if (
      this.obstacleHasHeight() && 
      this.ballHeight + this.diameterInPercentageHeight > o.y &&
      this.ballHeight < o.y + o.height &&
      this.isOverBlock()
    ) {
      this.die();
    }
  }

  die = () => {
    this.dead = true;
    this.ballColor = 'red';
    this.running = false;
    document.removeEventListener('keyup', this.shortCutListener);
    document.removeEventListener('click', this.clickListener);
    document.addEventListener('keyup', this.reopenGame);
  };
  
  pause = () => {
    console.log('pausar', this.running);
    this.running = !this.running;
    if (this.running) this.onFrame();
  }

  reopenGame = (e : KeyboardEvent) => {
    if (e.code === 'Space') this.gameActiveEvent.emit();
  }

  speedUp = () => this.fps += Math.sqrt(this.score)/10000;

  onFrame = () => {
    this.checkDeath();    
    this.moveSteps();
    this.ballFalling();
    this.rotate(this.ballRotatingSpeed + Math.abs(this.ballFallingSpeed));
    this.speedUp();
    this.score++;
    if(this.running) setTimeout(this.onFrame, 1000/this.fps);
  }

  constructor() {
    this.gameObstacles.forEach((o, i) => {
      if(i < 2) o.clear();
    });
  }

  ngOnInit(): void {
    this.spinningIsActive = this.category.name === 'spinning';
    this.onFrame();
    document.addEventListener('keyup', this.shortCutListener);
    document.addEventListener('click', this.clickListener);
  }
}
