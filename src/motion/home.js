import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const homeMotion = () => {
  useLayoutEffect(() => {
    const tl = gsap.timeline();

    const heroCurtain = document.querySelectorAll(".hero-curtain");

    const heroGreet = document.querySelector(".hero-greet");
    const heroNameSplit = SplitText.create(
      document.querySelector(".hero-name"),
      {
        type: "words",
      },
    );

    const heroRole = document.querySelector(".hero-role");

    const heroDescription = document.querySelector(".hero-description");

    const heroQuestionSplit = SplitText.create(
      document.querySelector(".hero-question"),
      {
        type: "words",
      },
    );
    const heroImage = document.querySelector(".hero-image");

    const heroCta = document.querySelector(".hero-cta");

    tl.fromTo(
      heroCurtain[1],
      {
        height: "100%",
      },
      {
        height: "0%",
        duration: 0.8,
        delay: 0.5,
        ease: "power4.inOut",
      },
    );

    tl.fromTo(
      heroCurtain[0],
      {
        height: "100%",
      },
      {
        height: "0%",
        duration: 0.8,
        ease: "power4.inOut",
      },
      "-=0.6",
    );

    tl.fromTo(
      heroGreet,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.inOut",
      }, "-=0.4",

    );

    tl.from(
      heroNameSplit.words,
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.08,
      },
      "-=0.6",
    );

    tl.fromTo(
      heroImage,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.8",
    );

    tl.fromTo(
      heroRole,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.8",
    );

    tl.fromTo(
      heroDescription,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.8",
    );

    tl.from(heroQuestionSplit.words, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      stagger: 0.08,
    }, "+=0.5");
  }, []);
};

export default homeMotion;
