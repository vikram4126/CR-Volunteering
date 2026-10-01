import React from 'react';
import { NotchBR } from '../utils/notches';
import { getBenefitCircleSvg } from '../utils/iconHelpers';
import { DurationBadge } from '../utils/formatDuration';

export function OpportunityCard({ opp, onSelect }) {
  return (
    <div className="opp-card" onClick={() => onSelect(opp.id)}>
      <NotchBR />
      <button
        className="opp-arrow"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(opp.id);
        }}
        title="View Details"
        type="button"
      >
        →
      </button>

      <div className="opp-card-content">
        <h3 className="opp-title">{opp.title}</h3>
        <p className="opp-desc">{opp.description}</p>
      </div>

      <div>
        <div className="opp-badges">
          {opp.benefits.map((b) => {
            const svg = getBenefitCircleSvg(b);
            return (
              <div
                key={b}
                className="mini-badge"
                title={b}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            );
          })}
        </div>

        <div className="opp-footer">
          <div className="opp-duration">
            <DurationBadge duration={opp.duration} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpportunityCard;
