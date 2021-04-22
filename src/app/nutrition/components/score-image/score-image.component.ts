import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-score-image',
  templateUrl: './score-image.component.html',
  styleUrls: ['./score-image.component.scss'],
})
export class ScoreImageComponent implements OnInit {
  @Input() product: Product;

  @Input()
  type: 'nova' | 'nutriscore' | 'ecoscore';

  constructor() {}

  ngOnInit(): void {}

  get nutriscoreImageUrl(): string {
    return `https://static.openfoodfacts.org/images/attributes/nutriscore-${this.product.nutriscore_grade}.svg`;
  }

  get novaImageUrl(): string {
    return `https://static.openfoodfacts.org/images/attributes/nova-group-${this.product.nova_group}.svg`;
  }

  get ecoScoreImageUrl(): string {
    return `https://static.openfoodfacts.org/images/attributes/ecoscore-${this.product.ecoscore_grade}.svg`;
  }

  get hasNutriScore(): boolean {
    return this.type == 'nutriscore' && !!this.product.nutriscore_grade;
  }

  get hasNova(): boolean {
    return this.type == 'nova' && !!this.product.nova_group;
  }

  get hasEcoScore(): boolean {
    return (
      this.type == 'ecoscore' &&
      !!this.product.ecoscore_grade &&
      this.product.ecoscore_grade !== 'unknown' &&
      this.product.ecoscore_grade !== 'not-applicable'
    );
  }
}
