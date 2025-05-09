import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSeriesBlockWithCompareComponent } from './info-series-block-with-compare.component';

describe('InfoSeriesBlockWithCompareComponent', () => {
  let component: InfoSeriesBlockWithCompareComponent;
  let fixture: ComponentFixture<InfoSeriesBlockWithCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoSeriesBlockWithCompareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSeriesBlockWithCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
