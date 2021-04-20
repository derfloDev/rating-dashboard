import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.scss']
})
export class ProductEntryComponent implements OnInit {
  @Input()
  product: Product

  constructor() { }

  ngOnInit(): void {
  }

  get productName(): string {
    return this.product.generic_name_en ? this.product.generic_name_en : this.product.generic_name;
  }

}
