import { Editor } from "@tiptap/react";
import { BlockMenuHandle } from "./block-menu-handle";

export function BlockMenu({ editor }: { editor: Editor }) {
  return (
    <>
      <BlockMenuHandle />
      <div className="hidden">Block menu</div>
    </>
  );
}
