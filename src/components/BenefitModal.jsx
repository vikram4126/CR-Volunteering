import React, { useEffect } from 'react';
import { ArrowRightIcon } from '../utils/arrowIcons';

export function BenefitModal({
  benefitName,
  opportunities,
  onClose,
  onSelectOpportunity
}) {
  useEffect(() => {
    if (!benefitName) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [benefitName, onClose]);

  if (!benefitName) return null;

  const matchingOpps = opportunities.filter((o) =>
    o.benefits.includes(benefitName)
  );
  const countFormatted =
    matchingOpps.length < 10 ? `0${matchingOpps.length}` : `${matchingOpps.length}`;

  const handleOverlayClick = (e) => {
    if (e.target.id === 'modalOverlay') {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay show"
      id="modalOverlay"
      onClick={handleOverlayClick}
    >
      <div className="modal-panel">
        <div className="modal-header">
          <div className="modal-header-info">
            <h3 id="modalBenefitTitle">{benefitName}</h3>
            <p id="modalBenefitCount">
              {countFormatted} opportunities provide this benefit.
            </p>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            title="Close"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-list" id="modalOpportunityList">
            {matchingOpps.map((opp) => (
              <div
                key={opp.id}
                className="modal-item"
                onClick={() => onSelectOpportunity(opp.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectOpportunity(opp.id);
                  }
                }}
              >
                <div className="modal-item-left">
                  <div className="modal-item-cat">{opp.categoryName}</div>
                  <div className="modal-item-title">{opp.title}</div>
                </div>
                <div className="modal-item-arrow">
                  <ArrowRightIcon size={17} strokeWidth={2.6} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BenefitModal;
