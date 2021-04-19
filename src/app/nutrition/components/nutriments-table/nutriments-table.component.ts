import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Nutriments } from '../../model/nutriments';
import { NutritientName } from '../../model/nutritient-name';
import { selectNutritienNames } from '../../store/nutrition.selector';

@Component({
  selector: 'app-nutriments-table',
  templateUrl: './nutriments-table.component.html',
  styleUrls: ['./nutriments-table.component.scss']
})
export class NutrimentsTableComponent implements OnInit {

  @Input()
  nutriments: Nutriments;

  @Input()
  nutritionDataPer:string;

  public nutrimentsToDisplay: NutritientName[];
  // = [
  //   'energy', 'energy-kcal', 'proteins', 'casein', 'serum-proteins', 'nucleotides', 'carbohydrates', 'sugars', 'sucrose', 'glucose', 'fructose', 'lactose', 'maltose', 'maltodextrins', 'starch', 'polyols', 'fat', 'saturated-fat', 'butyric-acid', 'caproic-acid', 'caprylic-acid', 'capric-acid', 'lauric-acid', 'myristic-acid', 'palmitic-acid', 'stearic-acid', 'arachidic-acid', 'behenic-acid', 'lignoceric-acid', 'cerotic-acid', 'montanic-acid', 'melissic-acid', 'monounsaturated-fat', 'polyunsaturated-fat', 'omega-3-fat', 'alpha-linolenic-acid', 'eicosapentaenoic-acid', 'docosahexaenoic-acid', 'omega-6-fat', 'linoleic-acid', 'arachidonic-acid', 'gamma-linolenic-acid', 'dihomo-gamma-linolenic-acid', 'omega-9-fat', 'oleic-acid', 'elaidic-acid', 'gondoic-acid', 'mead-acid', 'erucic-acid', 'nervonic-acid', 'trans-fat', 'cholesterol', 'fiber', 'sodium', 'alcohol: % vol of alcohol', 'vitamin-a', 'vitamin-d', 'vitamin-e', 'vitamin-k', 'vitamin-c', 'vitamin-b1', 'vitamin-b2', 'vitamin-pp', 'vitamin-b6', 'vitamin-b9', 'vitamin-b12', 'biotin', 'pantothenic-acid', 'silica', 'bicarbonate', 'potassium', 'chloride', 'calcium', 'phosphorus', 'iron', 'magnesium', 'zinc', 'copper', 'manganese', 'fluoride', 'selenium', 'chromium', 'molybdenum', 'iodine', 'caffeine', 'taurine'
  // ];

  constructor(private store: Store) {
    this.store.select(selectNutritienNames).subscribe(nutritionNames =>
      this.nutrimentsToDisplay = nutritionNames);
  }

  ngOnInit(): void {
  }

  showNutriment(key: string): boolean {
    return Object.keys(this.nutriments).indexOf(this.clearKey(key)) >= 0;
  }

  getNutrimentValue<K extends keyof Nutriments>(key: string): string {
    const checkedKey = this.clearKey(key) as unknown as K;
    const value = this.prop(this.nutriments, checkedKey);
    return String(value);
  }

  private clearKey(key: string): string {
    return key.replace('en:', '');
  }

  private prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }
}
