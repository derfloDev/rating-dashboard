import { ImageSources } from '../models/image.model';

const getImageSource = (sources: ImageSources): string => {
  if (!!sources.de) {
    return sources.de;
  } else if (!!sources.en) {
    return sources.en;
  }
  return sources.fr;
};

export default getImageSource;
