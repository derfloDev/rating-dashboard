import { LocalizedName } from './localized-name';

export interface BrandName extends LocalizedName {
  parents: string[];
}
