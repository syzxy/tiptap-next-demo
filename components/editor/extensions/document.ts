import { Document as DefaultDocument } from "@tiptap/extension-document";

/**
 * Force a heading i.e the page heading as the firt node.
 */
export const Document = DefaultDocument.extend({
  content: "title block*",
});
