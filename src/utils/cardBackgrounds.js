import {
  getCardBackgroundImage as getSvgCardBg,
  CARD_BACKGROUND_SVGS,
  CARD_BACKGROUND_DATA_URIS
} from '../data/cardBackgroundsSvg';

export { CARD_BACKGROUND_SVGS, CARD_BACKGROUND_DATA_URIS };

export function getCardBackgroundImage(name, isTab = false) {
  return getSvgCardBg(name, isTab);
}

export default getCardBackgroundImage;
