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

  // Scroll helper to jump back up to top of middle section / activity detail
  const scrollToMiddleTop = () => {
    const executeScroll = () => {
      try {
        const root = document.documentElement;
        const prevBehavior = root ? root.style.scrollBehavior : '';
        if (root) root.style.scrollBehavior = 'auto';

        const target =
          document.getElementById('middleHeading') ||
          document.querySelector('.card-detail-view') ||
          document.querySelector('.felix-view') ||
          document.querySelector('.middle-section') ||
          document.querySelector('.app-container');

        if (target && typeof target.scrollIntoView === 'function') {
          target.scrollIntoView({ behavior: 'auto', block: 'start' });
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        }
        if (document.body) {
          document.body.scrollTop = 0;
        }

        if (root) {
          setTimeout(() => {
            root.style.scrollBehavior = prevBehavior;
          }, 50);
        }
      } catch (e) {
        console.warn('Scroll to detail error:', e);
      }
    };

    executeScroll();
    requestAnimationFrame(executeScroll);
    setTimeout(executeScroll, 30);
    setTimeout(executeScroll, 100);
  };

  // Whenever an opportunity is selected, automatically scroll up to the activity detail
  useEffect(() => {
    if (selectedOpportunityId) {
      scrollToMiddleTop();
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
    scrollToMiddleTop();
  };

  const handleSelectOpportunity = (oppId) => {
    setSelectedOpportunityId(oppId);
    const opp = opportunities.find((o) => o.id === oppId);
    if (opp && opp.category !== currentCategory) {
      setCurrentCategory(opp.category);
    }
    scrollToMiddleTop();
  };

  const handleBack = () => {
    setSelectedOpportunityId(null);
    scrollToMiddleTop();
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
