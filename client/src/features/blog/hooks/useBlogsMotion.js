import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouteImagesReady } from "@/components/common/Loader";

gsap.registerPlugin(useGSAP);

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const useBlogsMotion = (scope) => {
  const imagesReady = useRouteImagesReady();

  useGSAP(
    () => {
      if (!imagesReady) return;

      const q = gsap.utils.selector(scope);
      const hero = q(".blogs-hero-container")[0];
      const title = q(".blogs-hero-title")[0];

      if (!hero) return;

      if (prefersReducedMotion()) {
        gsap.set(hero, { autoAlpha: 1 });
        return;
      }

      gsap.set(hero, { autoAlpha: 0 });
      gsap
        .timeline()
        .to(hero, { autoAlpha: 1, delay: 0.2, duration: 0.4 })
        .fromTo(
          title,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.inOut" },
          "<",
        );
    },
    { scope, dependencies: [imagesReady], revertOnUpdate: true },
  );
};

export default useBlogsMotion;
