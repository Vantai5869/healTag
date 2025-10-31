import HeroDefault from './Hero.default';
import HeroV2 from './Hero.v2';
import HeroV3 from './Hero.v3';
import { heroVariantLabels } from './Hero.base';

export const heroVariants = {
  default: HeroDefault,
  variant1: HeroV2,
  variant2: HeroV3,
};

export { heroVariantLabels };


