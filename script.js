const samplingDemo = document.querySelector("#sampling-demo");

if (samplingDemo) {
  const samplingButtons = samplingDemo.querySelectorAll("[data-sampling-mode]");
  const sampleValues = samplingDemo.querySelectorAll("[data-sample-value]");
  const explanation = samplingDemo.querySelector("[data-sampling-explanation]");
  const rule = samplingDemo.querySelector(".demo-rule");

  const modes = {
    repeatable: {
      values: ["131", "131", "131"],
      explanation: "<strong>Repeatable</strong> creates a new iterator at the start of the cached sequence for every call, so each call begins with <code>131</code>.",
      rule: "independent within a sequence · repeatable across calls",
    },
    independent: {
      values: ["131", "561", "452"],
      explanation: "<strong>Independent</strong> shares iterator state across calls. Each call advances through the cached sequence, preserving fresh samples without generating them again.",
      rule: "consumptive across calls · reproducible across runs",
    },
  };

  function setSamplingMode(modeName) {
    const mode = modes[modeName];
    if (!mode) return;

    samplingDemo.dataset.mode = modeName;
    samplingButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.samplingMode === modeName));
    });
    sampleValues.forEach((value, index) => {
      value.textContent = mode.values[index];
    });
    explanation.innerHTML = mode.explanation;
    rule.textContent = mode.rule;
  }

  samplingButtons.forEach((button) => {
    button.addEventListener("click", () => setSamplingMode(button.dataset.samplingMode));
  });
}

const copyButton = document.querySelector("[data-copy-citation]");
const citation = document.querySelector("#bibtex code");

if (copyButton && citation) {
  copyButton.addEventListener("click", async () => {
    if (!navigator.clipboard?.writeText) {
      copyButton.textContent = "Select BibTeX";
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(citation);
      selection.removeAllRanges();
      selection.addRange(range);
      return;
    }

    try {
      await navigator.clipboard.writeText(citation.textContent.trim());
      copyButton.textContent = "Copied";
      window.setTimeout(() => {
        copyButton.textContent = "Copy BibTeX";
      }, 1800);
    } catch {
      copyButton.textContent = "Copy failed";
    }
  });
}

const progress = document.querySelector("#scroll-progress");

function updateProgress() {
  if (!progress) return;
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0;
  progress.style.width = `${percentage}%`;
}

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);

const revealElements = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -7%", threshold: 0.08 },
  );

  revealElements.forEach((element) => observer.observe(element));
}
