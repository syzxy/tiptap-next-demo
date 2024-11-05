import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { MenuTrigger } from "./menu-trigger";

export const CustomNode = Node.create({
  name: "customNode",
  group: "block",
  content: "block+",
  parseHTML() {
    return [
      {
        tag: "div",
        attrs: {
          "data-type": "actionable",
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "actionable" }),
      0,
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(MenuTrigger);
  },
});
