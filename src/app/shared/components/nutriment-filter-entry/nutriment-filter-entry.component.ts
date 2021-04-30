import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalizedName } from '../../models/localized-name';
import { NutrimentFilter } from '../../models/nutriment-filter';

@Component({
  selector: 'app-nutriment-filter-entry',
  templateUrl: './nutriment-filter-entry.component.html',
  styleUrls: ['./nutriment-filter-entry.component.scss'],
})
export class NutrimentFilterEntryComponent implements OnInit {
  @Input()
  nutrimentNames: LocalizedName[];

  @Output()
  filterChanged = new EventEmitter<{ add: boolean; filter: NutrimentFilter }>();

  private filter: NutrimentFilter = {};
  private prevFilter: NutrimentFilter = {};
  constructor() {}

  ngOnInit(): void {}

  keyChanged(key: string): void {
    this.filter.key = key;
    this.checkAndDispatchEvent();
  }

  operatorChanged(operator: string): void {
    this.filter.operator = operator;
    this.checkAndDispatchEvent();
  }

  valueChanged(event: FocusEvent): void {
    const inputElement = event.currentTarget as HTMLInputElement;
    this.filter.value = inputElement.value;
    this.checkAndDispatchEvent();
  }

  checkAndDispatchEvent(): void {
    if (this.hasChanged()) {
      if (this.hasAllValuesSet(this.prevFilter)) {
        this.emitFilterRemove();
      }
      if (this.hasAllValuesSet(this.filter)) {
        this.emitFilterAdd();
      }
      this.prevFilter = { ...this.filter };
    }
  }

  hasChanged(): boolean {
    return (
      this.filter.key != this.prevFilter.key ||
      this.filter.operator != this.prevFilter.operator ||
      this.filter.value != this.prevFilter.value
    );
  }

  emitFilterRemove(): void {
    this.filterChanged.emit({ add: false, filter: { ...this.prevFilter } });
  }
  emitFilterAdd(): void {
    this.filterChanged.emit({ add: true, filter: { ...this.filter } });
  }

  hasAllValuesSet(filter: NutrimentFilter): boolean {
    return !!filter.key && !!filter.operator && !!filter.value;
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
