import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const EASE = "power2.inOut";
const DURATION = 0.8;
const WORD_SPLIT = { type: "words", mask: "words" };

const scrubFromTo = (target, fromVars, toVars, scrollTrigger) => {
  if (!target || target.length === 0) return;

  gsap.fromTo(target, fromVars, {
    ...toVars,
    ease: EASE,
    overwrite: "auto",
    scrollTrigger: { scrub: true, ...scrollTrigger },
  });
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const animateHero = (q, el) => {
  const heroContainer = el(".projects-hero-container");
  const heroTitle = el(".projects-hero-title");
  const heroHeading = el(".projects-hero-heading");
  const heroDescription = el(".projects-hero-description");
  const heroIntro = el(".projects-hero-intro");

  gsap.set(heroContainer, { autoAlpha: 0, pointerEvents: "none" });

  const heroTimeline = gsap.timeline();

  heroTimeline
    .to(heroContainer, {
      autoAlpha: 1,
      pointerEvents: "auto",
      delay: 0.2,
    })
    .fromTo(
      heroTitle,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: DURATION,
        ease: EASE,
      },
      "<",
    );
};

const useProjectsMotion = (scope) => {
  useGSAP(() => {
    const q = gsap.utils.selector(scope);
    const el = (selector) => q(selector)[0] ?? null;

    if (prefersReducedMotion()) {
      gsap.set(q("section"), { autoAlpha: 1, pointerEvents: "auto" });
      return;
    }

    animateHero(q, el);

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

export default useProjectsMotion;
