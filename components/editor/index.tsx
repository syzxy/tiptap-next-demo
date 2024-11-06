"use client";

import { Node } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ContentItemMenu } from "./components/menus/ContentItemMenu";
import { CustomNode } from "./custom-node";
import { SlashCommand } from "./extensions/SlashCommand";

const DocTitle = Node.create({
  name: "title",
  content: "text*",
  group: "block",
  defining: true,
  parseHTML() {
    return [{ tag: "h1" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["h1", HTMLAttributes, 0];
  },
});

/**
 * Force a heading i.e the page heading as the firt node.
 */
const CustomDocument = Document.extend({
  content: "title block*",
});

/**
 * Maps the heading level 1 to h2, and level 2 to h3 etc.
 * To allow the page title as h1.
 */
const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level;
    const htmlTag = `h${Math.min(level + 1, 6)}`;
    return [htmlTag, HTMLAttributes, 0];
  },
});

const Editor = () => {
  const editor = useEditor({
    autofocus: true,
    editorProps: {
      attributes: {
        class: "focus:outline-none prose max-w-prose mx-auto pt-32 px-8",
      },
    },
    extensions: [
      StarterKit.configure({ document: false, heading: false }),
      SlashCommand,
      CustomNode,
      CustomDocument,
      DocTitle,
      CustomHeading.configure({
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
    ],
    content: `
    <h1></h1>
    `,
  });

  return (
    editor && (
      <>
        <EditorContent editor={editor} />
        <ContentItemMenu editor={editor} />
      </>
    )
  );
};

export default Editor;
