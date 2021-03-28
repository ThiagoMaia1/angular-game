import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingMenuComponent } from './ranking-menu.component';

describe('RankingMenuComponent', () => {
  let component: RankingMenuComponent;
  let fixture: ComponentFixture<RankingMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
