"use client";

import { useEffect, useRef, useState } from "react";

const tools = [
  ["bold", "B", "Bold"],
  ["italic", "I", "Italic"],
  ["underline", "U", "Underline"],
  ["hiliteColor", "Mark", "Highlight"],
  ["insertUnorderedList", "• List", "Bullet list"],
  ["insertOrderedList", "1. List", "Numbered list"],
] as const;

export function BlogBodyEditor({ initialValue = "" }: { initialValue?: string }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = initialValue;
  }, [initialValue]);

  function updateValue() {
    setValue(editorRef.current?.innerHTML || "");
  }

  function format(command: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, command === "hiliteColor" ? "#f4df91" : undefined);
    updateValue();
  }

  function addLink() {
    editorRef.current?.focus();
    const url = window.prompt("Enter the link URL");
    if (!url) return;
    document.execCommand("createLink", false, url);
    updateValue();
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line/80 bg-white shadow-[0_14px_35px_-28px_rgba(28,36,33,0.5)]">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-line/70 bg-cream/60 px-3 py-2.5">
        <span className="mr-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          Format
        </span>
        {tools.map(([command, label, title]) => (
          <button
            key={command}
            type="button"
            title={title}
            aria-label={title}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => format(command)}
            className="min-w-9 rounded-lg border border-line/70 bg-white px-2.5 py-1.5 text-xs font-semibold text-ink transition hover:border-gold hover:bg-gold/15"
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          title="Add link"
          onMouseDown={(event) => event.preventDefault()}
          onClick={addLink}
          className="rounded-lg border border-line/70 bg-white px-2.5 py-1.5 text-xs font-semibold text-ink transition hover:border-gold hover:bg-gold/15"
        >
          Link
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={updateValue}
        data-placeholder="Write the full article…"
        className="prose prose-sm min-h-[18rem] max-w-none px-5 py-5 text-ink outline-none empty:before:text-muted empty:before:content-[attr(data-placeholder)] md:min-h-[24rem]"
      />
      <input type="hidden" name="body" value={value} required />
    </div>
  );
}