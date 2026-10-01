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

  // Case 2: Multi-number range e.g. "30 minutes to 1.5 hours"
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

  // Case 3: Standard number + unit e.g. "30 minutes", "2-3 hours", "3 hours", "1-2 hours", "1-5 hours", "1-2 hour session"
  const singleMatch = trimmed.match(/^(\d+(?:-\d+)?(?:\.\d+)?)\s+(.+)$/);
  if (singleMatch) {
    return (
      <span className="dur-group">
        <span className="dur-num">{singleMatch[1]}</span>
        <span className="dur-unit">{singleMatch[2]}</span>
      </span>
    );
  }

  // Case 4: Text only e.g. "Flexible Timing"
  return (
    <span className="dur-group">
      <span className="dur-unit dur-text-only">{trimmed}</span>
    </span>
  );
}

export default DurationBadge;
