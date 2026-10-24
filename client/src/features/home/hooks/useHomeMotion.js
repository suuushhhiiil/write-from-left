import { useGSAP } from "@gsap/react";
import { useRouteImagesReady } from "@/components/common/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const EASE = "power2.inOut";
const DURATION = 0.8;
const WORD_SPLIT = { type: "words", mask: "words" };

const splitWords = (target) => {
  if (!target) return { words: [] };
  return SplitText.create(target, WORD_SPLIT);
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fadeUpFrom = { autoAlpha: 0, y: 50 };
const fadeUpTo = { autoAlpha: 1, y: 0, duration: DURATION, ease: EASE };

const scrubFromTo = (target, fromVars, toVars, scrollTrigger) => {
  if (!target || target.length === 0) return;

  gsap.fromTo(target, fromVars, {
    ...toVars,
    ease: EASE,
    overwrite: "auto",
    scrollTrigger: {
      scrub: true,
      ...scrollTrigger,
    },
  });
};

const animateHero = (q, el) => {
  const nameSplit = splitWords(el(".hero-name"));
  const roleSplit = splitWords(el(".hero-role"));
  const descriptionSplit = splitWords(el(".hero-description"));
  const questionSplit = splitWords(el(".hero-question"));

  const intro = gsap.timeline({
    defaults: { duration: DURATION, ease: EASE, overwrite: "auto" },
  });

  intro
    .fromTo(el(".hero-greet"), fadeUpFrom, fadeUpTo)
    .fromTo(
      nameSplit.words,
      fadeUpFrom,
      { ...fadeUpTo, stagger: 0.08 },
      "-=0.6",
    )
    .fromTo(el(".hero-image"), fadeUpFrom, fadeUpTo, "-=0.8")
    .fromTo(
      el(".hero-role"),
      { backgroundColor: "transparent" },
      { backgroundColor: "var(--color-secondary)" },
      "-=0.8",
    )
    .fromTo(
      roleSplit.words,
      { autoAlpha: 0, y: 100 },
      { autoAlpha: 1, y: 0, stagger: 0.05 },
      "-=0.8",
    )
    .fromTo(
      descriptionSplit.words,
      fadeUpFrom,
      { ...fadeUpTo, stagger: 0.05 },
      "-=0.8",
    )
    .fromTo(
      questionSplit.words,
      { autoAlpha: 0, y: 50 },
      { autoAlpha: 1, y: 0, stagger: 0.08 },
      "-=0.3",
    )
    .fromTo(
      el(".hero-cta"),
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.4 },
      "-=0.8",
    );

  const heroPin = el(".hero-pin");
  const heroContainer = el(".hero-container");
  if (!heroPin || !heroContainer) return;

  gsap.fromTo(
    heroContainer,
    { autoAlpha: 1, scale: 1 },
    {
      autoAlpha: 0,
      scale: 0.9,
      ease: EASE,
      overwrite: "auto",
      scrollTrigger: {
        trigger: heroPin,
        start: "bottom bottom",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
      },
    },
  );
};

