import { Node } from "@tiptap/pm/model";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { throttle } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface ImageBlockViewProps {
  editor: Editor;
  getPos: () => number;
  node: Node;
  updateAttributes: (attrs: Record<string, string>) => void;
}

const IMAGE_MINIMUM_WIDTH_PIXELS = 15;

export function ImageBlockView({
  editor,
  getPos,
  node,
  updateAttributes,
}: ImageBlockViewProps) {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [mouseDown, setMouseDown] = useState(false);

  const handleResize = useMemo(
    () =>
      // Throttle our "on resize" handler, since the event fires very rapidly during
      // dragging, so rendering would end up stuttering a bit without a throttle
      throttle(
        (event: MouseEvent) => {
          if (!imageRef.current) {
            return;
          }

          const originalBoundingRect = imageRef.current.getBoundingClientRect();

          // Get the "width" and "height" of the resized image based on the user's
          // cursor position after movement, if we were to imagine a box drawn from
          // the top left corner of the image to their cursor. (clientX/Y and
          // getBoundingClientRect both reference positions relative to the viewport,
          // allowing us to use them to calculate the new "resized" image dimensions.)
          const resizedWidth = event.clientX - originalBoundingRect.x;
          const resizedHeight = event.clientY - originalBoundingRect.y;

          // We always preserve the original image aspect ratio, setting only the
          // `width` to a specific number upon resize (and leaving the `height` of the
          // `img` as "auto"). So to determine the new width, we'll take the larger of
          // (a) the new resized width after the user's latest drag resize movement,
          // (b) the width proportional to the new resized height given the image
          // aspect ratio, or (c) a minimum width to prevent mistakes. This is similar
          // to what Google Docs image resizing appears to be doing, which feels
          // intuitive.
          const resultantWidth = Math.max(
            resizedWidth,
            (originalBoundingRect.width / originalBoundingRect.height) *
              resizedHeight,
            // Set a minimum width, since any smaller is probably a mistake, and we
            // don't want images to get mistakenly shrunken below a size which makes
            // it hard to later select/resize the image
            IMAGE_MINIMUM_WIDTH_PIXELS
          );

          updateAttributes({
            width: `${Math.round(resultantWidth)}px`,
          });
        },
        50,
        { trailing: true } // Make sure our last event triggers a callback
      ),
    [updateAttributes]
  );

  useEffect(() => {
    if (!mouseDown) {
      return;
    }

    // If the user is currently holding down the resize handle, we'll have mouse
    // movements fire the onResize callback (since the user would be "dragging"
    // the handle).
    const handleMouseMove = (event: MouseEvent) => {
      handleResize(event);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleResize, mouseDown]);

  useEffect(() => {
    const handleMouseUp = () => {
      setMouseDown(false);
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [setMouseDown]);

  const handleMouseDown = useCallback(() => {
    setMouseDown(true);
  }, [setMouseDown]);
  return (
    <NodeViewWrapper>
      <div
        className="relative mx-auto"
        ref={imageRef}
        style={{ width: node.attrs.width }}
      >
        <div contentEditable={false}>
          <img className="block" src={node.attrs.src} alt="" />
        </div>

        {/* resizer */}
        <div
          onMouseDown={handleMouseDown}
          className="resizer-left absolute -translate-y-1/2 left-4 top-1/2 h-8 w-1 bg-gray-400 rounded-sm cursor-col-resize"
        />
        <div
          onMouseDown={handleMouseDown}
          className="resizer-right absolute -translate-y-1/2 right-4 top-1/2 h-8 w-1 bg-gray-400 rounded-sm cursor-col-resize"
        />
      </div>
    </NodeViewWrapper>
  );
}
