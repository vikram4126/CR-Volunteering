import React from 'react';
import CardsGrid from './CardsGrid';
import OpportunityDetail from './OpportunityDetail';
import FelixSpecialView from './FelixSpecialView';

export function MiddleSection({
  category,
  selectedOpportunity,
  categoryOpportunities,
  onSelectOpportunity,
  onBack
}) {
  return (
    <div className="middle-section">
      <div className="section-header">
        <h2 className="header-2" id="middleHeading">{category.name}</h2>
        <div className="divider-line" />
        {selectedOpportunity && (
          <button
            className="btn-back"
            id="btnBack"
            onClick={onBack}
            type="button"
          >
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6.5 1.5L1.5 6.5L6.5 11.5" />
            </svg>
            <span>Back</span>
          </button>
        )}
      </div>

      <div id="middleContent">
        {selectedOpportunity ? (
          selectedOpportunity.isFelixSpecial && selectedOpportunity.subPrograms ? (
            <FelixSpecialView opp={selectedOpportunity} />
          ) : (
            <OpportunityDetail opp={selectedOpportunity} />
          )
        ) : (
          <CardsGrid
            opportunities={categoryOpportunities}
            onSelectOpportunity={onSelectOpportunity}
          />
        )}
      </div>
    </div>
  );
}

export default MiddleSection;
