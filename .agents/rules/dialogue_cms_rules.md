# Dialogue CMS Rules & Architectural Constraints

When building or modifying widgets, sections, or applications for **Dialogue CMS**, follow these rules:

1. **Zero-Height Script Wrapper Fix (`height: 0px`):**
   - Override Dialogue's `height: calc(0px - 0px)` in CSS using:
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
   - In JS, target only `container.closest('div[comptype="script"], [comptype="script"]')`.
   - **DO NOT** walk up ancestor elements and set `overflow: visible !important`. That kills the host page's scroll pane.

2. **Vertical Page Scroll Protection:**
   - Always keep `body { overflow-y: auto !important; }` and `html { scroll-behavior: smooth; }`.
   - Do not force `min-height: 100vh;` or `overflow-x: hidden;` on embedded `.app-container`. Use `min-height: auto;`.

3. **Click Handlers & Sandboxing:**
   - Assign global handlers directly: `window.handlerName = handlerName;` (never use self-calling wrapper functions to avoid call stack overflow).
   - Use triple-layer click handling:
     1. Direct global `window` assignment.
     2. Inline ternary fallback (`onclick="window.fn ? window.fn() : fn()"`).
     3. Global event delegation (`document.addEventListener('click', ...)` with `e.target.closest('[data-*]')`).

4. **Edge-to-Edge Padding Offset:**
   - When parent 8px padding cannot be changed, offset it cleanly:
     ```css
     width: calc(100% + 16px) !important;
     max-width: calc(100% + 16px) !important;
     margin: -8px -8px 0 -8px !important;
     ```

5. **Synchronous Data Bundling:**
   - Keep all data, SVGs, and categories synchronously embedded in standalone HTML/production builds, avoiding network lag or empty initial measurements by Dialogue CMS.

