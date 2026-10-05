import React from 'react';
import { getBenefitBlueSvg } from '../utils/iconHelpers';
import { benefitImpactDescriptions } from '../data/benefits';
import { DetailDurationBadge } from '../utils/formatDuration';

export function OpportunityDetail({ opp }) {
  if (!opp) return null;

  const mailSubject = encodeURIComponent(`Enquiry - ${opp.title}`);
  const enquireHref =
    opp.enquireUrl ||
    opp.linkUrl ||
    `mailto:uk-fmcorporateresponsibility@kpmg.co.uk?subject=${mailSubject}`;
  const isExternal =
    enquireHref.startsWith('http://') || enquireHref.startsWith('https://');
  const contactNote =
    opp.contactNote ||
    'If you are interested in this opportunity contact uk-fm corporate responsibility';

  return (
    <div className="card-detail-view">
      <div>
        <div className="detail-header">
          <h2 className="detail-title">{opp.title}</h2>
          <div className="detail-duration">
            <DetailDurationBadge duration={opp.duration} />
          </div>
        </div>
        <p className="detail-desc">{opp.description}</p>

        <div className="detail-benefits-grid">
          {opp.benefits.map((b) => {
            const iconSvg = getBenefitBlueSvg(b);
            const customDesc =
              (opp.benefitsDetails && opp.benefitsDetails[b]) ||
              benefitImpactDescriptions[b] ||
              'Enhance your professional and personal capabilities through this volunteering initiative';

            return (
              <div key={b} className="detail-benefit-item" data-benefit={b}>
                <div
                  className="detail-benefit-icon"
                  dangerouslySetInnerHTML={{ __html: iconSvg }}
                />
                <div className="detail-benefit-info">
                  <h4>{b}</h4>
                  <p>{customDesc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="detail-footer">
        <div className="detail-contact-note">{contactNote}</div>
        <a
          href={enquireHref}
          className="btn-enquire"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          <span>Enquire now</span>
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
            <path d="M1.5 1.5L6.5 6.5L1.5 11.5" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default OpportunityDetail;
