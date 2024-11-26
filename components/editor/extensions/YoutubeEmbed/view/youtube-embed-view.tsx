import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Node } from "@tiptap/pm/model";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { FormEvent, useCallback, useState } from "react";

interface YoutubeEmbedViewProps {
  editor: Editor;
  getPos: () => number;
  node: Node;
  updateAttributes: (attrs: Record<string, string>) => void;
}

export function YoutubeEmbedView({ editor, getPos }: YoutubeEmbedViewProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const handleEmbedding = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const src = videoUrl.trim();
      console.log({ src });
      if (!src) return;

      editor
        .chain()
        .setYoutubeVideo({ src })
        .deleteRange({ from: getPos(), to: getPos() })
        .focus()
        .run();
    },
    [editor, getPos, videoUrl]
  );
  return (
    <NodeViewWrapper>
      <div className="relative mx-auto">
        <div contentEditable={false}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="flex align-center justify-start w-full p-4 opacity-75 font-normal"
                variant="tertiary"
              >
                <Icon name="Film" className="h-6 w-6" strokeWidth={2} />
                Embed a youtube video
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <form onSubmit={handleEmbedding}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="link" hidden>
                    Youtube video link
                  </label>
                  <Input
                    id="link"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Paste the youtube video link..."
                    className="col-span-2 h-8"
                  />
                  <Button buttonSize="small" variant="primary" type="submit">
                    Embed video
                  </Button>
                </div>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </NodeViewWrapper>
  );
}
