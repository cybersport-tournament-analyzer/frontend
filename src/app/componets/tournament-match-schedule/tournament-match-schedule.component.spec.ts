import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentMatchScheduleComponent } from './tournament-match-schedule.component';

describe('TournamentStatsComponent', () => {
  let component: TournamentMatchScheduleComponent;
  let fixture: ComponentFixture<TournamentMatchScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentMatchScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentMatchScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
