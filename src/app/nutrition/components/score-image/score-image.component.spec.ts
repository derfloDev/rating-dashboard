import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreImageComponent } from './score-image.component';

describe('ScoreImageComponent', () => {
  let component: ScoreImageComponent;
  let fixture: ComponentFixture<ScoreImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
