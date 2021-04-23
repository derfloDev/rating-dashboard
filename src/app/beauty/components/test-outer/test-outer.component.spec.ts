import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOuterComponent } from './test-outer.component';

describe('TestOuterComponent', () => {
  let component: TestOuterComponent;
  let fixture: ComponentFixture<TestOuterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestOuterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOuterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
