import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallBackAuthComponent } from './call-back-auth.component';

describe('CallBackAuthComponent', () => {
  let component: CallBackAuthComponent;
  let fixture: ComponentFixture<CallBackAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallBackAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallBackAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
