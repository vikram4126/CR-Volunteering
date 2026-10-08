import React from 'react';
import BenefitCard from './BenefitCard';

export function BenefitsSection({
  allBenefits,
  selectedOpportunity,
  onOpenBenefitModal
}) {
  return (
    <div className="benefits-section">
      <div className="section-header">
        <h2 className="header-2">Benefits</h2>
        <div className="divider-line" />
      </div>
      <div className="benefits-grid" id="benefitsGrid">
        {allBenefits.map((benefitName) => {
          let isActive = false;
          let isDimmed = false;

          if (selectedOpportunity) {
            if (selectedOpportunity.benefits.includes(benefitName)) {
              isActive = true;
            } else {
              isDimmed = true;
            }
          }

          return (
            <BenefitCard
              key={benefitName}
              benefitName={benefitName}
              isActive={isActive}
              isDimmed={isDimmed}
              onClick={() => onOpenBenefitModal(benefitName)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BenefitsSection;
