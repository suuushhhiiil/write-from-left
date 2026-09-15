import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const aboutMotion = () => {
  useLayoutEffect(() => {
    const tl = gsap.timeline();

    const heroTitleSplit = SplitText.create(
      document.querySelector(".hero-title"),
      {
        type: "words",
      },
    );

    const heroTaglineSplit = SplitText.create(
      document.querySelector(".hero-tagline"),
      {
        type: "words",
      },
    );
    const heroParagraph = document.querySelector(".hero-paragraph");
    const philosophyItems = document.querySelectorAll(".philosophy-item");

    tl.from(heroTitleSplit.words, {
      opacity: 0,
      //   x: -50,
      y: 50,
      rotate: 10,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.03,
    });

    tl.from(heroTaglineSplit.words, {
      opacity: 0,
      y: 20,
      rotate: 10,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.03,
    });

    gsap.fromTo(
      heroParagraph,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        color: "#151515",
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.03,
      },
    );
  });
};

export default aboutMotion;
