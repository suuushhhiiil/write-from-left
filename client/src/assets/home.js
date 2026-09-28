import {
  BookOpen,
  BrainCircuit,
  LayoutDashboard,
  Pencil,
  RocketIcon,
} from "lucide-react";

import experience01 from "../images/home/experience-01.webp";
import experience02 from "../images/home/experience-02.webp";
import experience03 from "../images/home/experience-03.webp";

const homeContent = {
  whatIDoSection: {
    title: "What I Do",

    hero: {
      heading: "ideas need more than inspiration.",
      subheading: "they need a plan.",

      description:
        "A good idea needs direction, structure and someone willing to move it forward.",

      intro: "That’s where I come in.",

      statement:
        "I bring project management, creative strategy and content strategy together to turn what if into what’s next.",

      buttonText: "Explore My Projects",
      buttonLink: "/projects",
    },

    expertise: {
      title: "MY AREAS OF EXPERTISE",

      items: [
        {
          icon: LayoutDashboard,
          title: "Project Management",
          description:
            "Turning goals into clear plans and keeping work moving.",
        },

        {
          icon: RocketIcon,
          title: "Project Coordination",
          description: "Keeping people, tasks and deliverables aligned.",
        },

        {
          icon: BrainCircuit,
          title: "Creative Strategy",
          description:
            "Finding a better way forward when something isn’t working.",
        },

        {
          icon: BookOpen,
          title: "Content Strategy",
          description:
            "Turning ideas and audience needs into purposeful communication.",
        },

        {
          icon: Pencil,
          title: "Writing & Editorial",
          description: "Taking strategy all the way to the words.",
        },
      ],
    },
  },

  experienceSection: {
    title: "Proof",

    heading: "Experience you can measure",
    description:
      "Different projects. Different challenges. The same responsibility: move the work forward.",

    items: [
      {
        title: "6",
        subheading: "+",
        description: "Years of Experience.",
        image: experience01,
      },
      {
        title: "200",
        subheading: "+",
        description: "Projects Delivered.",
        image: experience02,
      },
      {
        title: "5",
        subheading: "+",
        description: "Areas of Expertise.",
        image: experience03,
      },
    ],
  },

  letsTalkSection: {
    title: "Let's Talk",
    heading: "have an idea you're trying to figure out?",

    description: [
      "You don’t need to have everything figured out before you reach out.",
      "Bring me the idea, the problem or the project.",
    ],

    ctaText: "Let’s figure out where to start.",

    buttonText: "Contact Me",
    buttonLink: "/contact",

    footer: "Not sure if I’m the right person? That’s okay. Ask anyway.",
  },
};

export default homeContent;
