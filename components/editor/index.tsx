"use client";

import "@/styles/index.css";
import { EditorContent, useEditor } from "@tiptap/react";
import { TextMenu } from "./components/menus";
import { ContentItemMenu } from "./components/menus/ContentItemMenu";
import ExtensionKit from "./extensions/extension-kit";

const Editor = () => {
  const editor = useEditor({
    autofocus: true,
    editorProps: {
      attributes: {
        class: "focus:outline-none prose max-w-prose mx-auto pt-32 px-8",
      },
    },
    extensions: ExtensionKit,
    content: `
    <h1></h1>
    <img class="node-imageBlock" src="https://placehold.co/600x400" width="100%">
    `,
  });

  return (
    editor && (
      <>
        <TextMenu editor={editor} />
        <EditorContent editor={editor} />
        <ContentItemMenu editor={editor} />
      </>
    )
  );
};

export default Editor;
