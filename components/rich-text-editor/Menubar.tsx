"use client";

import { type Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from "../ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Italic,
  ListIcon,
  ListOrderedIcon,
  Redo2Icon,
  Strikethrough,
  Undo,
  Undo2Icon
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

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

    editor.on("transaction", onUpdate);

    return () => {
      editor.off("transaction", onUpdate);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border-input border-x-0 border-t-0 bg-card flex flex-wrap items-center gap-1 rounded-t-lg border p-2">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                aria-label="Toggle Bullet List"
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() => {
                  editor.chain().focus().toggleBulletList().run();
                }}
                className={BUTTON_CLASS}
              >
                <ListIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-semibold">Bullet List</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                aria-label="Toggle Ordered List"
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() => {
                  editor.chain().focus().toggleOrderedList().run();
                }}
                className={BUTTON_CLASS}
              >
                <ListOrderedIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-semibold">Ordered List</span>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="bg-border mx-2 h-6 w-px" />

        <div className="flex flex-wrap items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                aria-label="Toggle Align Left"
                size="sm"
                pressed={editor.isActive({ textAlign: "left" })}
                onPressedChange={() => {
                  editor.chain().focus().setTextAlign("left").run();
                }}
                className={BUTTON_CLASS}
              >
                <AlignLeft />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-semibold">Align Left</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                aria-label="Toggle Align Center"
                size="sm"
                pressed={editor.isActive({ textAlign: "center" })}
                onPressedChange={() => {
                  editor.chain().focus().setTextAlign("center").run();
                }}
                className={BUTTON_CLASS}
              >
                <AlignCenter />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-semibold">Align Center</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                aria-label="Toggle Align Right"
                size="sm"
                pressed={editor.isActive({ textAlign: "right" })}
                onPressedChange={() => {
                  editor.chain().focus().setTextAlign("right").run();
                }}
                className={BUTTON_CLASS}
              >
                <AlignRight />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-semibold">Align Right</span>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="bg-border mx-2 h-6 w-px" />
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <Button
              variant="ghost"
              size={"sm"}
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo2Icon />
            </Button>
            <TooltipContent>
              <span className="font-semibold">Undo</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <Button
              variant="ghost"
              size={"sm"}
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo2Icon />
            </Button>
            <TooltipContent>
              <span className="font-semibold">Redo</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Menubar;
