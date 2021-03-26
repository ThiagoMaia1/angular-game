import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() isInversed : boolean = false; 
  @Input() yTranslation : number = 0; 
  @Input() columnsTogether : boolean = false; 
  @Input() ballIsActive : boolean = false;

  word = 'MEREO';
  getTransformX = (index : number) => 
    this.columnsTogether ? {transform: `translateX(${(-index + (this.word.length - 1)/2)*100}%)`} : {};
  ngOnInit(): void {
  }
}
