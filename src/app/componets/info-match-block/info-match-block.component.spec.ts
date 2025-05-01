import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMatchBlockComponent } from './info-match-block.component';

describe('InfoMatchBlockComponent', () => {
  let component: InfoMatchBlockComponent;
  let fixture: ComponentFixture<InfoMatchBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoMatchBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoMatchBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
