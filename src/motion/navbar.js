import { gsap } from "gsap";
import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const navbarMotion = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const navbarContainer = document.querySelector(".navbar-container");
      const navbarItems = document.querySelectorAll(".navbar-item");
      const tl = gsap.timeline();

      tl.fromTo(
        navbarContainer,
        {
          y: -100,
          opacity: 0,
          backgroundColor: "transparent",
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        },
      );

      navbarItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            y: -100,
            opacity: 0,
          },
          {
            opacity: 1,
            delay: index * 0.1,
            duration: 0.4,
            y: 0,
            ease: "power2.inOut",
          },
        );
      });
    });
  }, []);
};

export default navbarMotion;
