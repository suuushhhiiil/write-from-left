import { useGSAP } from "@gsap/react";
import { useRouteImagesReady } from "@/components/common/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const EASE = "power2.inOut";

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

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const animateHero = (q, el) => {
  const section = el(".hero-section");
  const container = el(".hero-container");
  const titleSplit = SplitText.create(el(".hero-title"), {
    type: "words",
    mask: "words",
  });
  const taglineSplit = SplitText.create(el(".hero-tagline"), {
    type: "words",
    mask: "words",
  });
  const paragraph = el(".hero-paragraph");
  const image = el(".hero-image");
  const imageContainer = el(".hero-image-container");
  const philosophyContainer = el(".philosophy-container");
  const philosophyItems = q(".philosophy-item");
  const closing = el(".hero-closing");

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
    )
    .fromTo(
      closing,
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
      "-=0.2",
    );
};

const animationTrigger = (section) => ({
  trigger: section,
  start: "top 70%",
  toggleActions: "play none none reverse",
});

const animateAboutMe = (q, el) => {
  const section = el(".about-me-section");
  const container = el(".about-me-container");
  const title = SplitText.create(el(".about-me-title"), {
    type: "words",
    // mask: "words",
  });
  const imageContainer = el(".about-me-image-container");
  const image = el(".about-me-image");
  const paragraphs = SplitText.create(q(".about-me-paragraph"), {
    type: "lines",
    delimiter: " ",
    mask: "lines",
  });
  const quote = SplitText.create(el(".about-me-quote"), {
    type: "words",
  });

  if (!section || !container) return;

  gsap.fromTo(
    title.words,
    {
      opacity: 0,
      x: 100,
    },
    {
      opacity: 1,
      x: 0,
      stagger: 0.08,
      ease: EASE,
      duration: 0.8,
      scrollTrigger: animationTrigger(section),
    },
  );

  gsap.fromTo(
    imageContainer,
    { scale: 0.6, y: -100, transformOrigin: "center center" },
    {
      scale: 1,
      y: 0,
      autoAlpha: 1,
      duration: 1,
      ease: "power2.inOut",
      ease: EASE,
      duration: 0.8,
      scrollTrigger: animationTrigger(section),
    },
  );
  gsap.fromTo(
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
      scrollTrigger: animationTrigger(section),
    },
  );

  gsap.fromTo(
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
      scrollTrigger: animationTrigger(section),
    },
  );

  gsap.fromTo(
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
      scrollTrigger: animationTrigger(section),
    },
  );
};

const animateChildhood = (q, el) => {
  const section = el(".childhood-section");
  const container = el(".childhood-container");

  if (!section || !container) return;

  const imageContainer = el(".childhood-image-container");
  const image = el(".childhood-image");
  const paragraphs = SplitText.create(q(".childhood-paragraph"), {
    type: "lines",
    delimiter: " ",
    mask: "lines",
  });

  gsap.fromTo(
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
      scrollTrigger: animationTrigger(section),
    },
  );

  gsap.fromTo(
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
      scrollTrigger: animationTrigger(section),
    },
  );

  gsap.fromTo(
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
      scrollTrigger: animationTrigger(paragraphs.lines),
    },
  );
};

const animateContact = (q, el) => {
  const section = el(".contact-section");
  const container = el(".contact-container");
  const title = SplitText.create(el(".contact-title"), {
    type: "words",
  });
  const links = SplitText.create(q(".contact-link"), {
    type: "words",
  });

  const linkIcons = q(".contact-link-icon");

  if (!section || !container) return;

  const contactAnimationTrigger = (section) => ({
    trigger: section,
    start: "50% bottom",
    toggleActions: "play none none reverse",
  });

  gsap.fromTo(
    section,
    {
      x: 60,
      autoAlpha: 0,
    },
    {
      x: 0,
      autoAlpha: 1,
      scrollTrigger: contactAnimationTrigger(section),
    },
  );
  gsap.fromTo(
    title.words,
    {
      opacity: 0,
      x: 100,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: contactAnimationTrigger(section),
    },
  );

  gsap.fromTo(
    links.words,
    {
      opacity: 0,
      x: 100,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: contactAnimationTrigger(section),
    },
  );
  gsap.fromTo(
    linkIcons,
    {
      opacity: 0,
      x: 100,
    },
    {
      opacity: 1,
      x: 0,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: contactAnimationTrigger(section),
    },
  );
};

const useAboutMotion = (scope) => {
  const imagesReady = useRouteImagesReady();

  useGSAP(
    () => {
      if (!imagesReady) return;

      const q = gsap.utils.selector(scope);
      const el = (selector) => q(selector)[0] ?? null;

      if (prefersReducedMotion()) {
        gsap.set(q("section"), { autoAlpha: 1, pointerEvents: "auto" });
        return;
      }

      animateHero(q, el);
      animateAboutMe(q, el);
      animateChildhood(q, el);
      animateContact(q, el);

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
    { dependencies: [imagesReady], revertOnUpdate: true },
  );
};

export default useAboutMotion;
