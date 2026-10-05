import React from 'react';
import { NotchBR } from '../utils/notches';
import { DetailDurationBadge } from '../utils/formatDuration';
import { ArrowRightIcon } from '../utils/arrowIcons';

export function FelixSpecialView({ opp }) {
  if (!opp || !opp.subPrograms) return null;

  return (
    <div className="felix-view">
      <div className="felix-banner">
        <div className="felix-banner-header">
          <h2 className="felix-banner-title">{opp.title}</h2>
          <div className="felix-banner-duration">
            <DetailDurationBadge duration={opp.duration} />
          </div>
        </div>
        <p className="felix-banner-desc">{opp.description}</p>
      </div>

      <div className="felix-cards-grid">
        {opp.subPrograms.map((sp, idx) => {
          const targetUrl = sp.linkUrl || 'https://www.kpmg.com';
          const isMail = targetUrl.startsWith('mailto:');
          const linkProps = isMail
            ? {}
            : { target: '_blank', rel: 'noopener noreferrer' };

          return (
            <div key={idx} className="felix-card">
              <NotchBR />
              <a
                href={targetUrl}
                {...linkProps}
                className="opp-arrow"
                title={sp.linkText}
              >
                <ArrowRightIcon size={20} strokeWidth={2.6} />
              </a>
              <div>
                <h3 className="felix-card-title">{sp.title}</h3>
                <p className="felix-card-desc">{sp.description}</p>
              </div>
              <div className="felix-card-footer">
                <a href={targetUrl} {...linkProps} className="felix-card-link">
                  {sp.linkText}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FelixSpecialView;
