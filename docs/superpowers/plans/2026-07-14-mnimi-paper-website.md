# Mnimi Paper Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a responsive static research website for Mnimi with accurate paper content, interactive sampling semantics, and GitHub Pages deployment.

**Architecture:** A semantic static HTML document contains all readable content and works without JavaScript. CSS provides the portfolio visual system, responsive diagrams, accessible light/dark themes, and transparent logo treatment; a small JavaScript file progressively enhances the sampling demo, citation copy control, reveal animations, and scroll progress. Node’s built-in test runner checks document structure and deployment assets.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, Node.js built-in test runner, GitHub Actions/Pages.

---

## File Map

- `index.html`: metadata, navigation, research narrative, diagrams, results, citation, and authors.
- `styles.css`: visual tokens, responsive layouts, light/dark mode, accessible focus and motion behavior.
- `script.js`: sampling mode state, progress indicator, copy behavior, and progressive reveal.
- `assets/mnimi-logo.svg`: transparent primary mark copied from the supplied source.
- `assets/mnimi-paper.pdf`: downloadable camera-ready paper copied from the supplied source.
- `tests/website.test.mjs`: structural and link assertions using Node core modules only.
- `package.json`: zero-dependency test script.
- `.github/workflows/pages.yml`: public artifact staging and GitHub Pages deployment.

### Task 1: Establish the Test Contract

**Files:**
- Create: `package.json`
- Create: `tests/website.test.mjs`

- [ ] **Step 1: Add the zero-dependency test command**

```json
{
  "name": "mnimi-paper-site",
  "private": true,
  "scripts": {
    "test": "node --test tests/website.test.mjs"
  }
}
```

- [ ] **Step 2: Write failing structural tests**

Create tests that read `index.html`, `styles.css`, `script.js`, and `.github/workflows/pages.yml`, then assert:

```js
assert.match(html, /LLM4Code[^<]*2026/i);
assert.match(html, /10\.1145\/3786181\.3788729/);
assert.match(html, /arxiv\.org\/abs\/2511\.22118/);
assert.match(html, /github\.com\/msv-lab\/mnimi/);
assert.match(html, /3LH8plsAAAAJ/);
assert.match(html, /id="sampling-demo"/);
assert.match(html, /<table[\s>]/);
assert.match(html, /data-copy-citation/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /\.mnimi-mark/);
assert.match(js, /sampling-mode/);
assert.match(workflow, /actions\/deploy-pages@v4/);
```

Also extract local `href` and `src` paths and assert every referenced file exists.

- [ ] **Step 3: Run the tests and confirm the contract fails**

Run: `npm test`

Expected: FAIL because the website and workflow files do not exist.

- [ ] **Step 4: Commit the test contract**

```bash
git add package.json tests/website.test.mjs
git commit -m "test: define Mnimi website contract"
```

### Task 2: Build the Semantic Page and Public Assets

**Files:**
- Create: `index.html`
- Create: `assets/mnimi-logo.svg`
- Create: `assets/mnimi-paper.pdf`
- Test: `tests/website.test.mjs`

- [ ] **Step 1: Copy the supplied assets into stable public paths**

Run:

```bash
mkdir -p assets
cp logo.svg assets/mnimi-logo.svg
cp Mnimi.pdf assets/mnimi-paper.pdf
```

- [ ] **Step 2: Implement the complete semantic document**

Create `index.html` with:

- scholarly metadata and Open Graph tags;
- sticky navigation and skip link;
- hero links for ACM, arXiv, code, and local PDF;
- author names and LLM4Code ’26 venue line;
- an abstract;
- a naive-cache versus correct-sampling explanation;
- a `#sampling-demo` section with two buttons using `data-sampling-mode="repeatable"` and `data-sampling-mode="independent"`;
- a three-layer Model/Repeatable/Independent pattern diagram;
- SpecFix results including the complete eight-row table from the paper;
- practical implementation features;
- a BibTeX block and `[data-copy-citation]` button;
- four author cards, including `https://scholar.google.com/citations?user=3LH8plsAAAAJ&hl=zh-CN` for Haoxiang Jia.

All external links use `target="_blank" rel="noopener"`, and all internal navigation links resolve to IDs in the document.

- [ ] **Step 3: Run tests to identify the remaining missing CSS, script, and workflow**

Run: `npm test`

Expected: HTML and asset assertions pass; CSS, JavaScript, and workflow assertions still fail.

- [ ] **Step 4: Commit the page structure**

```bash
git add index.html assets/mnimi-logo.svg assets/mnimi-paper.pdf
git commit -m "feat: add Mnimi research content"
```

