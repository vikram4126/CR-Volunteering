# Corporate Responsibility (CR) Volunteering Portal - React Version

KPMG Corporate Responsibility (CR) Volunteering Portal ka modern **React + Vite** implementation. 

Is document me project ke har ek part, folder structure aur **React ke concepts (kaha, kaise aur kyu use kiye gaye hain)** ka detail explanation diya gaya hai.

---

## 🚀 Quick Start (Kaise Run Karein)

```bash
# 1. Dependencies install karein
npm install

# 2. Local development server start karein
npm run dev

# 3. Production build create karne ke liye
npm run build

# 4. Production build locally preview karne ke liye
npm run preview
```

Development server default URL: **`http://localhost:5173`**

---

## 📁 Project Structure (Folder & File Organization)

```text
CR-Volunteering/
├── public/                      # Static assets jo direct root path se serve hote hain
│   ├── assets/
│   │   ├── card-backgrounds/   # Category & Benefit cards ke textured background images
│   │   └── icons/              # KPMG original SVG icons
│   └── kpmg-font/              # KPMG Brand Fonts & OpenSans web fonts
│
├── src/
│   ├── data/                   # Pure JavaScript data models (Business Logic Separation)
│   │   ├── categories.js       # 4 Categories data (One-off, On-going, Home Based, Own Choice)
│   │   ├── opportunities.js    # 17 Volunteering Opportunities (with verified SVG badge mappings)
│   │   ├── benefits.js         # 11 Volunteering Benefits & detailed impact descriptions
│   │   └── icons.js            # Auto-generated ES Module dictionary of all SVG icons
│   │
│   ├── utils/                  # Helper functions & Reusable UI utilities
│   │   ├── formatDuration.jsx  # DurationBadge component (Bold number + unit styling)
│   │   ├── iconHelpers.js      # SVG icon lookup & dynamic color transform helpers
│   │   └── notches.jsx         # Corner Notches (NotchTR, NotchBR, NotchBL) as React SVG components
│   │
│   ├── components/             # Modular React UI Components
│   │   ├── Sidebar.jsx         # Left Navigation Sidebar with notched tab cards
│   │   ├── MiddleSection.jsx   # Middle column wrapper (Header, Back button, Content switcher)
│   │   ├── CardsGrid.jsx       # Grid list of volunteering opportunity cards
│   │   ├── OpportunityCard.jsx # Single opportunity card with SVG notch, arrow & badge icons
│   │   ├── OpportunityDetail.jsx # Full detail view with custom benefits grid & enquiry CTA
│   │   ├── FelixSpecialView.jsx  # Special 4-subprogram view for National Charity volunteering
│   │   ├── BenefitsSection.jsx   # Right-side benefits column with dynamic active/dimmed calculations
│   │   ├── BenefitCard.jsx       # Single benefit card with dynamic highlight & modal trigger
│   │   └── BenefitModal.jsx      # Popup modal listing all opportunities for a clicked benefit
│   │
│   ├── App.jsx                 # Top-level container component managing state & data flow
│   ├── main.jsx                # React 19 root mounting entry point
│   └── index.css               # Pixel-perfect KPMG design styling & CSS custom properties
│
├── index.html                  # HTML shell for Vite (Loads fonts & mounts React root)
├── index-vanilla.html          # Original single-file vanilla HTML/JS backup
├── package.json                # Project dependencies & npm scripts
└── vite.config.js              # Vite bundler configuration
```

---

## 🧠 React Architecture: Kaha, Kaise Aur Kyu Use Kiya Gaya Hai?

### 1. State Management (`useState`) — `src/App.jsx`
App ke core state ko top-level `App` component me isolate kiya gaya hai:

- **`currentCategory`**:
  - *Kaha*: `src/App.jsx`
  - *Kaise*: `const [currentCategory, setCurrentCategory] = useState(0);`
  - *Kyu*: Sidebar me kaunsa tab active hai aur middle section me kin opportunities ko filter karna hai, ye track karta hai.
- **`selectedOpportunityId`**:
  - *Kaha*: `src/App.jsx`
  - *Kaise*: `const [selectedOpportunityId, setSelectedOpportunityId] = useState(null);`
  - *Kyu*: Jab user kisi card par click karta hai, to list view se switch hoke us card ka **Detail View** khulta hai. Jab `null` hota hai, to normal cards grid render hota hai.
- **`activeModalBenefit`**:
  - *Kaha*: `src/App.jsx`
  - *Kaise*: `const [activeModalBenefit, setActiveModalBenefit] = useState(null);`
  - *Kyu*: Right column ke kisi benefit card par click karne par us benefit ka modal popup open karne ke liye.

---

