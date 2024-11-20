import { Image as BaseImage } from "@tiptap/extension-image";

export const Image = BaseImage.extend({
  group: "block",
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: "node-imageBlock",
      },
    };
  },
});

export default Image;