### Task 3: Add the Portfolio Visual System

**Files:**
- Create: `styles.css`
- Test: `tests/website.test.mjs`

- [ ] **Step 1: Implement design tokens and global behavior**

Define `--paper`, `--paper-tint`, `--surface`, `--ink`, `--blue`, `--amber`, `--line`, serif/sans/mono font stacks, shell width, radii, and shadows. Add a dark color-scheme override and render `.mnimi-mark` with a transparent background; use `filter: invert(1)` only in dark mode.

- [ ] **Step 2: Style every section and research diagram**

Add layouts for the sticky header, asymmetric hero, logo halo, buttons, abstract, tension cards, sampling sequence, decorator stack, evidence table, feature cards, citation, people grid, and footer. Use flowing borders and response-token dots to make the sampling semantics visually distinct without raster artwork.

- [ ] **Step 3: Add responsive and accessibility rules**

At 900px and 640px breakpoints, collapse multi-column layouts, allow the table to scroll, hide nonessential nav links, and preserve 44px touch targets. Include visible `:focus-visible`, a functional skip link, and a `prefers-reduced-motion: reduce` block.

- [ ] **Step 4: Run tests**

Run: `npm test`

Expected: CSS and HTML tests pass; JavaScript and workflow assertions remain failing.

- [ ] **Step 5: Commit the visual system**

```bash
git add styles.css
git commit -m "feat: style Mnimi paper website"
```

### Task 4: Add Progressive Interaction

**Files:**
- Create: `script.js`
- Modify: `tests/website.test.mjs`

- [ ] **Step 1: Implement sampling-mode behavior**

On click, set `data-mode` on `#sampling-demo`, update each button’s `aria-pressed`, and swap the three displayed values and explanation between Repeatable (`131`, `131`, `131`) and Independent (`131`, `561`, `452`). Ensure the static markup defaults to Repeatable and remains understandable without JavaScript.

- [ ] **Step 2: Implement citation copy, progress, and reveal enhancements**

Use `navigator.clipboard.writeText`, show “Copied” briefly, update `#scroll-progress` from page scroll, and use `IntersectionObserver` for `.reveal` elements. If APIs are unavailable, retain native text selection and fully visible content.

- [ ] **Step 3: Add behavioral source assertions**

Assert the script contains the exact sampling arrays, toggles `aria-pressed`, guards clipboard availability, and respects reduced motion before observation.

- [ ] **Step 4: Run syntax and website tests**

Run:

```bash
node --check script.js
npm test
```

Expected: JavaScript syntax passes; all tests except workflow checks pass.

- [ ] **Step 5: Commit interactions**

```bash
git add script.js tests/website.test.mjs
git commit -m "feat: add Mnimi sampling interactions"
```

### Task 5: Add GitHub Pages Deployment and Final Verification

**Files:**
- Create: `.github/workflows/pages.yml`
- Modify: `tests/website.test.mjs`

- [ ] **Step 1: Create the Pages workflow**

Configure pushes to `main` and manual dispatch, with `contents: read`, `pages: write`, and `id-token: write`. Stage `index.html`, `styles.css`, `script.js`, and `assets/` into `_site`, create `_site/.nojekyll`, upload via `actions/upload-pages-artifact@v3`, and deploy via `actions/deploy-pages@v4`.

- [ ] **Step 2: Add workflow staging assertions**

Assert the workflow contains each public file path, `_site/.nojekyll`, Pages permissions, and does not upload the repository root.

- [ ] **Step 3: Run the full automated suite**

Run:

```bash
node --check script.js
npm test
git diff --check
```

Expected: all commands exit with status 0.

- [ ] **Step 4: Serve and inspect locally**

Run: `python3 -m http.server 4173`

Inspect `http://127.0.0.1:4173/` at approximately 1440×1000, 768×1024, and 390×844. Confirm no horizontal page overflow, transparent logo background, legible diagram labels, working sampling toggle, copy control, and all primary links.

- [ ] **Step 5: Commit deployment**

```bash
git add .github/workflows/pages.yml tests/website.test.mjs
git commit -m "ci: deploy Mnimi website to Pages"
```

- [ ] **Step 6: Record final repository state**

Run:

```bash
git status --short
git log --oneline -6
```

Expected: only the original source assets (`Mnimi.pdf`, `mnimi.tex`, `logo.png`, `logo.svg`, and `help.md`) may remain untracked; website files are committed and the recent log contains design, test, content, styling, interaction, and deployment commits.

