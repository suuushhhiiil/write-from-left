import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const EASE = "power2.inOut";
const DURATION = 0.8;
const WORD_SPLIT = { type: "words", mask: "words" };

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  const section = el(".hero-section");
  const container = el(".hero-container");
  const titleSplit = SplitText.create(el(".hero-title"), {
    type: "words",
  });
  const taglineSplit = SplitText.create(el(".hero-tagline"), {
    type: "words",
  });
  const paragraph = el(".hero-paragraph");
  const image = el(".hero-image");
  const imageContainer = el(".hero-image-container");
  const philosophyContainer = el(".philosophy-container");
  const philosophyItems = q(".philosophy-item");

  if (!section || !container) return;

  const intro = gsap.timeline();

  intro
    .from(taglineSplit.words, {
      opacity: 0,
      y: 20,
      rotate: 10,
      duration: 0.6,
      ease: EASE,
      stagger: 0.03,
    })
    .from(
      titleSplit.words,
      {
        opacity: 0,
        //   x: -50,
        y: 50,
        rotate: 10,
        duration: 0.8,
        ease: EASE,
        stagger: 0.03,
      },
      "-=0.5",
    )
    .fromTo(
      imageContainer,
      {
        scale: 0.8,
        rotate: 3,
      },
      {
        scale: 1,
        rotate: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.inOut",
      },
      "-=0.9",
    )
    .fromTo(
      image,
      {
        opacity: 0,
        scale: 2,
        rotateX: -3,
        autoAlpha: 0,
      },
      {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.inOut",
      },
      "-=1",
    )
    .fromTo(
      paragraph,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASE,
        stagger: 0.03,
      },
      "-=0.7",
    )
    .fromTo(
      philosophyContainer,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      },
      "-=0.3",
    )
    .fromTo(
      philosophyItems,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
        stagger: 0.05,
      },
      `-=0.2`,
    );
};

const animateAboutMe = (q, el) => {
  const section = el(".about-me-section");
  const container = el(".about-me-container");
  const title = SplitText.create(el(".about-me-title"), {
    type: "words",
    // mask: "words",
  });
  const imageContainer = el(".about-me-image-container");
  const image = el(".about-me-image");
  const paragraphContainer = el(".about-me-paragraph-container");
  const paragraphs = SplitText.create(q(".about-me-paragraph"), {
    type: "lines",
    delimiter: " ",
    mask: "lines",
  });
  const quote = SplitText.create(el(".about-me-quote"), {
    type: "words",
  });

  if (!section || !container) return;

  const intro = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: section,
      start: "top 40%",
      end: "bottom bottom",
      scrub: 1.5,
    },
  });

  intro

    .from(title.words, {
      opacity: 0,
      x: 100,
      duration: 0.8,
      ease: EASE,
      stagger: 0.08,
    })
    .fromTo(
      imageContainer,
      {
        scale: 0.6,
        y: -100,
        transformOrigin: "center center",
      },
      {
        scale: 1,
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.inOut",
      },
      "-=0.8",
    )
    .fromTo(
      image,
      {
        scale: 2,
        y: 100,
        transformOrigin: "center center",
        autoAlpha: 0,
      },
      {
        scale: 1,
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.inOut",
      },
      "-=0.8",
    )
    .fromTo(
      paragraphs.lines,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: EASE,
        stagger: 0.08,
      },
    )
    .fromTo(
      quote.words,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: EASE,
        stagger: 0.08,
      },
      "-=0.2",
    );
};

const useAboutMotion = (scope) => {
  useGSAP(() => {
    const q = gsap.utils.selector(scope);
    const el = (selector) => q(selector)[0] ?? null;

    if (prefersReducedMotion()) {
      gsap.set(q(".hero-curtain"), { autoAlpha: 0, pointerEvents: "none" });
      return;
    }

    animateHero(q, el);
    animateAboutMe(q, el);

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
  });
};

export default useAboutMotion;
