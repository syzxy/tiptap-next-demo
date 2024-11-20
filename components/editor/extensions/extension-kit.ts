"use client";

import {
  Color,
  DocTitle,
  Document,
  Focus,
  FontFamily,
  Heading,
  Highlight,
  Image,
  ImageUpload,
  Link,
  Placeholder,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  TaskItem,
  TaskList,
  TextStyle,
  Underline,
} from ".";

export const ExtensionKit = [
  Document,
  SlashCommand,
  DocTitle,
  Focus,
  Subscript,
  Superscript,
  Image,
  ImageUpload,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Placeholder.configure({
    emptyNodeClass:
      "before:content-[attr(data-placeholder)] before:float-left before:text-neutral-300 before:h-0 before:pointer-events-none",
    placeholder({ node }) {
      switch (node.type.name) {
        case "title":
          return "New document";
        case "heading": {
          return `Heading ${node.attrs.level}`;
        }

        default:
          return "Write something, or press '/' for commands...";
      }
    },
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  StarterKit.configure({
    document: false,
    // dropcursor: false,
    heading: false,
    history: false,
    gapcursor: false,
  }),
  TextStyle,
  FontFamily,
  Color,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  // Dropcursor.configure({
  //   width: 2,
  //   class: "ProseMirror-dropcursor border-black",
  // }),
];

export default ExtensionKit;
