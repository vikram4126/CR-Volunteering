import React from 'react';
import { NotchBR } from '../utils/notches';
import { getBenefitCircleSvg } from '../utils/iconHelpers';
import { DurationBadge } from '../utils/formatDuration';
import { ArrowRightIcon } from '../utils/arrowIcons';

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
        <ArrowRightIcon size={20} strokeWidth={2.6} />
      </button>

      <div className="opp-card-content">
        <h3
          className={`opp-title header-3 ${
            opp.title.trim().split(/\s+/).length <= 3 ? 'short-title' : ''
          }`}
        >
          {opp.title}
        </h3>
        <p className="opp-desc">{opp.cardDescription || opp.description}</p>
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
