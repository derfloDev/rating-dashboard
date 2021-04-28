import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
})
export class PagerComponent implements OnInit {
  @Input()
  totalItems: number;

  @Input()
  page: number;

  @Input()
  pageSize: number;

  @Output()
  pageChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  get pages(): number[] {
    const numberOfPages = Math.ceil(this.totalItems / this.pageSize);
    const pages = [];
    for (let page = 0; page < numberOfPages; page++) {
      pages.push(page + 1);
    }
    return pages;
  }

  pageChanged(page: number): void {
    // if (page != this.page) {
    this.pageChange.emit(page);
    // }
  }
}
