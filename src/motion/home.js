import { useGSAP } from "@gsap/react";
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
    // .fromTo(
    //   el(".hero-curtain-primary"),
    //   { scaleY: 1 },
    //   {
    //     scaleY: 0,
    //     transformOrigin: "bottom center",
    //     ease: "power4.inOut",
    //   },
    // )
    // .fromTo(
    //   el(".hero-curtain-accent"),
    //   { scaleY: 1 },
    //   {
    //     scaleY: 0,
    //     transformOrigin: "bottom center",
    //     ease: "power4.inOut",
    //     onComplete: () => {
    //       gsap.set(q(".hero-curtain"), { pointerEvents: "none" });
    //     },
    //   },
    //   "-=0.6",
    // )
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
      scale: 2,
      ease: EASE,
      overwrite: "auto",
      scrollTrigger: {
        trigger: heroPin,
        start: "bottom 100%",
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
  const container = el(".first-draft-container");
  if (!section || !container) return;

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom top",
    pin: true,
    pinSpacing: true,
  });

  gsap.from(container, {
    autoAlpha: 0,
    scale: 0.8,
    ease: EASE,
    overwrite: "auto",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom 50%",
      scrub: true,
    },
  });

  // .fromTo(
  //   splitWords(el(".first-draft-heading")).words,
  //   fadeUpFrom,
  //   { ...fadeUpTo, stagger: 0.08 },
  //   0,
  // )
  // .fromTo(
  //   splitWords(el(".first-draft-title")).words,
  //   fadeUpFrom,
  //   { ...fadeUpTo, stagger: 0.08 },
  //   0.12,
  // )
  // .fromTo(
  //   splitWords(el(".first-draft-subheading")).words,
  //   fadeUpFrom,
  //   { ...fadeUpTo, stagger: 0.08 },
  //   0.22,
  // )
  // .fromTo(
  //   el(".first-draft-image"),
  //   { autoAlpha: 0, y: 100 },
  //   { autoAlpha: 1, y: 0 },
  //   0.22,
  // )
  // .fromTo(
  //   splitWords(el(".first-draft-description")).words,
  //   { autoAlpha: 0 },
  //   { autoAlpha: 1, stagger: 0.08 },
  //   0.22,
  // )
  // .fromTo(
  //   splitWords(el(".first-draft-closure")).words,
  //   fadeUpFrom,
  //   { ...fadeUpTo, stagger: 0.05 },
  //   0.22,
  // )
  // .fromTo(
  //   el(".first-draft-button"),
  //   { autoAlpha: 0 },
  //   { autoAlpha: 1, ease: "back.out(2)" },
  //   0.35,
  // );
};

const animateWhatIDo = (q, el) => {
  const container = el(".what-i-do-container");
  if (!container) return;

  scrubFromTo(
    splitWords(el(".what-i-do-title")).words,
    fadeUpFrom,
    { ...fadeUpTo, stagger: 0.02 },
    { trigger: container, start: "top 50%", end: "top 20%" },
  );

  scrubFromTo(
    splitWords(el(".what-i-do-heading")).words,
    fadeUpFrom,
    { ...fadeUpTo, stagger: 0.02 },
    { trigger: container, start: "top 60%", end: "top 10%" },
  );

  scrubFromTo(
    splitWords(el(".what-i-do-description-text")).words,
    fadeUpFrom,
    { ...fadeUpTo, stagger: 0.02 },
    { trigger: container, start: "top 50%", end: "top 20%" },
  );

  const card = el(".what-i-do-card");
  const image = el(".what-i-do-image");

  scrubFromTo(card, fadeUpFrom, fadeUpTo, {
    trigger: card,
    start: "top bottom",
    end: "bottom 60%",
  });

  scrubFromTo(image, fadeUpFrom, fadeUpTo, {
    trigger: image,
    start: "top bottom",
    end: "bottom 60%",
  });

  q(".what-i-do-expertise-item").forEach((item) => {
    scrubFromTo(
      item,
      { autoAlpha: 0, y: 50, scale: 0.9 },
      { autoAlpha: 1, y: 0, scale: 1 },
      { trigger: item, start: "top bottom", end: "bottom 60%" },
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
    start: "top 85%",
    once: true,
    onEnter: () => tween.play(),
  });
};

const animateProof = (q, el) => {
  const container = el(".proof-container");
  if (!container) return;

  const intro = gsap.timeline({
    defaults: { duration: DURATION, ease: EASE, overwrite: "auto" },
    scrollTrigger: {
      trigger: container,
      start: "top 70%",
      end: "top 30%",
      scrub: true,
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
        trigger: item,
        start: "top 90%",
        end: "top 60%",
        scrub: true,
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
      card.fromTo(
        title,
        { autoAlpha: 0, y: 100 },
        { autoAlpha: 1, y: 0 },
        0.08,
      );
      animateCount(title, item);
    }
    if (description) {
      card.fromTo(
        description,
        { autoAlpha: 0, y: 80 },
        { autoAlpha: 1, y: 0 },
        0.12,
      );
    }
  });
};

const useHomeMotion = (scope) => {
  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      const el = (selector) => q(selector)[0] ?? null;

      if (prefersReducedMotion()) {
        gsap.set(q(".hero-curtain"), { autoAlpha: 0, pointerEvents: "none" });
        return;
      }

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
    { scope },
  );
};

export default useHomeMotion;
