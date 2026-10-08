import React from 'react';
import { getBenefitBlueSvg } from '../utils/iconHelpers';
import { benefitImpactDescriptions } from '../data/benefits';
import { DetailDurationBadge } from '../utils/formatDuration';

export function OpportunityDetail({ opp }) {
  if (!opp) return null;

  const mailSubject = encodeURIComponent(`Enquiry - ${opp.title}`);
  const hasExplicitUrl = opp.enquireUrl !== undefined;
  const rawHref = hasExplicitUrl
    ? opp.enquireUrl
    : (opp.linkUrl || `mailto:CorporateResponsibility&Sustainability@kpmg.co.uk?subject=${mailSubject}`);
  const isBlank = !rawHref || rawHref === '#';
  const enquireHref = isBlank ? '#' : rawHref;
  const isExternal =
    enquireHref.startsWith('http://') || enquireHref.startsWith('https://');
  const contactNote =
    opp.contactNote !== undefined
      ? opp.contactNote
      : 'If you are interested in this opportunity, please get in touch below';
  const buttonLabel =
    opp.buttonText || (isExternal ? 'Register now' : 'Enquire now');
  const metaItems =
    opp.metaDetails ||
    [
      opp.location && { label: 'Location:', value: opp.location },
      opp.timeCommitment && { label: 'Time commitment:', value: opp.timeCommitment },
      opp.dates && { label: 'Dates:', value: opp.dates }
    ].filter(Boolean);

  return (
    <div className="card-detail-view">
      <div>
        <div className="detail-header">
          <h2 className="detail-title header-2">{opp.title}</h2>
          <div className="detail-duration">
            <DetailDurationBadge duration={opp.duration} />
          </div>
        </div>
        <div className="detail-desc">
          <div
            className="detail-desc-text"
            dangerouslySetInnerHTML={{ __html: opp.description }}
          />
          {metaItems.length > 0 && (
            <div className="detail-meta-list">
              {metaItems.map((item, idx) => (
                <div key={idx} className="detail-meta-row">
                  <span className="detail-meta-label">{item.label}</span>
                  <span className="detail-meta-value">{item.value}</span>
                </div>
              ))}
            </div>
          )}
          {opp.additionalText && (
            <div
              className="detail-additional-text"
              dangerouslySetInnerHTML={{ __html: opp.additionalText }}
            />
          )}
        </div>

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
                  <h4 className="header-4">{b}</h4>
                  <p>{customDesc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="detail-footer">
        <div
          className="detail-contact-note"
          dangerouslySetInnerHTML={{ __html: contactNote }}
        />
        <a
          href={enquireHref}
          className={`btn-enquire ${isBlank ? 'btn-disabled' : ''}`}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          onClick={isBlank ? (e) => e.preventDefault() : undefined}
        >
          <span>{buttonLabel}</span>
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
