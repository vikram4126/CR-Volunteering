import { APP_ICONS } from '../data/icons';

export function getVolunteeringSvg(name, isActive) {
  if (!APP_ICONS) return '';
  const dict = isActive ? APP_ICONS.volunteeringWhite : APP_ICONS.volunteeringBlue;
  if (dict && dict[name]) return dict[name];
  if (dict) {
    const cleanName = name.toLowerCase().replace('.svg', '');
    for (const k in dict) {
      if (k.toLowerCase().includes(cleanName)) {
        return dict[k];
      }
    }
  }
  return '';
}

export function getBenefitBlueSvg(benefitName, isWhite = false) {
  if (!APP_ICONS) return '';
  const dict = APP_ICONS.benefitsBlue;
  let svg = dict ? (dict[benefitName + '.svg'] || '') : '';
  if (!svg && dict) {
    const cleanName = benefitName.toLowerCase();
    for (const k in dict) {
      if (k.toLowerCase().includes(cleanName)) {
        svg = dict[k];
        break;
      }
    }
  }
  if (isWhite && svg) {
    return svg
      .replace(/stroke="#1E49E2"/gi, 'stroke="#FFFFFF"')
      .replace(/stroke="#00338D"/gi, 'stroke="#FFFFFF"')
      .replace(/stroke="#[0-9a-fA-F]{6}"/gi, 'stroke="#FFFFFF"')
      .replace(/fill="#1E49E2"/gi, 'fill="#FFFFFF"')
      .replace(/fill="#00338D"/gi, 'fill="#FFFFFF"');
  }
  if (svg) {
    return svg
      .replace(/stroke="#1E49E2"/gi, 'stroke="#00338D"')
      .replace(/fill="#1E49E2"/gi, 'fill="#00338D"');
  }
  return svg;
}

export function getBenefitCircleSvg(benefitName) {
  if (!APP_ICONS) return '';
  const dict = APP_ICONS.benefitsCircle;
  if (dict && dict[benefitName + '.svg']) {
    return dict[benefitName + '.svg'];
  }
  if (dict) {
    const cleanName = benefitName.toLowerCase();
    for (const k in dict) {
      if (k.toLowerCase().includes(cleanName)) {
        return dict[k];
      }
    }
  }
  return '';
}
