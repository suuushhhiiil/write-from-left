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
  },

  childhood: {
    title: "before all of this, i wanted to be a model.",

    image: {
      src: "/images/about/childhood-photo.webp",
      alt: "Childhood photo",
    },

    paragraph:
      "I was cute. I had the confidence. I even had the portfolio. The two missing front teeth were clearly part of the look.",

    closing: "I was ready.",
  },

  writing: {
    title: "then i fell in love with writing.",

    paragraph:
      "I started writing when I was around twelve. My first poem was terrible. I had discovered that if two words rhymed, they could probably become a poem.",

    poem: "Days. Heys. Ways. Trays.",

    poemClosing: "You get the idea.",

    closing: "But I kept writing.",
  },

  projectManagement: {
    title: "and then came project management.",

    paragraph:
      "I didn’t fall in love with project management because of spreadsheets. I fell in love with what happens between an idea and reality. An idea is exciting. Then someone has to figure out what happens next.",

    questions: [
      "What comes first?",
      "What can wait?",
      "What needs to change?",
      "How do you actually make it happen?",
    ],

    closing: "That part fascinated me.",

    connection:
      "And suddenly, writing and project management didn’t feel like two separate things.",

    combination: [
      {
        title: "Writing helped me create.",
        description: "",
      },
      {
        title: "Project management helped me make things happen.",
        description: "",
      },
    ],

    final: "That combination felt like me.",
  },

  learning: {
    title: "i like learning things i don’t know yet.",

    things: [
      "New tools.",
      "New ideas.",
      "New industries.",
      "New projects.",
      "New problems.",
    ],

    paragraphs: [
      "Not knowing the answer doesn’t bother me.",

      "It makes me curious.",
    ],

    statement:
      "Challenges excite me because they give me something to figure out.",

    closing:
      "I’m always learning, experimenting and finding another way to do things.",
  },

  whyWriteFromLeft: {
    title: "why write from left?",

    paragraphs: [
      "Because I wanted to build something that felt like me.",

      "Creative.",
      "Strategic.",
      "Curious.",
      "A little unconventional.",
    ],

    description:
      "A place where writing, project management, ideas and experiments could all exist together.",

    closing: "Write From Left is my portfolio.",

    statement:
      "But it’s also a place to build, learn, create and try things differently.",
  },

  outsideWork: {
    title: "and outside of work?",

    paragraphs: [
      "I’m usually learning something, making something, writing something or planning my next little project.",

      "I love good conversations, new places, new experiences and people who are passionate about what they’re building.",

      "And I have a habit of falling down completely unnecessary internet rabbit holes because I suddenly need to know everything about something I discovered five minutes ago.",
    ],

    description: "That’s probably the easiest way to describe me:",

    statement: [
      "Curious.",
      "Creative.",
      "Always learning.",
      "Always making something.",
    ],
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
