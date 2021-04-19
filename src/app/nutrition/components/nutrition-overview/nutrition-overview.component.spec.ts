import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionOverviewComponent } from './nutrition-overview.component';

describe('NutritionOverviewComponent', () => {
  let component: NutritionOverviewComponent;
  let fixture: ComponentFixture<NutritionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
