import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export const editorExtensions = [
  StarterKit,

  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),

  Placeholder.configure({
    placeholder: "Write something...",
  }),

  Image.configure({
    inline: false,
    allowBase64: false,
  }),
];
