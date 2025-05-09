import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentBracketPredictionComponent } from './tournament-bracket-prediction.component';

describe('TournamentBracketPredictionComponent', () => {
  let component: TournamentBracketPredictionComponent;
  let fixture: ComponentFixture<TournamentBracketPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentBracketPredictionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentBracketPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
