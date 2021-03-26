import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameframeComponent } from './gameframe.component';

describe('GameframeComponent', () => {
  let component: GameframeComponent;
  let fixture: ComponentFixture<GameframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
