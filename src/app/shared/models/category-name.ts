import { LocalizedName } from './localized-name';

export interface CategoryName extends LocalizedName {
  url: string;
  products: number;
}
