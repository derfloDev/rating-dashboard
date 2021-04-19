import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrimentsTableComponent } from './nutriments-table.component';

describe('NutrimentsTableComponent', () => {
  let component: NutrimentsTableComponent;
  let fixture: ComponentFixture<NutrimentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutrimentsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrimentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
