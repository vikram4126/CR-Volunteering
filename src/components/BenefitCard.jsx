import React from 'react';
import { NotchBL } from '../utils/notches';
import { getBenefitBlueSvg } from '../utils/iconHelpers';

export function BenefitCard({ benefitName, isActive, isDimmed, onClick }) {
  const iconSvg = getBenefitBlueSvg(benefitName, isActive);
  const bgFilename = benefitName.toLowerCase().replace(/\s+/g, '-');
  const bgStyle = !isActive
    ? { backgroundImage: `url('/assets/card-backgrounds/${bgFilename}.png')` }
    : {};

  return (
    <div
      className={`benefit-card ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
      style={bgStyle}
      data-benefit={benefitName}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      title={`View opportunities for ${benefitName}`}
    >
      <NotchBL />
      <div className="benefit-arrow-btn">←</div>
      <div
        className={`benefit-card-title ${
          benefitName.trim().split(/\s+/).length <= 3 ? 'short-title' : ''
        }`}
      >
        {benefitName}
      </div>
      <div className="benefit-card-bottom">
        <div
          className="benefit-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: iconSvg }}
        />
      </div>
    </div>
  );
}

export default BenefitCard;
