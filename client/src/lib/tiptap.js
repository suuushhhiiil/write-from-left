import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";

const EditorImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      alt: { default: null },
      width: { default: null },
      height: { default: null },
    };
  },
});

export const editorExtensions = [
  StarterKit,
  Underline,
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),
  Placeholder.configure({
    placeholder: "Write something...",
  }),
  EditorImage.configure({
    inline: false,
    allowBase64: false,
  }),
];
