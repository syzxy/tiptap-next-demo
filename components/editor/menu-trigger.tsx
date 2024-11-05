import { Button } from "@/components/ui/button";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";

export const MenuTrigger = () => {
  const [count, setCount] = useState(0);

  return (
    <NodeViewWrapper>
      <Button
        contentEditable={false}
        onClick={() => setCount((curr) => curr + 1)}
      >
        {count}
      </Button>
      <NodeViewContent />
    </NodeViewWrapper>
  );
};