### 2. Derived State (Computed Values) — `src/App.jsx`
Direct state ke bajay computed properties use ki gayi hain, jisse state redundancy aur sync bugs khatam ho jaate hain:
```javascript
// Current category object
const activeCategory = categories.find((c) => c.id === currentCategory) || categories[0];

// Currently filtered opportunities list
const categoryOpportunities = opportunities.filter((o) => o.category === currentCategory);

// Currently selected opportunity detail object
const selectedOpportunity = selectedOpportunityId
  ? opportunities.find((o) => o.id === selectedOpportunityId)
  : null;
```

---

### 3. Side Effects & Lifecycle (`useEffect`) — `src/components/BenefitModal.jsx`
- *Kaha*: `src/components/BenefitModal.jsx`
- *Kaise*:
  ```javascript
  useEffect(() => {
    if (!benefitName) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [benefitName, onClose]);
  ```
- *Kyu*: Jab modal open ho, tab user keyboard se `Escape` press karke modal close kar sake. Cleanup function (`return () => ...`) memory leak hone se bachata hai.

---

### 4. Component Hierarchy & Unidirectional Data Flow (Props & Callbacks)
Data hamesha parent se child me props ke through flow hota hai, aur user actions callbacks ke through parent ko notify karte hain:

```text
App (Parent State Holder)
 ├── Sidebar (props: categories, currentCategory, onSelectCategory)
 ├── MiddleSection (props: category, selectedOpportunity, categoryOpportunities, onSelectOpportunity, onBack)
 │    ├── CardsGrid -> OpportunityCard (onSelect)
 │    ├── OpportunityDetail (opp)
 │    └── FelixSpecialView (opp)
 ├── BenefitsSection (props: allBenefits, selectedOpportunity, onOpenBenefitModal)
 │    └── BenefitCard (isActive, isDimmed, onClick)
 └── BenefitModal (props: benefitName, opportunities, onClose, onSelectOpportunity)
```

---

### 5. Conditional Rendering (Shartein & Switches)
- **Detail View vs Grid**: `MiddleSection.jsx` me check hota hai:
  - Agar `selectedOpportunity` exist karta hai:
    - Agar Felix card hai (`isFelixSpecial`) -> `<FelixSpecialView />` render hota hai.
    - Otherwise -> `<OpportunityDetail />` render hota hai.
  - Agar `null` hai -> `<CardsGrid />` render hota hai.
- **Back Button**: Header me `selectedOpportunity` hone par hi `← Back` button dikhai deta hai.
- **Dynamic Active / Dimmed Benefits**: `BenefitsSection.jsx` me har benefit ke liye check hota hai:
  ```javascript
  if (selectedOpportunity) {
    if (selectedOpportunity.benefits.includes(benefitName)) {
      isActive = true;  // Solid KPMG Blue (#1E49E2) background, white icon
    } else {
      isDimmed = true;  // Opacity 0.35
    }
  }
  ```

---

### 6. External Navigation & Active Tab Preservation
Jab user sidebar me **"Own Choice Volunteering"** (Category index `3`) par click karta hai:
```javascript
const handleSelectCategory = (catIndex) => {
  if (catIndex === 3) {
    // Open external SharePoint portal in new tab
    window.open('https://www.kpmg.com', '_blank');
    return; // Early return: Active category change nahi hogi!
  }
  setCurrentCategory(catIndex);
  setSelectedOpportunityId(null);
};
```
Isse user jab external tab dekhkar wapas portal par aata hai, to uska **last selected tab** hi active rehta hai.

---

### 7. Reusable SVG Vector Components — `src/utils/notches.jsx`
Figma ke exact mathematical corner cutouts ko React components banaya gaya hai:
- `<NotchTR />`: Left Sidebar cards ke Top-Right notch ke liye.
- `<NotchBR />`: Middle Opportunity cards ke Bottom-Right notch ke liye.
- `<NotchBL />`: Right Benefit cards ke Bottom-Left notch ke liye.

---

### 8. Formatting Component — `src/utils/formatDuration.jsx`
Middle section cards ke bottom me minutes aur hours ke typography ko design se match karne ke liye:
- Numbers: `KPMG-Bold` (19px)
- Units: Small uppercase muted text
- Stacked text: Terms ke liye multi-line layout

---

## 🛠️ Verification & Quality Checks
- ✅ **Build Test**: `npm run build` runs with 0 errors and creates an optimized bundle.
- ✅ **Dev Server**: Runs smoothly on Vite `http://localhost:5173`.
- ✅ **Assets**: All fonts (`kpmg-font`) and card backgrounds (`assets/card-backgrounds`) are served directly via `public/`.
- ✅ **All 17 Cards**: Badge SVGs and descriptions match the original SVG inputs 100%.
