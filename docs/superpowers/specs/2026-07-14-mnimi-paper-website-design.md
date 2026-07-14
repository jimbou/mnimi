# Mnimi Paper Website Design

## Goal

Create a polished, responsive project website for “Statistical Independence Aware Caching for LLM Workflows,” presented at LLM4Code 2026, with direct access to the ACM paper, arXiv preprint, local PDF, and source code. The site should belong visually to the author’s existing paper-site portfolio while giving Mnimi a distinct identity.

## Design Direction

Use the existing portfolio’s editorial design system: warm paper surfaces, deep ink text, blue and amber accents, large serif headlines, compact mono labels, generous whitespace, and structured research diagrams. Give Mnimi its own memory-inspired visual language through flowing sequence lines, cached response tokens, and composable decorator layers.

The supplied Muse/book logo is the primary mark. Use the transparent SVG rather than the white-background PNG so the logo always inherits the page surface visually. In dark mode, invert only the logo artwork while keeping its background transparent.

## Information Architecture

1. Sticky navigation with anchors for Idea, Pattern, Evidence, Cite, and People.
2. Hero with workshop context, title, concise value proposition, author list, and links to ACM, arXiv, code, and the local PDF.
3. Abstract section summarizing the research problem and contribution.
4. “The tension” explainer contrasting naive caching with statistically correct independent sampling.
5. Interactive sampling demonstration showing Repeatable and Independent iterator behavior from the paper’s example.
6. Design-pattern section covering ModelService, Repeatable/InMemory/Persistent, and Independent as composable layers.
7. SpecFix case study with the key cached-replay result and a faithful table of token, time, and cost measurements.
8. Practical implementation section highlighting the single-file API, batch sampling, cache slicing, replication mode, and provider support.
9. Citation panel with copy-to-clipboard behavior.
10. Author cards, with the supplied Haoxiang Jia Google Scholar URL and portfolio-consistent links where confidently available.
11. Compact footer with paper and repository links.

## Interaction and Motion

- A scroll progress indicator and subtle reveal-on-scroll transitions.
- Tabs or buttons in the sampling demonstration to switch between Repeatable and Independent behavior.
- A copy button for BibTeX.
- Respect `prefers-reduced-motion`; all core content remains available without JavaScript.
- Mobile navigation remains compact and usable without a hamburger dependency.

## Technical Architecture

Use a static, zero-dependency site:

- `index.html` for semantic content and metadata.
- `styles.css` for responsive layout, light/dark color schemes, and all diagrams.
- `script.js` for progressive enhancements only.
- `assets/` for the logo and downloadable paper.
- `tests/website.test.mjs` for structural, link, accessibility, and deployment checks.
- `.github/workflows/pages.yml` to stage only public files into `_site`, add `.nojekyll`, upload the artifact, and deploy through GitHub Pages.

All URLs must be relative-safe for both localhost and GitHub Pages project subpaths. No generated build directory is committed.

## Accessibility and Metadata

- Semantic headings, landmarks, lists, tables, buttons, and accessible labels.
- Keyboard-operable sampling tabs with correct pressed/selected state.
- Skip link, visible focus indicators, adequate contrast, and responsive overflow for the results table.
- Descriptive title, meta description, Open Graph metadata, theme color, favicon, and structured scholarly metadata.

## Content Accuracy

Use the supplied camera-ready PDF and LaTeX as the source of truth. Preserve the paper’s terminology: `Model`, `Repeatable`, `Independent`, `InMemory`, and `Persistent`. Present the case-study figures exactly as reported, including zero-token, zero-time, and zero-cost cached replay. Identify the venue as the 3rd International Workshop on Large Language Models For Code (LLM4Code ’26), co-located with ICSE 2026 in Rio de Janeiro.

## Verification

- Run Node’s built-in test runner.
- Serve the site locally and inspect desktop and mobile layouts in a browser.
- Validate internal asset paths and all requested external URLs.
- Check JavaScript syntax and confirm the Pages workflow stages the intended artifact.

