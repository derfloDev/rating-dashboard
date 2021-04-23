export interface ImageSources {
  fr: string;
  en: string;
  de: string;
}

export interface ImageSizes {
  small: ImageSources;
  display: ImageSources;
  thumb: ImageSources;
}

export interface SelectedImages {
  front: ImageSizes;
  ingredients: ImageSizes;
  nutrition: ImageSizes;
}
