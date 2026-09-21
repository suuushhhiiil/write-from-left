import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const homeMotion = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const heroCurtain = document.querySelectorAll(".hero-curtain");

      const heroContainer = document.querySelector(".hero-container");

      const heroGreet = document.querySelector(".hero-greet");
      const heroNameSplit = SplitText.create(
        document.querySelector(".hero-name"),
        {
          type: "words",
          mask: "words",
        },
      );

      const heroRoleSplit = SplitText.create(
        document.querySelector(".hero-role"),
        {
          type: "words",
          mask: "words",
        },
      );

      const heroRole = document.querySelector(".hero-role");

      const heroDescriptionSplit = SplitText.create(
        document.querySelector(".hero-description"),
        {
          type: "words",
          mask: "words",
        },
      );

      const heroQuestionSplit = SplitText.create(
        document.querySelector(".hero-question"),
        {
          type: "words",
          mask: "words",
        },
      );
      const heroImage = document.querySelector(".hero-image");

      const heroCta = document.querySelector(".hero-cta");

      gsap.to(heroContainer, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: heroContainer,
          start: "bottom 100%",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: true,
        },
      });

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
        },
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
          backgroundColor: "transparent",
        },
        {
          backgroundColor: "var(--color-secondary)",
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.8",
      );

      tl.fromTo(
        heroRoleSplit.words,
        {
          opacity: 0,
          y: 100,
          backgroundColor: "transparent",
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.inOut",
          stagger: 0.05,
        },
        "-=0.8",
      );

      tl.fromTo(
        heroDescriptionSplit.words,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.inOut",
          stagger: 0.05,
        },
        "-=0.8",
      );

      tl.from(
        heroQuestionSplit.words,
        {
          opacity: 0,
          x: 50,
          ease: "power2.inOut",
          stagger: 0.08,
        },
        "-=0.3",
      );

      tl.fromTo(
        heroCta,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.8",
      );

      // First Draft Container
      const fdSection = document.querySelector(".first-draft-section");
      const fdContainer = document.querySelector(".first-draft-container");
      const fdTitleSplit = SplitText.create(
        document.querySelector(".first-draft-title"),
        {
          type: "words",
          mask: "words",
        },
      );
      const fdHeadingSplit = SplitText.create(
        document.querySelector(".first-draft-heading"),
        {
          type: "words",
          mask: "words",
        },
      );
      const fdSubheadingSplit = SplitText.create(
        document.querySelector(".first-draft-subheading"),
        {
          type: "words",
          mask: "words",
        },
      );
      const fdDescriptionSplit = SplitText.create(
        document.querySelector(".first-draft-description"),
        {
          type: "words",
          mask: "words",
        },
      );
      const fdClosureSplit = SplitText.create(
        document.querySelector(".first-draft-closure"),
        {
          type: "words",
          mask: "words",
        },
      );
      const fdButton = document.querySelector(".first-draft-button");
      const fdImage = document.querySelector(".first-draft-image");

      ScrollTrigger.create({
        trigger: fdSection,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinSpacing: false,
      });

      gsap.to(fdContainer, {
        opacity: 0,
        duration: 0.8,
        scale: 0.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: fdSection,
          start: "top top",
          end: "bottom 30%",
          scrub: true,
        },
      });

      gsap.from(fdTitleSplit.words, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.05,
        scrollTrigger: {
          trigger: fdSection,
          start: "top 50%",
          end: "top 0%",
          scrub: true,
        },
      });

      gsap.from(fdHeadingSplit.words, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.05,
        scrollTrigger: {
          trigger: fdSection,
          start: "top 60%",
          end: "top 20%",
          scrub: true,
        },
      });

      gsap.from(fdSubheadingSplit.words, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.05,
        scrollTrigger: {
          trigger: fdSection,
          start: "top 40%",
          end: "top 0%",
          scrub: true,
        },
      });

      gsap.from(fdImage, {
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: fdSection,
          start: "top 40%",
          end: "top 0%",
          scrub: true,
        },
      });

      gsap.from(fdDescriptionSplit.words, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.03,
        scrollTrigger: {
          trigger: fdSection,
          start: "top 40%",
          end: "top 0%",
          scrub: true,
        },
      });

      gsap.from(fdClosureSplit.words, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.05,
        scrollTrigger: {
          trigger: fdSection,
          start: "top 40%",
          end: "top 0%",
          scrub: true,
        },
      });

      gsap.fromTo(
        fdButton,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.8,
          ease: "back.out(2)",
        },
        "-=0.8",
      );

      // What I Do Container
      const wiSection = document.querySelector(".what-i-do-section");
      const wiContainer = document.querySelector(".what-i-do-container");
      const wiTitleSplit = SplitText.create(
        document.querySelector(".what-i-do-title"),
        {
          type: "words",
          mask: "words",
        },
      );
      const wiHeadingSplit = SplitText.create(
        document.querySelector(".what-i-do-heading"),
        {
          type: "words",
          mask: "words",
        },
      );
      const wiDescriptionSplit = SplitText.create(
        document.querySelector(".what-i-do-description"),
        {
          type: "words",
          mask: "words",
        },
      );
      const wiCard = document.querySelector(".what-i-do-card");
      const wiImage = document.querySelector(".what-i-do-image");
      const wiExpertiseItems = document.querySelectorAll(
        ".what-i-do-expertise-item",
      );

      gsap.from(wiTitleSplit.words, {
        opacity: 0,
        y: 50,
        ease: "power2.inOut",
        stagger: 0.02,
        scrollTrigger: {
          trigger: wiContainer,
          start: "top 50%",
          end: "top 20%",
          scrub: true,
        },
      });

      gsap.from(wiHeadingSplit.words, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.02,
        scrollTrigger: {
          trigger: wiContainer,
          start: "top 60%",
          end: "top 10%",
          scrub: true,
        },
      });

      gsap.from(wiDescriptionSplit.words, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.02,
        scrollTrigger: {
          trigger: wiContainer,
          start: "top 70%",
          end: "top 50%",
          scrub: true,
        },
      });
      gsap.from(wiCard, {
        opacity: 0,
        y: 50,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: wiCard,
          start: "top bottom",
          end: "bottom 90%",
          scrub: true,
        },
      });

      gsap.from(wiImage, {
        opacity: 0,
        y: 50,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: wiImage,
          start: "top bottom",
          end: "bottom 80%",
          scrub: true,
        },
      });

      gsap.utils.toArray(wiExpertiseItems).forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 50,
          scale: 0.9,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom 80%",
            scrub: true,
          },
        });
      });

      //Experience Section
      const experienceSection = document.querySelector(".experience-section");
      const experienceContainer = document.querySelector(
        ".experience-container",
      );
      const experienceHeading = document.querySelector(".experience-heading");
      const experienceDescription = document.querySelector(
        ".experience-description",
      );
      const experienceItemsContainer = document.querySelector(
        ".experience-items-container",
      );
      const experienceItems = document.querySelectorAll(
        ".experience-item-title",
      );
      const experienceItemsDescriptions = document.querySelectorAll(
        ".experience-item-description",
      );

      // experienceItems.forEach((item, index) => {
      //   let obj = { val: 0 };
      //   gsap.to(obj, {
      //     value: 100,
      //     ease: "power2.inOut",
      //     scrollTrigger: {
      //       trigger: item,
      //       start: "top 80%",
      //       end: "bottom 60%",
      //       markers: true,
      //       once: true,
      //       onUpdate: () => {
      //         item.textContent = Math.round(obj.val).toLocaleString();
      //       },
      //     },
      //   });
      // });
    });

    return () => ctx.revert(); // Revert the animations when the component unmounts
  }, []);
};

export default homeMotion;
