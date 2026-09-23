import { useLayoutEffect } from "react";
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
        color: "#151515",
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
    );

  philosophyItems.forEach((item, index) => {
    intro.fromTo(
      item,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
        stagger: 0.01,
      },
      `-=0.2`,
    );
  });

  //Hero Exit
  scrubFromTo(
    container,
    { autoAlpha: 1, scale: 1 },
    { autoAlpha: 0, scale: 0.8 },
    {
      trigger: section,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
      pin: true,
      pinSpacing: false,
    },
  );
};

const animateAboutMe = (q, el) => {
  const section = el(".about-me-section");
  const container = el(".about-me-container");
  const title = el(".about-me-title");
  const imageContainer = el(".about-me-image-container");
  const image = el(".about-me-image");
  const paragraphContainer = el(".about-me-paragraph-container");
  const paragraphs = q(".about-me-paragraph");
  const closing = el(".about-me-closing");

  if (!section || !container) return;

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=160%",
      pin: true,
      pinSpacing: true,
      scrub: true,
    },
  });

  timeline
    .fromTo(
      container,
      { autoAlpha: 0, scale: 2.5, transformOrigin: "center center" },
      { autoAlpha: 1, scale: 1, duration: 0.8 },
    )
    .to(container, { duration: 3 })
    .to(container, { autoAlpha: 0, scale: 0.8, duration: 1 });
};

const useAboutMotion = (scope) => {
  useGSAP(
    () => {
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
    },
    { scope },
  );
};

export default useAboutMotion;
