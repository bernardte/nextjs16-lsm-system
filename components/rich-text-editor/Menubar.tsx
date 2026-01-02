"use client";

import { type Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from "../ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Heading1Icon, Heading2Icon, Heading3Icon, Italic, Strikethrough } from "lucide-react";
import { useEffect, useState } from "react";

interface MenubarProps {
  editor: Editor | null;
}

const BUTTON_CLASS =
  "transition-colors hover:bg-accent/60 aria-pressed:bg-accent aria-pressed:text-accent-foreground is-active";

const Menubar = ({ editor }: MenubarProps) => {
    const [_, setUpdate] = useState(0); // just to force re-render

    useEffect(() => {
      if (!editor) return;

      const onUpdate = () => {
        setUpdate((u) => u + 1); // update state to re-render
      };

      editor.on("update", onUpdate);

      return () => {
        editor.off("update", onUpdate);
      };
    }, [editor]);

  if (!editor) {
    return null;
  }


  return (
    <div>
      <TooltipProvider>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                aria-label="Toggle Bold"
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() => {
                  editor.chain().focus().toggleBold().run();
                }}
                className={BUTTON_CLASS}
              >
                <Bold />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-semibold">Bold</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                aria-label="Toggle Italic"
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() => {
                  editor.chain().focus().toggleItalic().run();
                }}
                className={BUTTON_CLASS}
              >
                <Italic />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-semibold">Italic</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                aria-label="Toggle Strike"
                size="sm"
                pressed={editor.isActive("strike")}
                onPressedChange={() => {
                  editor.chain().focus().toggleStrike().run();
                }}
                className={BUTTON_CLASS}
              >
                <Strikethrough />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-semibold">Strike</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                aria-label="Toggle Heading 1"
                size="sm"
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() => {
                  editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}
                className={BUTTON_CLASS}
              >
                <Heading1Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-semibold">Heading 1</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                aria-label="Toggle Heading 2"
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() => {
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
                className={BUTTON_CLASS}
              >
                <Heading2Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-semibold">Heading 2</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                aria-label="Toggle Heading 3"
                size="sm"
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() => {
                  editor.chain().focus().toggleHeading({ level: 3 }).run();
                }}
                className={BUTTON_CLASS}
              >
                <Heading3Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-semibold">Heading 3</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Menubar;
