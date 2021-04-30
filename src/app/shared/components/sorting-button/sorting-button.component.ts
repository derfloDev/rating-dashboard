import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sorting-button',
  templateUrl: './sorting-button.component.html',
  styleUrls: ['./sorting-button.component.scss'],
})
export class SortingButtonComponent implements OnInit {
  @Output()
  sortingChanged = new EventEmitter<{ key: string; value: string }>();

  currentSorting = '';

  sortings = [
    {
      key: 'unique_scans_n',
      value: 'Popularity',
    },
    {
      key: 'product_name',
      value: 'Name',
    },
    {
      key: 'created_t',
      value: 'Erstellt',
    },
    {
      key: 'last_modified_t',
      value: 'Zuletzt bearbeitet',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
  filterChanged(event: { key: string; value: string }): void {
    this.currentSorting = event.value;
    this.sortingChanged.emit({ key: 'sortBy', value: event.key });
  }
}
