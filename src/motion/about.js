import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const aboutMotion = () => {
  useLayoutEffect(() => {
    const tl = gsap.timeline();

    const heroCover = document.querySelector(".hero-cover");

    tl.fromTo(
      heroCover,
      {
        margin: "0px",
      },
      {
        height: "0%",
        duration: 1.2,
        delay: 0.5,
        ease: "power4.inOut",
      },
    );

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

    // const heroImage = document.querySelector(".hero-image");
    const philosophyContainer = document.querySelector(".philosophy-container");
    const philosophyItems =
      philosophyContainer.querySelectorAll(".philosophy-item");

    tl.from(heroTaglineSplit.words, {
      opacity: 0,
      y: 20,
      rotate: 10,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.03,
    });

    tl.from(
      heroTitleSplit.words,
      {
        opacity: 0,
        //   x: -50,
        y: 50,
        rotate: 10,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.03,
      },
      "-=0.5",
    );

    // tl.fromTo(
    //   heroImage,
    //   {
    //     opacity: 0,
    //     y: 50,
    //   },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     duration: 0.8,
    //     ease: "back.out(1.7)",
    //   },
    //   "+=0.2",
    // );

    tl.fromTo(
      heroParagraph,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        color: "#151515",
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.03,
      },
      "-=0.3",
    );

    tl.fromTo(
      philosophyContainer,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
        stagger: 0.03,
      },
      "-=0.4",
    );

    philosophyItems.forEach((item, index) => {
      tl.fromTo(
        item,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "back.out(1.7)",
          stagger: 0.03,
        },
        `-=0.03`,
      );
    });
  });
};

export default aboutMotion;
