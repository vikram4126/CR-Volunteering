import React, { useState, useEffect } from 'react';
import initialCategories from './data/categories';
import initialOpportunities from './data/opportunities';
import initialBenefits from './data/benefits';

import Sidebar from './components/Sidebar';
import MiddleSection from './components/MiddleSection';
import BenefitsSection from './components/BenefitsSection';
import BenefitModal from './components/BenefitModal';

export function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [allBenefits, setAllBenefits] = useState(initialBenefits);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(null);
  const [activeModalBenefit, setActiveModalBenefit] = useState(null);

  // Dynamically load updated opportunities and categories from data.json if available
  useEffect(() => {
    fetch('./data.json')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('No dynamic data.json');
      })
      .then((json) => {
        if (json.opportunities && Array.isArray(json.opportunities)) {
          setOpportunities(json.opportunities);
        }
        if (json.categories && Array.isArray(json.categories)) {
          setCategories(json.categories);
        }
        if (json.allBenefits && Array.isArray(json.allBenefits)) {
          setAllBenefits(json.allBenefits);
        }
      })
      .catch(() => {
        // Fall back seamlessly to imported opportunities.json
      });
  }, []);

  // Derive active states
  const activeCategory =
    categories.find((c) => c.id === currentCategory) || categories[0];
  const categoryOpportunities = opportunities.filter(
    (o) => o.category === currentCategory
  );
  const selectedOpportunity = selectedOpportunityId
    ? opportunities.find((o) => o.id === selectedOpportunityId) || null
    : null;

  // Scroll helper: smoothly scrolls viewport to the middle section header
  // so that the opportunity detail view and Back button are immediately visible in view
  const scrollToDetailView = () => {
    const executeScroll = (behavior = 'smooth') => {
      try {
        const target =
          document.querySelector('.middle-section .section-header') ||
          document.getElementById('middleHeading') ||
          document.querySelector('.middle-section');

        if (!target) return;

        // Check if there is an ancestor scroll pane in Dialogue CMS host page
        let scrollableParent = null;
        let p = target.parentElement;
        while (p && p !== document.body && p !== document.documentElement) {
          const style = window.getComputedStyle(p);
          const overflowY = style.overflowY;
          if ((overflowY === 'auto' || overflowY === 'scroll') && p.scrollHeight > p.clientHeight) {
            scrollableParent = p;
            break;
          }
          p = p.parentElement;
        }

        if (scrollableParent) {
          const parentRect = scrollableParent.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const offsetTop = targetRect.top - parentRect.top + scrollableParent.scrollTop - 14;
          scrollableParent.scrollTo({
            top: Math.max(0, offsetTop),
            behavior: behavior
          });
        } else {
          const targetRect = target.getBoundingClientRect();
          const targetY = window.pageYOffset + targetRect.top - 14;
          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: behavior
          });
        }

        if (typeof target.scrollIntoView === 'function') {
          target.scrollIntoView({ behavior: behavior, block: 'start', inline: 'nearest' });
        }
      } catch (e) {
        console.warn('Scroll to detail error:', e);
      }
    };

    executeScroll('smooth');
    requestAnimationFrame(() => executeScroll('smooth'));
    setTimeout(() => executeScroll('smooth'), 50);
    setTimeout(() => executeScroll('smooth'), 150);

    // Dialogue CMS & Webview Fallback: If smooth scroll was interrupted or not supported,
    // verify after 260ms that target is in view. If still scrolled away, do instant snap.
    setTimeout(() => {
      const target = document.querySelector('.middle-section .section-header') || document.getElementById('middleHeading');
      if (target) {
        const r = target.getBoundingClientRect();
        if (r.top > 80 || r.top < -40) {
          executeScroll('auto');
        }
      }
    }, 260);
  };

  // Whenever an opportunity is selected, automatically scroll to detail view with back button
  useEffect(() => {
    if (selectedOpportunityId) {
      scrollToDetailView();
      if (typeof window.fixDialogueParentHeight === 'function') {
        window.fixDialogueParentHeight();
        setTimeout(window.fixDialogueParentHeight, 100);
      }
    }
  }, [selectedOpportunityId]);

  // Handlers
  const handleSelectCategory = (catIndex) => {
    if (catIndex === 3) {
      // Own Choice Volunteering is an external link - open directly in a new tab without altering current active tab
      const ownChoiceCat = categories.find((c) => c.id === 3);
      const url = (ownChoiceCat && ownChoiceCat.externalUrl) || 'https://kpmgoneuk.sharepoint.com/:u:/r/sites/gb-oi-bus-CR/SitePages/Self-organised-volunteering.aspx?d=wad309bffe9fa428cbbf8474ab7634d9e&csf=1&web=1&e=HwAnXs';
      window.open(url, '_blank');
      return;
    }
    setCurrentCategory(catIndex);
    setSelectedOpportunityId(null);
    // User requested: "agar user ne home based working per kiya to normal koi scroll nahi"
  };

  const handleSelectOpportunity = (oppId) => {
    setSelectedOpportunityId(oppId);
    const opp = opportunities.find((o) => o.id === oppId);
    if (opp && opp.category !== currentCategory) {
      setCurrentCategory(opp.category);
    }
    scrollToDetailView();
  };

  const handleBack = () => {
    setSelectedOpportunityId(null);
    scrollToDetailView();
  };

  const handleOpenBenefitModal = (benefitName) => {
    setActiveModalBenefit(benefitName);
  };

  const handleCloseModal = () => {
    setActiveModalBenefit(null);
  };

  const handleSelectOpportunityFromModal = (oppId) => {
    setActiveModalBenefit(null);
    handleSelectOpportunity(oppId);
  };

  return (
    <>
      <div className="app-container">
        {/* LEFT SIDEBAR */}
        <Sidebar
          categories={categories}
          currentCategory={currentCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* MIDDLE SECTION */}
        <MiddleSection
          category={activeCategory}
          selectedOpportunity={selectedOpportunity}
          categoryOpportunities={categoryOpportunities}
          onSelectOpportunity={handleSelectOpportunity}
          onBack={handleBack}
        />

        {/* RIGHT BENEFITS COLUMN */}
        <BenefitsSection
          allBenefits={allBenefits}
          selectedOpportunity={selectedOpportunity}
          onOpenBenefitModal={handleOpenBenefitModal}
        />
      </div>

      {/* BENEFIT OPPORTUNITY LIST MODAL */}
      <BenefitModal
        benefitName={activeModalBenefit}
        opportunities={opportunities}
        onClose={handleCloseModal}
        onSelectOpportunity={handleSelectOpportunityFromModal}
      />
    </>
  );
}

export default App;
