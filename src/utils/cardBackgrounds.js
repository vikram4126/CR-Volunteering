// Helper to retrieve specific card background image
const bgModules = import.meta.glob('../assets/card-backgrounds/*.png', { eager: true, import: 'default' });

export function getCardBackgroundImage(name, isTab = false) {
  if (!name) return '';
  const clean = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-&]/g, '');
  const cleanWithAnd = clean.replace(/&/g, 'and');
  const cleanWithAmp = clean.replace(/and/g, '&');

  const candidates = isTab
    ? [
        `tab-${clean}.png`,
        `tab-${cleanWithAnd}.png`,
        `tab-${cleanWithAmp}.png`,
        `${clean}.png`,
        `${cleanWithAnd}.png`,
        `${cleanWithAmp}.png`
      ]
    : [
        `${clean}.png`,
        `${cleanWithAnd}.png`,
        `${cleanWithAmp}.png`
      ];

  for (const filename of candidates) {
    const key = `../assets/card-backgrounds/${filename}`;
    if (bgModules[key]) {
      return bgModules[key];
    }
  }

  // Fallback to relative URL from public/assets if not in bundled modules
  const fallbackFile = candidates[0];
  return `./assets/card-backgrounds/${fallbackFile}`;
}

export default getCardBackgroundImage;
