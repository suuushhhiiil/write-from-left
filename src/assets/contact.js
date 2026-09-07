const contactContent = {
  hero: {
    title: "What are you building?",

    description: "Sometimes, all it takes is a message to get things moving.",

    intro: "So, reach out.",

    closing:
      "Who knows? It might be the best thing that happens to your project.",
  },

  coffee: {
    title: "Let's Have Coffee.",

    paragraphs: [
      // "You prepare your mug.",
      // "I’ll prepare my notes.",
      "Let’s talk about your idea, your project, or whatever you’re trying to figure out.",
    ],

    cta: {
      label: "BOOK A VIRTUAL COFFEE DATE WITH ME. IT'S FREE. ☕",
    },

    note: "It’s free. ☕",
  },

  form: {
    fields: {
      name: {
        name: "name",
        label: "NAME",
        placeholder: "Your name",
        type: "text",
        required: true,
      },

      email: {
        name: "email",
        label: "EMAIL",
        placeholder: "Your email address",
        type: "email",
        required: true,
      },

      outreachReason: {
        name: "outreachReason",
        label: "WHAT ARE YOU REACHING OUT ABOUT?",
        type: "radio",

        options: [
          "I have a project",
          "I have an idea",
          "I need some direction",
          "I’d like to work together",
          "I have a collaboration in mind",
          "I just have a question",
          "Something else",
        ],

        required: true,
      },

      
      timeline: {
        name: "timeline",
        label: "TIMELINE",
        type: "radio",
        
        options: [
          "Just exploring",
          "I have a rough deadline",
          "I need to get started soon",
          "I’m already working on it",
        ],
        
        required: true,
      },
     
      message: {
        name: "message",
        label: "TELL ME A LITTLE MORE",
        placeholder: "What’s on your mind?",
        type: "textarea",
        required: true,
      },
    },

    submit: {
      label: "SEND MESSAGE",
    },
  },

  email: {
    address: "khushboo@writefromleft.com",
    href: "mailto:khushboo@writefromleft.com",
  },
};

export default contactContent;
