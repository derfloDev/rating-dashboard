import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalizedName } from '../../models/localized-name';
import { NutrimentFilter } from '../../models/nutriment-filter';
import { NutrimentFilterEntryComponent } from '../nutriment-filter-entry/nutriment-filter-entry.component';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  @Input()
  categoryNames: LocalizedName[];
  @Input()
  brandNames: LocalizedName[];
  @Input()
  additiveNames: LocalizedName[];
  @Input()
  allergenNames: LocalizedName[];
  @Input()
  ingredientsFromPalmOil: LocalizedName[];
  @Input()
  nutritionGrades: LocalizedName[];
  @Input()
  nutrimentNames: LocalizedName[];
  @Input()
  idPrefix: string ='';

  @Output()
  filterChanged = new EventEmitter<{ key: string; value: string }>();

  @Output()
  nutrimentChanged = new EventEmitter<{
    add: boolean;
    filter: NutrimentFilter;
  }>();

  nutrimentFilters: number[] = [0];

  constructor() {}

  ngOnInit(): void {}

  valueChanged(key: string, value: string): void {
    this.filterChanged.emit({ key: key, value: value });
  }

  nutrimentChange(event: { add: boolean; filter: NutrimentFilter }): void {
    this.nutrimentChanged.emit(event);
  }

  addNutrimentFilter(): void {
    this.nutrimentFilters.push(this.nutrimentFilters.length);
  }
  removeNutrimentFilter(
    index: number,
    filterComponent: NutrimentFilterEntryComponent
  ): void {
    filterComponent.emitFilterRemove();
    this.nutrimentFilters.splice(index, 1);
  }

  get operators(): LocalizedName[] {
    return [
      { key: 'lt', value: 'weniger' },
      { key: 'lte ', value: 'weniger oder gleich' },
      { key: 'gt ', value: 'mehr' },
      { key: 'gte ', value: 'mehr oder gleich' },
      { key: 'eq ', value: 'gleich' },
    ];
  }
}
