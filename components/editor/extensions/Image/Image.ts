import { Image as BaseImage } from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageBlockView } from "./components/image-block-view";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageBlock: {
      setImageBlockWidth: (width: number) => ReturnType;
    };
  }
}

export const ImageBlock = BaseImage.extend({
  name: "imageBlock",
  group: "block",
  defining: true,
  isolating: true,
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "100%",
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => ({
          width: attributes.width,
        }),
      },
    };
  },
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: "node-imageBlock",
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageBlockView);
  },
  // addCommands() {
  //   return {
  //     setImageBlockWidth(width) {
  //       return ({ commands }) =>
  //         commands.updateAttributes("imageBlock", {
  //           width: `${Math.max(0, Math.min(100, width))}%`,
  //         });
  //     },
  //   };
  // },
});

export default ImageBlock;
