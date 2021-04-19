import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionDetailComponent } from './nutrition-detail.component';

describe('NutritionComponent', () => {
  let component: NutritionDetailComponent;
  let fixture: ComponentFixture<NutritionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
