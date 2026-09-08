import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const homeMotion = () => {
  useLayoutEffect(() => {
    const heroNameSplit = SplitText.create(
      document.querySelector(".hero-name"),
      {
        type: "chars",
      },
    );

    const heroRoleSplit = SplitText.create(
      document.querySelector(".hero-role"),
      {
        type: "words",
      },
      );
      
    const heroDescriptionSplit = SplitText.create(
      document.querySelectorAll(".hero-description"),
      {
        type: "words",
      },
    );

    gsap.from(heroNameSplit.chars, {
      opacity: 0,
      x: 20,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.03,
    });

    gsap.from(heroRoleSplit.words, {
      opacity: 0,
      x: 50,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.03,
    });
      
    gsap.from(heroDescriptionSplit.words, {
      opacity: 0,
      x: 50,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: 0.03,
    });
  }, []);
};

export default homeMotion;
