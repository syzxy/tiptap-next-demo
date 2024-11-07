import { Node } from "@tiptap/core";

export const DocTitle = Node.create({
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
