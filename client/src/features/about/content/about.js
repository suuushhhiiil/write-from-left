import { ArrowRightIcon, BadgeQuestionMark, PencilIcon } from "lucide-react";

const aboutContent = {
  hero: {
    title: "write from left",

    tagline: "Be different. Be rare.",

    paragraph:
      "Write From Left started with something simple. I’m left-handed. Growing up in a mostly right-handed world meant doing little things differently. Writing included. Eventually, I stopped seeing “different” as something to work around.I started seeing it as a way of thinking.",

    philosophy: [
      {
        title: "Question the obvious.",
        Icon: BadgeQuestionMark,
      },
      {
        title: "Try another way.",
        Icon: ArrowRightIcon,
      },
      {
        title: "Make it your own.",
        Icon: PencilIcon,
      },
    ],

    closing: "That’s the idea behind Write From Left.",
  },

  aboutMe: {
    title: "a little about me",

    paragraphs: [
      "I’m curious by nature.",

      "I like asking questions, learning things I don’t know, trying things I’ve never tried and figuring out why something works the way it does.",

      "Give me a new challenge and my first thought is usually:",
    ],

    quote: "“Okay, how do we figure this out?”",

    closing:
      "I love creating things. I love writing. I get excited by new ideas. And I have a habit of turning random thoughts into projects.",

    childhood: {
      title: "before all of this, i wanted to be a model.",

      image: {
        src: "../src/images/about/childhood.webp",
        alt: "Childhood photo",
      },

      content: [
        "When I was little, I wanted to be a model.",

        "Then I grew up and became curious about how movies were made.",

        "I thought the heroes were the people on screen, until I discovered the directors, writers and producers behind them.",

        "I realised I wanted to create something from scratch, and that’s when I fell in love with writing.",

        "Later, I became fascinated by another question: how do we manage everything we have going on?",

        "That curiosity led me to project management.",

        "And somehow, I ended up turning two things I love, creating and making things happen, into a career.",
      ],
    },
  },

  footer: {
    title: "WELCOME TO WRITE FROM LEFT.",

    links: [
      {
        label: "EXPLORE MY WORK",
        href: "/projects",
      },
      {
        label: "READ MY IDEAS",
        href: "/blogs",
      },
      {
        label: "COME SAY HI",
        href: "/contact",
      },
    ],
  },
};

export default aboutContent;
