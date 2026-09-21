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
      const navbarLinks = document.querySelectorAll(".navbar-link");
      const navbarIcons = document.querySelectorAll(".navbar-icon");
      const navbarSocials = document.querySelectorAll(".navbar-social");
      const navbarSocialsLinks = document.querySelectorAll(
        ".navbar-social-link",
      );
      const navbarSocialsIcons = document.querySelectorAll(
        ".navbar-social-icon",
      );

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
          delay: 2,
          ease: "power2.inOut",
        },
      );

      navbarItems.forEach((item, index) => {
        tl.fromTo(
          item,
          {
            opacity: 0,
            scale: 0.6,
          },
          {
            opacity: 1,
            duration: 0.4,
            scale: 1,
            ease: "power2.inOut",
          },
          "<+=0.2",
        );
      });
    });
  }, []);
};

export default navbarMotion;
