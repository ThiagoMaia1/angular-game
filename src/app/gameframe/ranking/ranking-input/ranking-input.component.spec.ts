import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingInputComponent } from './ranking-input.component';

describe('RankingInputComponent', () => {
  let component: RankingInputComponent;
  let fixture: ComponentFixture<RankingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
