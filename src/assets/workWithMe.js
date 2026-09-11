import {
  BookIcon,
  BrainCircuit,
  FileIcon,
  Pencil,
  UsersIcon,
} from "lucide-react";
import Notion from '../images/work-with-me/notion.webp';
import Asana from '../images/work-with-me/asana.webp';
import Trello from '../images/work-with-me/trello.webp';
import Monday from '../images/work-with-me/monday.com.webp';
import GoogleWorkspace from '../images/work-with-me/google-workspace.webp';
import Canva from '../images/work-with-me/canva.svg';
import Adobe from '../images/work-with-me/adobe.webp';
import Slack from '../images/work-with-me/slack.webp';
import Zoom from '../images/work-with-me/zoom.webp';
import GoogleMeet from '../images/work-with-me/google-meet.webp';
import Gmail from '../images/work-with-me/gmail.webp';

const workWithMeContent = {
  hero: {
    title: "Turning ideas into projects that actually move.",

    description: [
      "Some ideas arrive as a clear brief. Others arrive as a conversation, a half-written document or a problem nobody has quite figured out yet.",
      "That’s where I like to start.",
    ],

    statement: "You bring the idea. We figure out what it needs.",
  },

  services: {
    title: "what I bring to the table",

    skills: [
      "Planning",
      "Scope",
      "Timelines",
      "Deliverables",
      "Progress",
      "Risks",
      "Documentation",
    ],

    items: [
      {
        id: "project-management",
        icon: FileIcon,

        title: "project management",

        heading: "From the first conversation to the final delivery.",

        content: [
          "We start with the goal, work out what needs to happen, set the priorities and give everything a place on the timeline.",
          "A project needs somewhere to go.",
        ],
      },

      {
        id: "project-coordination",
        icon: UsersIcon,

        title: "project coordination",

        heading: "Because there are always more moving parts than expected.",

        content: [
          "A deadline changes. Someone is waiting for feedback. A file is missing. Two people understood the brief differently.",

          "These things happen.",

          "Keeping track of them is part of keeping the project moving.",
        ],
      },

      {
        id: "creative-strategy",
        icon: BrainCircuit,
        title: "creative strategy",

        heading: "What if there’s another way?",

        content: [
          "When something isn’t working, I like going back to the actual problem.",

          "What’s missing? What are we assuming? Is there a simpler way to get where we need to go?",

          "Sometimes the answer is a completely different idea. Sometimes it’s a small change that makes the original one work.",
        ],
      },

      {
        id: "content-strategy",
        icon: BookIcon,

        title: "content strategy",

        heading:
          "Before we write anything, let’s work out what needs to be said.",

        content: [
          "Those questions shape the message, the content and where it belongs.",
          "Who are we talking to?",
          "What do they need to understand?",
          "What do we want them to do?",
        ],
      },

      {
        id: "writing-editorial",
        icon: Pencil,
        title: "writing & editorial",

        heading: "And then we put it into words.",

        content: [
          "Articles. Campaigns. Brand messaging. Creative concepts.",

          "Sometimes it’s about finding the right sentence. Sometimes it’s about figuring out what the entire piece is trying to say.",

          "Either way, the words should serve the idea.",
        ],
      },
    ],
  },

  process: {
    title: "how I work",

    steps: [
      {
        number: "01",
        id: "understand",
        title: "understand",

        questions: [
          "What are we actually trying to achieve?",
          "What’s already there?",
          "What’s missing?",
          "What’s getting in the way?",
        ],
      },

      {
        number: "02",
        id: "plan",
        title: "plan",

        description: "We turn the idea into something we can work with.",

        focus: ["Priorities", "People", "Deadlines", "Deliverables"],
      },

      {
        number: "03",
        id: "coordinate",
        title: "coordinate",

        content: [
          "The work starts moving.",
          "Tasks get assigned.",
          "Questions get answered.",
          "Feedback gets collected.",
          "Everyone knows what happens next.",
        ],
      },

      {
        number: "04",
        id: "create",
        title: "create",

        description:
          "This is where the thinking becomes something people can see, read, use or experience.",
      },

      {
        number: "05",
        id: "adapt",
        title: "adapt",

        description: "And then, inevitably, something changes.",

        statement: "When the plan changes, I change the plan.",
      },

      {
        number: "06",
        id: "deliver",
        title: "deliver",

        content: [
          "Not another document saying what we could do.",

          "Something finished.",

          "Something useful.",

          "Something that moves the original idea forward.",
        ],
      },
    ],
  },

  toolkit: {
    title: "my toolkit",

    description: "The tools change with the project.",

    categories: [
      {
        title: "project management",

        tools: ["Notion", "Asana", "Trello", "Monday.com"],
        icons: [Notion, Asana, Trello, Monday],
      },

      {
        title: "content & creative",

        tools: ["Google Workspace", "Canva", "Adobe"],
        icons: [GoogleWorkspace, Canva, Adobe],
      },

      {
        title: "communication",

        tools: ["Slack", "Zoom", "Google Meet", "Email"],
        icons: [Slack, Zoom, GoogleMeet, Gmail],
      },
    ],

    philosophy:
      "I care less about having every tool and more about knowing which one actually makes the work easier.",
  },

  projectTypes: {
    title: "WHAT CAN WE BUILD?",

    items: [
      {
        title: "campaigns",

        description:
          "An idea that needs a plan, a timeline and someone to keep it moving.",
      },

      {
        title: "creative projects",

        description:
          "The project you’ve been thinking about but haven’t quite figured out how to start.",
      },

      {
        title: "content",

        description:
          "From the bigger content direction to the actual words on the page.",
      },

      {
        title: "brand & communication",

        description: "Making complicated ideas easier to understand.",
      },

      {
        title: "personal projects",

        description:
          "Your book. Your community. Your side project. The thing you’ve wanted to make happen for years.",
      },

      {
        title: "creative initiatives",

        description: "Projects that bring people together around an idea.",
      },
    ],
  },

  problems: {
    title: "the kind of problems I like",

    items: [
      {
        problem: "“We have the idea. We just don’t know where to start.”",

        response: "Let’s start there.",
      },

      {
        problem: "“There are too many things happening at once.”",

        response: "Let’s work out what actually needs to happen first.",
      },

      {
        problem: "“Something isn’t working, but we can’t see why.”",

        response: "Let’s take it apart.",
      },

      {
        problem: "“We know what we want to say. We just can’t seem to say it.”",

        response: "Let’s find the words.",
      },

      {
        problem: "“The deadline is getting closer.”",

        response:
          "Okay. Let’s look at what matters, what can wait and what needs to happen now.",
      },
    ],
  },

  contact: {
    title: "let’s talk about your project",

    description: [
      "You don’t need a finished brief or a perfect idea.",

      "Just bring me the messy version.",
    ],

    statement: "Tell me what you’re trying to build.",

    cta: {
      label: "start a conversation",
      href: "/contact",
    },

    closing: "It’ll be worth it. Like two people, coffee & a chit chat.",
  },
};

export default workWithMeContent;
