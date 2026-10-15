import React from 'react';

export function DurationBadge({ duration }) {
  if (!duration) return null;
  const trimmed = duration.trim();

  // Case 1: Stacked letters case e.g. "5-6 letters during Autumn Term"
  const lettersMatch = trimmed.match(/^(\d+(?:-\d+)?)\s+letters\s+during\s+(.+)$/i);
  if (lettersMatch) {
    const termText = lettersMatch[2].replace(/\s*2026/g, '').trim();
    return (
      <span className="dur-group dur-stacked">
        <span className="dur-num">{lettersMatch[1]}</span>
        <span className="dur-stacked-text">
          <span>letters during</span>
          <span>{termText}</span>
        </span>
      </span>
    );
  }

  // Case 2: Multi-duration with slash e.g. "4-5 hours per month / 3-4 years"
  const slashMatch = trimmed.match(/^(\d+(?:-\d+)?(?:\.\d+)?)\s+([^/]+?)\s*\/\s*(\d+(?:-\d+)?(?:\.\d+)?)\s+(.+)$/i);
  if (slashMatch) {
    const isHoursPerMonth = slashMatch[2].trim().toLowerCase().includes('hour');
    const unit2Text = slashMatch[4].trim().toLowerCase() === 'years' ? 'Years' : slashMatch[4].trim();
    return (
      <span className="dur-group dur-two-part">
        <span className="dur-item">
          <span className="dur-num">{slashMatch[1]}</span>
          {isHoursPerMonth ? (
            <span className="dur-stacked-text">
              <span>hour per</span>
              <span>month</span>
            </span>
          ) : (
            <span className="dur-unit">{slashMatch[2].trim()}</span>
          )}
        </span>
        <span className="dur-item">
          <span className="dur-num">{slashMatch[3]}</span>
          <span className="dur-unit">{unit2Text}</span>
        </span>
      </span>
    );
  }

  // Case 3: Multi-number range e.g. "30 minutes to 1.5 hours"
  const multiMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s+minutes\s+to\s+(\d+(?:\.\d+)?)\s+hours$/i);
  if (multiMatch) {
    return (
      <span className="dur-group">
        <span className="dur-num">{multiMatch[1]}</span>
        <span className="dur-unit">minutes to</span>
        <span className="dur-num">{multiMatch[2]}</span>
        <span className="dur-unit">hours</span>
      </span>
    );
  }

  // Case 4: Standard number + unit e.g. "30 minutes", "2-3 hours", "3 hours", "1-2 hours", "1-5 hours", "1-2 hour session"
  const singleMatch = trimmed.match(/^(\d+(?:-\d+)?(?:\.\d+)?)\s+(.+)$/);
  if (singleMatch) {
    return (
      <span className="dur-group">
        <span className="dur-num">{singleMatch[1]}</span>
        <span className="dur-unit">{singleMatch[2]}</span>
      </span>
    );
  }

  // Case 5: Text only e.g. "Flexible Timing"
  return (
    <span className="dur-group">
      <span className="dur-unit dur-text-only">{trimmed}</span>
    </span>
  );
}

export function DetailDurationBadge({ duration, opp }) {
  if (!duration) return null;
  const trimmed = duration.trim();
  const title = (opp && opp.title) || '';
  const isGovernorOrTrustee =
    (opp && opp.gradeSuitability) ||
    title.toLowerCase().includes('governor') ||
    title.toLowerCase().includes('trustee');

  const slashMatch = trimmed.match(/^(\d+(?:-\d+)?(?:\.\d+)?)\s+([^/]+?)\s*\/\s*(\d+(?:-\d+)?(?:\.\d+)?)\s+(.+)$/i);

  if (isGovernorOrTrustee) {
    const num1 = slashMatch ? slashMatch[1] : '4-5';
    const num2 = slashMatch ? slashMatch[3] : '3-4';
    const unit2 = slashMatch && slashMatch[4].trim().toLowerCase() === 'years' ? 'Years' : (slashMatch ? slashMatch[4].trim() : 'Years');
    return (
      <div className="detail-duration-extended">
        <div className="detail-suitability">
          <span className="suitability-label">Opportunity suitable for:</span>
          <strong className="suitability-grade">All grades</strong>
        </div>
        <div className="detail-dur-metrics">
          <div className="detail-dur-item">
            <span className="detail-dur-num">{num1}</span>
            <span className="detail-dur-stacked">
              <span>hours</span>
              <span>per month</span>
            </span>
          </div>
          <div className="detail-dur-item">
            <span className="detail-dur-num">{num2}</span>
            <span className="detail-dur-unit">{unit2}</span>
          </div>
        </div>
      </div>
    );
  }

  if (slashMatch) {
    const unit2Text = slashMatch[4].trim().toLowerCase() === 'years' ? 'Years' : slashMatch[4].trim();
    return (
      <div className="detail-dur-metrics">
        <div className="detail-dur-item">
          <span className="detail-dur-num">{slashMatch[1]}</span>
          <span className="detail-dur-stacked">
            <span>hours</span>
            <span>per month</span>
          </span>
        </div>
        <div className="detail-dur-item">
          <span className="detail-dur-num">{slashMatch[3]}</span>
          <span className="detail-dur-unit">{unit2Text}</span>
        </div>
      </div>
    );
  }

  // Multi-range e.g. "30 minutes to 1.5 hours"
  const multiMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s+minutes\s+to\s+(\d+(?:\.\d+)?)\s+hours$/i);
  if (multiMatch) {
    return (
      <>
        <span className="detail-dur-num">{multiMatch[1]}</span>
        <span className="detail-dur-unit">minutes to</span>
        <span className="detail-dur-num">{multiMatch[2]}</span>
        <span className="detail-dur-unit">hours</span>
      </>
    );
  }

  // Standard Number + unit e.g. "30 minutes", "1-2 hours", "5-6 letters during Autumn Term"
  const match = trimmed.match(/^(\d+(?:-\d+)?(?:\.\d+)?)\s+(.+)$/i);
  if (match) {
    const term = match[2].replace(/\s*2026/g, '').trim();
    return (
      <>
        <span className="detail-dur-num">{match[1]}</span>
        <span className="detail-dur-unit">{term}</span>
      </>
    );
  }

  return <span className="detail-dur-unit">{trimmed}</span>;
}

export default DurationBadge;
