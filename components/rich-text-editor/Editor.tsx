"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./Menubar";

export const RichTextEditor = () => {
    const editor = useEditor({
      extensions: [StarterKit],
      // Don't render immediately on the server to avoid SSR issues
      immediatelyRender: false
    });

    return (
      <div>
        <Menubar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    );
}