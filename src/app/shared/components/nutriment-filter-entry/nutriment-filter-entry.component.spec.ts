import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrimentFilterEntryComponent } from './nutriment-filter-entry.component';

describe('NutrimentFilterEntryComponent', () => {
  let component: NutrimentFilterEntryComponent;
  let fixture: ComponentFixture<NutrimentFilterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutrimentFilterEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrimentFilterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
