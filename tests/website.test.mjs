import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  const path = resolve(root, relativePath);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

const html = read("index.html");
const css = read("styles.css");
const script = read("script.js");
const workflow = read(".github/workflows/pages.yml");

test("publishes the paper identity and requested research links", () => {
  assert.match(html, /Statistical Independence Aware Caching for LLM Workflows/);
  assert.match(html, /LLM4Code[^<]*2026/i);
  assert.match(html, /dl\.acm\.org\/doi\/10\.1145\/3786181\.3788729/);
  assert.match(html, /arxiv\.org\/abs\/2511\.22118/);
  assert.match(html, /github\.com\/msv-lab\/mnimi/);
  assert.match(html, /3LH8plsAAAAJ/);
});

test("contains the explanatory, evidence, citation, and people sections", () => {
  assert.match(html, /id="sampling-demo"/);
  assert.match(html, /data-sampling-mode="repeatable"/);
  assert.match(html, /data-sampling-mode="independent"/);
  assert.match(html, /<table[\s>]/);
  assert.match(html, /Cached replay/);
  assert.match(html, /data-copy-citation/);
  assert.match(html, /id="people"/);
});

test("uses accessible document structure", () => {
  assert.match(html, /<a class="skip-link" href="#main-content">/);
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /<caption>/);
  assert.doesNotMatch(html, /href="#"/);
});

test("references local assets that exist", () => {
  const localReferences = [...html.matchAll(/(?:href|src)="([^"#]+)"/g)]
    .map((match) => match[1])
    .filter((reference) => !/^(?:https?:|mailto:|tel:)/.test(reference));

  assert.ok(localReferences.length >= 4, "expected local CSS, JavaScript, logo, and PDF references");
  for (const reference of localReferences) {
    assert.ok(existsSync(resolve(root, reference)), `missing local asset: ${reference}`);
  }
});

test("defines the responsive portfolio visual system", () => {
  assert.match(css, /--paper:/);
  assert.match(css, /\.mnimi-mark/);
  assert.match(css, /@media \(prefers-color-scheme: dark\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media print[\s\S]*?\.reveal\s*\{\s*opacity:\s*1/);
  assert.match(css, /:focus-visible/);
});

test("implements progressive sampling and citation interactions", () => {
  assert.match(script, /sampling-mode/);
  assert.match(script, /\["131", "131", "131"\]/);
  assert.match(script, /\["131", "561", "452"\]/);
  assert.match(script, /aria-pressed/);
  assert.match(script, /navigator\.clipboard/);
  assert.match(script, /prefers-reduced-motion/);
});

test("deploys a deliberately staged GitHub Pages artifact", () => {
  assert.match(workflow, /pages: write/);
  assert.match(workflow, /id-token: write/);
  assert.match(workflow, /actions\/upload-pages-artifact@v3/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /cp index\.html styles\.css script\.js _site\//);
  assert.match(workflow, /cp -R assets _site\/assets/);
  assert.match(workflow, /touch _site\/\.nojekyll/);
  assert.match(workflow, /path: _site/);
  assert.doesNotMatch(workflow, /path: \./);
});
