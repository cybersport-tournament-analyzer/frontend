import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentBracketComponent } from './tournament-bracket.component';

describe('TournirBracketComponent', () => {
  let component: TournamentBracketComponent;
  let fixture: ComponentFixture<TournamentBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentBracketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
