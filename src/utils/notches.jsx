import React from 'react';

// 1. Bottom-Right Notch for Middle Section Cards
export function NotchBR() {
  return (
    <svg className="notch-br" viewBox="0 0 72 72" fill="none" preserveAspectRatio="none">
      <path d="M 72 0 C 72 9.941 63.941 18 54 18 H 36 C 26.059 18 18 26.059 18 36 V 54 C 18 63.941 9.941 72 0 72 H 72 V 0 Z" fill="#EEF2F8"/>
    </svg>
  );
}

// 2. Bottom-Left Notch for Right Benefits Cards
export function NotchBL() {
  return (
    <svg className="notch-bl" viewBox="0 0 66 66" fill="none" preserveAspectRatio="none">
      <path d="M 0 0 C 0 8.837 7.163 16 16 16 H 34 C 42.837 16 50 23.163 50 32 V 50 C 50 58.837 57.163 66 66 66 H 0 V 0 Z" fill="#EEF2F8"/>
    </svg>
  );
}

// 3. Top-Right Notch for Left Sidebar Tabs
export function NotchTR() {
  return (
    <svg className="notch-tr" viewBox="0 0 76 76" fill="none" preserveAspectRatio="none">
      <path d="M 0 0 C 9.941 0 18 8.059 18 18 V 40.846 C 18 50.787 26.059 58.846 36 58.846 H 58 C 67.941 58.846 76 66.905 76 76.846 V 0 H 0 Z" fill="#EEF2F8"/>
    </svg>
  );
}
