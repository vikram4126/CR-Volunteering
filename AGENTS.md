# Dialogue CMS Project Guidelines & Best Practices

This document records critical rules, architectural requirements, and bug prevention guidelines for all **Dialogue CMS** projects and embedded widget implementations.

---

## 1. Dialogue Height Collapse Issue (`height: 0px`)
### Cause:
Dialogue CMS calculates container dimensions when the script evaluates. If the script renders asynchronously or the wrapper is dynamically measured, Dialogue CMS injects a restrictive inline style rule:
```css
body div[comptype="script"] [id="..."] {
  height: calc((0px - 0px) - 0px); /* Collapses to 0px! */
}
```

### Mandatory Rules:
1. **CSS Override Rule:**
   Always include this rule in the stylesheet to defeat the 0px collapse:
   ```css
   body div[comptype="script"],
   body div[comptype="script"] [id],
   div[comptype="script"],
   [comptype="script"],
   preview-script,
   .preview-component-child {
     height: auto !important;
     min-height: auto !important;
   }
   ```
2. **Safe JS Height Fix:**
   Only target the immediate Dialogue script container if it has collapsed.
   ```javascript
   function fixDialogueParentHeight() {
     try {
       const app = document.querySelector('.app-container') || document.getElementById('root');
       if (!app) return;
       const scriptWrapper = app.closest('div[comptype="script"], [comptype="script"]');
       if (scriptWrapper) {
         scriptWrapper.style.setProperty('height', 'auto', 'important');
         scriptWrapper.style.setProperty('min-height', 'auto', 'important');
       }
     } catch (e) {
       console.warn('Dialogue height adjustment:', e);
     }
   }
   ```
3. **CRITICAL WARNING - NEVER Traverse Ancestors:**
   **DO NOT** loop through ancestor elements (`while (el && el !== document.body)`) setting `overflow: visible !important;` or `height: auto !important;`. Host CMS pages often rely on an ancestor scroll pane (with `overflow-y: auto; height: 100vh;`). Setting `overflow: visible` on ancestors destroys their native scrollbar and disables vertical page scrolling!

---

## 2. Vertical Scrolling & Overflow Rules
1. **Document-Level Scrolling:**
   Ensure `body` and `html` allow vertical scrolling:
   ```css
   html {
     scroll-behavior: smooth;
   }
   body {
     margin: 0;
     padding: 0;
     overflow-y: auto !important;
   }
   ```
2. **Avoid Trapping Scroll on Containers:**
   - Use `min-height: auto;` on `.app-container`, never `min-height: 100vh;` or `overflow-x: hidden;` inside an embedded section.
   - Do NOT add `overflow: visible !important;` or `overflow: hidden;` to `.app-container`.

---

## 3. Click Event Reliability in Sandboxed CMS Environments
### Cause:
Dialogue CMS components may run within isolated iframes, template wrappers, or sandboxed execution scopes where inline `onclick` handlers cannot reach local closure functions or can be stripped.

### Mandatory Rules:
1. **Direct Window Assignment (Never Self-Calling Wrappers):**
   ```javascript
   // ✅ Correct:
   window.selectCategory = selectCategory;
   window.openOpportunityDetail = openOpportunityDetail;
   window.goBackToCards = goBackToCards;
   window.openBenefitModal = openBenefitModal;
   window.closeModal = closeModal;
   window.selectOpportunityFromModal = selectOpportunityFromModal;
   window.handleEnquire = handleEnquire;
   window.fixDialogueParentHeight = fixDialogueParentHeight;

   // ❌ NEVER do recursive self-calls (causes RangeError: Maximum call stack size exceeded):
   // window.fn = function() { return fn(); };
   ```
2. **Fallback Inline Checks:**
   ```html
   onclick="window.selectCategory ? window.selectCategory(idx) : selectCategory(idx)"
   ```
3. **Global Event Delegation:**
   Always attach a global `document.addEventListener('click', ...)` handler that checks for `data-*` attributes (e.g. `e.target.closest('[data-category-idx]')`, `e.target.closest('[data-benefit]')`, `e.target.closest('[data-opp-id]')`).

---

## 4. Synchronous Embedding vs Asynchronous `fetch()`
Dialogue CMS executes and measures content synchronously. Avoid `fetch('./data.json')` in production builds or standalone vanilla versions. Embed data, opportunities, and SVGs inline so the DOM tree renders synchronously on page load.

---

## 5. Parent Padding Overrides (Edge-to-Edge Flushing)
When the Dialogue CMS host parent imposes an unremovable `8px` padding:
```css
.app-container {
  width: calc(100% + 16px) !important;
  max-width: calc(100% + 16px) !important;
  margin: -8px -8px 0 -8px !important;
  margin-top: -8px !important;
  margin-left: -8px !important;
  margin-right: -8px !important;
  margin-bottom: 0 !important;
  box-sizing: border-box !important;
}
```

