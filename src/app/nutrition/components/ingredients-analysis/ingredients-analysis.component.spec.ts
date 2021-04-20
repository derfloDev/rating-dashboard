import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsAnalysisComponent } from './ingredients-analysis.component';

describe('IngredientsAnalysisComponent', () => {
  let component: IngredientsAnalysisComponent;
  let fixture: ComponentFixture<IngredientsAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientsAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
