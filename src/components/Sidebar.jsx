import React from 'react';
import { NotchTR } from '../utils/notches';
import { getVolunteeringSvg } from '../utils/iconHelpers';
import { ArrowRightIcon } from '../utils/arrowIcons';
import { getCardBackgroundImage } from '../utils/cardBackgrounds';

export function Sidebar({ categories, currentCategory, onSelectCategory }) {
  return (
    <div className="sidebar" id="sidebarNav">
      {categories.map((cat) => {
        const isActive = cat.id === currentCategory;
        const iconSvg = getVolunteeringSvg(cat.iconName, isActive);
        const bgImg = getCardBackgroundImage(cat.name, true);
        const bgStyle = !isActive
          ? { backgroundImage: `url("${bgImg}")` }
          : {};

        return (
          <div
            key={cat.id}
            className={`tab-card ${isActive ? 'active' : ''}`}
            style={bgStyle}
            onClick={() => onSelectCategory(cat.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectCategory(cat.id);
              }
            }}
          >
            <NotchTR />
            <div className="tab-go">
              <ArrowRightIcon size={18} strokeWidth={2.6} />
            </div>
            <div className="tab-card-top">
              <div
                className="tab-icon"
                dangerouslySetInnerHTML={{ __html: iconSvg }}
              />
            </div>
            <div className="tab-card-bottom">
              <h3 className="tab-title header-3">{cat.name}</h3>
              {cat.subtitle && <div className="tab-subtitle">{cat.subtitle}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;
