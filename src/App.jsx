import React, { useState } from 'react';
import categories from './data/categories';
import opportunities from './data/opportunities';
import allBenefits from './data/benefits';

import Sidebar from './components/Sidebar';
import MiddleSection from './components/MiddleSection';
import BenefitsSection from './components/BenefitsSection';
import BenefitModal from './components/BenefitModal';

export function App() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(null);
  const [activeModalBenefit, setActiveModalBenefit] = useState(null);

  // Derive active states
  const activeCategory =
    categories.find((c) => c.id === currentCategory) || categories[0];
  const categoryOpportunities = opportunities.filter(
    (o) => o.category === currentCategory
  );
  const selectedOpportunity = selectedOpportunityId
    ? opportunities.find((o) => o.id === selectedOpportunityId) || null
    : null;

  // Handlers
  const handleSelectCategory = (catIndex) => {
    if (catIndex === 3) {
      // Own Choice Volunteering is an external link - open directly in a new tab without altering current active tab
      window.open('https://www.kpmg.com', '_blank');
      return;
    }
    setCurrentCategory(catIndex);
    setSelectedOpportunityId(null);
  };

  const handleSelectOpportunity = (oppId) => {
    setSelectedOpportunityId(oppId);
    const opp = opportunities.find((o) => o.id === oppId);
    if (opp && opp.category !== currentCategory) {
      setCurrentCategory(opp.category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedOpportunityId(null);
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
