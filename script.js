const samplingDemo = document.querySelector("#sampling-demo");

if (samplingDemo) {
  const samplingButtons = samplingDemo.querySelectorAll("[data-sampling-mode]");
  const sampleValues = samplingDemo.querySelectorAll("[data-sample-value]");
  const explanation = samplingDemo.querySelector("[data-sampling-explanation]");
  const rule = samplingDemo.querySelector(".demo-rule");

  const modes = {
    nested: {
      values: ["2", "1393", "2", "297", "1740", "297", "68", "1002", "68"],
      explanation: "<strong>Nested scopes:</strong> repeated intervals reuse a value within each game (<code>2 → 2</code>), while Alice’s later game receives an independent value (<code>2 → 68</code>).",
      rule: "repeatable within a game · independent across games",
    },
    flat: {
      values: ["2", "1393", "2", "297", "1740", "297", "2", "1393", "2"],
      explanation: "<strong>Flat cache:</strong> repeatability still works inside each game, but Alice’s later game replays her first responses (<code>2 → 2</code>) instead of receiving independent samples.",
      rule: "repeatable everywhere · independence lost across games",
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
