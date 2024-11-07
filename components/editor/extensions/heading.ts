import { Heading as DefaultHeading } from "@tiptap/extension-heading";

/**
 * Maps the heading level 1 to h2, and level 2 to h3 etc.
 * To allow the page title as h1.
 */
export const Heading = DefaultHeading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level;
    const htmlTag = `h${Math.min(level + 1, 6)}`;
    return [htmlTag, HTMLAttributes, 0];
  },
});
