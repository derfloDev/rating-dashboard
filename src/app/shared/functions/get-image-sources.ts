import { ImageSources } from '../models/image.model';

const defaultImage = '/assets/images/placeholder.jpg';

const getImageSource = (sources: ImageSources): string => {
  if (!!sources) {
    if (!!sources.de) {
      return sources.de;
    } else if (!!sources.en) {
      return sources.en;
    } else if (!!sources.fr) {
      return sources.fr;
    }
  }
  return defaultImage;
};

export default getImageSource;
