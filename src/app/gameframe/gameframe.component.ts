import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import GameObstacle from '../../models/GameObstacle';

@Component({
  selector: 'app-gameframe',
  templateUrl: './gameframe.component.html',
  styleUrls: ['./gameframe.component.scss']
})
export class GameframeComponent implements OnInit {

  @Output() gameActiveEvent = new EventEmitter<boolean>();
  initialFps = 60;
  fps = this.initialFps;
  miliPerFrame = 1000/this.fps;
  stepWidth = 35;
  ballDiameter = 7;
  heightVW = (window.innerHeight*0.65)/window.innerWidth;
  diameterInPercentageHeight = this.ballDiameter/this.heightVW;
  moverLeft = 0;
  ballHeight = 0;
  ballFallingSpeed = 2;
  jumpHeight = 50;
  currentJumpHeight = 75;
  jumpSteps = 0;
  ballRotation = 0;
  ballRotatingSpeed = 7;
  intervalBounce : NodeJS.Timeout = setTimeout(() => void 0, 0);
  onFrameInterval : NodeJS.Timeout = setTimeout(() => void 0, 0);
  score = 0;
  ballColor = 'white';
  floorHeight = 0;
  dead = false;
  ballOffset = 25;
  wholeBlockWidth = this.stepWidth/10;
  spikeWidth = this.wholeBlockWidth/5;
  blockWidth = this.wholeBlockWidth - this.spikeWidth;

  gameObstacles = Array(4).fill(null).map(_ => new GameObstacle());
  
  moveSteps = () => {
    if(this.moverLeft < -this.stepWidth) {
      let obstacles = this.gameObstacles.slice(1);
      obstacles.push(new GameObstacle());
      this.gameObstacles = [...obstacles];
      // this.gameObstacles.shift();
      // this.gameObstacles.push(new GameObstacle());
      this.moverLeft = 0;
    }
    this.moverLeft -= (this.stepWidth/this.fps);
  }

  ballFalling = () => {
    if (this.jumpSteps > 1) {
      this.ballHeight += this.currentJumpHeight/(this.jumpSteps + 1);
      this.jumpSteps--;
    }
    if (this.ballHeight > 100) setTimeout(() => this.jump(-10), 0);
    if (this.ballHeight > this.floorHeight) {
      this.ballHeight = Math.min(Math.max(this.floorHeight, this.ballHeight - this.ballFallingSpeed), 100);
      this.rotate(this.currentJumpHeight/10);
    }
  }

  shortCutListener = (e : KeyboardEvent) => {
    if (e.code === 'Space') this.jump(this.jumpHeight);
  };

  clickListener = (e : MouseEvent) => {
    this.jump(this.jumpHeight);
  }

  jump = (height: number) => {
    clearInterval(this.intervalBounce);
    this.jumpSteps = 5;
    this.currentJumpHeight = height;
    this.intervalBounce = setInterval(() => {
      if (this.ballHeight < 1) {
        clearInterval(this.intervalBounce);
        this.bounce(height);
      }
    }, 50)
  }

  bounce = (jumpHeight : number) => {
    if (jumpHeight > 1) {
      let bounceJump = jumpHeight/2;
      this.jump(bounceJump);
    } else {
      this.ballHeight = this.floorHeight;
    }
  } 

  rotate = (angle : number) => this.ballRotation += angle;

  checkDeath = () => {
    let nStep = 0;
    let o = this.gameObstacles[nStep];
    let x = this.moverLeft - this.ballDiameter - this.ballOffset + this.stepWidth*(nStep + 1);
    if (
      o.height > 0 && 
      this.ballHeight + this.diameterInPercentageHeight > o.y &&
      this.ballHeight < o.y + o.height &&
      x < this.wholeBlockWidth &&
      x > 0
    ) {
      this.die();
    }
  }

  die = () => {
    this.dead = true;
    this.ballColor = 'red';
    clearTimeout(this.onFrameInterval);
    document.removeEventListener('keyup', this.shortCutListener);
    document.removeEventListener('click', this.clickListener);
    document.addEventListener('keyup', this.reopenGame);
    document.addEventListener('click', this.reopenClick);
  };

  reopenGame = (e : KeyboardEvent) => {
    if (e.code === 'Space') this.gameActiveEvent.emit();
  }

  reopenClick = () =>this.gameActiveEvent.emit();

  rotateScreen = () => {
    this.fps -= Math.sqrt(this.score)/10000;
  }

  onFrame = () => {
    this.checkDeath();    
    this.moveSteps();
    this.ballFalling();
    this.rotate(this.ballRotatingSpeed);
    this.rotateScreen();
    this.score++;
  }

  constructor() {
    this.gameObstacles.forEach((o, i) => {
      if(i < 2) o.clear();
    });
  }

  ngOnInit(): void {
    this.onFrameInterval = setInterval(this.onFrame, this.miliPerFrame);
    document.addEventListener('keyup', this.shortCutListener);
    document.addEventListener('click', this.clickListener);
  }
}