const animateFirstDraft = (el) => {
  const section = el(".first-draft-section");
  const imageContainer = el(".first-draft-image-container");
  const image = el(".first-draft-image");
  const container = el(".first-draft-container");
  const content = el(".first-draft-content");
  if (!section || !container || !content) return;

  gsap.from(imageContainer, {
    duration: 1,
    scale: 0.8,
    rotate: -10,
    scrollTrigger: {
      trigger: section,
      start: "top 40%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.fromTo(
    image,
    {
      scale: 2.5,
      rotate: 10,
      autoAlpha: 0,
      duration: 1,
    },
    {
      scale: 1,
      rotate: 0,
      duration: 1,
      autoAlpha: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 40%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap.fromTo(
    content,
    { autoAlpha: 0, y: 50 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: EASE,
      overwrite: "auto",
      scrollTrigger: {
        trigger: content,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    },
  );
};

const animateWhatIDo = (q, el) => {
  const container = el(".what-i-do-container");
  if (!container) return;

  gsap.fromTo(
    splitWords(el(".what-i-do-title")).words,
    {
      autoAlpha: 0,
      y: 50,
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: EASE,
      overwrite: "auto",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap.fromTo(
    splitWords(el(".what-i-do-heading")).words,
    {
      autoAlpha: 0,
      y: 50,
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: EASE,
      overwrite: "auto",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap.fromTo(
    splitWords(el(".what-i-do-description-text")).words,
    { autoAlpha: 0, y: 50 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: EASE,
      overwrite: "auto",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  const card = el(".what-i-do-card");
  const imageContainer = el(".what-i-do-image-container");
  const image = el(".what-i-do-image");

  gsap.fromTo(
    imageContainer,
    {
      scale: 0.8,
      y: 50,
      autoAlpha: 0,
    },
    {
      scale: 1,
      y: 0,
      autoAlpha: 1,
      duration: 1,
      scrollTrigger: {
        trigger: imageContainer,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap.fromTo(
    image,
    {
      scale: 2.5,
      rotate: 10,
    },
    {
      scale: 1,
      rotate: 0,
      duration: 1,
      scrollTrigger: {
        trigger: imageContainer,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap.fromTo(
    card,
    {
      autoAlpha: 0,
      y: 50,
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: EASE,
      overwrite: "auto",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  q(".what-i-do-expertise-item").forEach((item) => {
    gsap.fromTo(
      item,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });
};

const parseCount = (text) => {
  const match = String(text ?? "").match(/[\d,.]+/);
  if (!match) return null;

  const value = Number(match[0].replace(/,/g, ""));
  return Number.isFinite(value) ? value : null;
};

const animateCount = (title, trigger) => {
  const target = parseCount(title.textContent);
  if (target === null) return;

  const counter = { val: 0 };
  const render = () => {
    title.textContent = `${Math.round(counter.val)}`;
  };

  const tween = gsap.to(counter, {
    val: target,
    duration: 1.2,
    ease: EASE,
    snap: { val: 1 },
    paused: true,
    onStart: render,
    onUpdate: render,
  });

  ScrollTrigger.create({
    trigger: trigger ?? title,
    start: "top 60%",
    once: true,
    onEnter: () => tween.play(),
  });
};

const animateProof = (q, el) => {
  const container = el(".proof-container");
  if (!container) return;

  const intro = gsap.timeline({
    defaults: { duration: 1, ease: EASE, overwrite: "auto" },
    scrollTrigger: {
      trigger: container,
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  });

  intro
    .fromTo(
      container,
      { scaleX: 1.1 },
      { scaleX: 1, transformOrigin: "center center" },
      0,
    )
    .fromTo(
      splitWords(el(".proof-title")).words,
      fadeUpFrom,
      { ...fadeUpTo, stagger: 0.02 },
      0,
    )
    .fromTo(
      splitWords(el(".proof-heading")).words,
      fadeUpFrom,
      { ...fadeUpTo, stagger: 0.02 },
      0.06,
    )
    .fromTo(
      splitWords(el(".proof-description-text")).words,
      fadeUpFrom,
      { ...fadeUpTo, stagger: 0.06 },
      0.1,
    );

  q(".proof-item-container").forEach((item) => {
    const title = item.querySelector(".proof-item-title");
    const description = item.querySelector(".proof-item-description");
    const image = item.querySelector(".proof-item-image");

    const card = gsap.timeline({
      defaults: { duration: DURATION, ease: EASE, overwrite: "auto" },
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        toggleActions: "play none none reverse",
        markers: true,
      },
    });

    card.fromTo(item, { autoAlpha: 0, y: 200 }, { autoAlpha: 1, y: 0 }, 0);
    if (image) {
      card.fromTo(
        image,
        { autoAlpha: 0, y: 100 },
        { autoAlpha: 1, y: 0 },
        0.08,
      );
    }
    if (title) {
      animateCount(title, container);
    }
    if (description) {
      card.fromTo(description, { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0 });
    }
  });
};

const useHomeMotion = (scope) => {
  const imagesReady = useRouteImagesReady();

  useGSAP(
    () => {
      if (!imagesReady) return;

      const q = gsap.utils.selector(scope);
      const el = (selector) => q(selector)[0] ?? null;

      animateHero(q, el);
      animateFirstDraft(el);
      animateWhatIDo(q, el);
      animateProof(q, el);

      const refresh = () => ScrollTrigger.refresh();
      const images = q("img");

      images.forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", refresh, { once: true });
        }
      });

      if (document.fonts?.ready) {
        document.fonts.ready.then(refresh);
      }

      return () => {
        images.forEach((img) => img.removeEventListener("load", refresh));
      };
    },
    { scope, dependencies: [imagesReady], revertOnUpdate: true },
  );
};

export default useHomeMotion;
