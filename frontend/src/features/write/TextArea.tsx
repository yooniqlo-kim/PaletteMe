import { useState } from "react";

export function TextArea() {
  const [text, setText] = useState("");
  const maxLength = 1000;

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
        placeholder="작품을 보고 느낀 감상을 자유롭게 작성해보세요."
        className="w-full min-h-[300px] p-4 border border-neutral-300 rounded-ps resize-none text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-primary"
      />
      <div className="text-right text-xs text-neutral-500">
        {text.length} / {maxLength}자
      </div>
    </div>
  );
}
