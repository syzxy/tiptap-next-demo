"use client";

import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const CustomDocument = Document.extend({
  content: "heading block*",
});

const Editor = () => {
  const editor = useEditor({
    autofocus: true,
    editorProps: {
      attributes: {
        class: "focus:outline-none prose max-w-prose mx-auto pt-32",
      },
    },
    extensions: [
      CustomDocument,
      StarterKit.configure({ document: false }),
      Placeholder.configure({
        emptyNodeClass:
          "before:content-[attr(data-placeholder)] before:float-left before:text-neutral-300 before:h-0 before:pointer-events-none",
        placeholder({ node }) {
          if (node.type.name === "heading") return "New page";
          return "Write something, or press '/' for commands...";
        },
      }),
    ],
    content: `<h1></h1>`,
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
