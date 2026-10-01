import React from 'react';
import OpportunityCard from './OpportunityCard';

export function CardsGrid({ opportunities, onSelectOpportunity }) {
  return (
    <div className="cards-grid">
      {opportunities.map((opp) => (
        <OpportunityCard
          key={opp.id}
          opp={opp}
          onSelect={onSelectOpportunity}
        />
      ))}
    </div>
  );
}

export default CardsGrid;
