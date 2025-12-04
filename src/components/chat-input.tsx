import {useLocalStorage} from "~/hooks/useLocalStorage";
import {useTextarea} from "~/hooks/useTextarea";
import {cn} from "~/lib/utils";
import {useRouter} from "next/router";
import {useState} from "react";
import {ArrowUp} from "lucide-react";

export default function ChatInput() {
  const {textareaRef} = useTextarea();
  const [user] = useLocalStorage("logged-in", false);
  const [chatHistory, setChatHistory] = useLocalStorage("chat-history", "[]");
  const [prompt, setPrompt] = useState("");
  const r = useRouter();

  function submitPrompt() {
    const newId = Date.now();
    setChatHistory(
      JSON.stringify([...JSON.parse(chatHistory), {id: newId, title: prompt}]),
    );

    r.push(`/chat/${newId.toString()}`);
    setPrompt("");
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 z-10 w-[calc(100%_-_8px)] ipad:px-0",
      )}>
      <div className="pointer-events-auto mx-auto w-full bg-[#161616] px-6 pb-8 pt-2.5 ipad:px-10 ipad:pb-10 xl:pb-0">
        <div
          role="button"
          className={cn(
            "mx-auto max-w-[680px] rounded-[14px] bg-[#1F1F1F] p-3",
            user ? "pointer-events-auto" : "pointer-events-none opacity-50",
          )}
          onClick={() => textareaRef.current?.focus()}>
          <div
            className={cn(
              "flex w-full items-center gap-2",
              textareaRef.current?.clientHeight! <= 25 ? "items-center" : "items-end",
            )}>
            <textarea
              placeholder="Ask FinAI.."
              value={prompt}
              onChange={(e) => {
                setPrompt(e.currentTarget.value);
              }}
              ref={textareaRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    submitPrompt();
                  }
                }
              }}
              rows={1}
              className="hide-scrollbar max-h-20 w-full resize-none bg-[#1F1F1F] text-[#DBDBDB] outline-none"></textarea>
            <button
              type="button"
              onClick={submitPrompt}
              disabled={!user || prompt.length < 4}
              className={cn(
                "flex cursor-pointer text-[#9C9C9C] active:enabled:text-white",
                "disabled:cursor-default",
              )}>
              <span className="sr-only">submit message</span>
              <span className="rounded-full bg-white p-1.5">
                <ArrowUp size={18} />
              </span>
            </button>
          </div>
        </div>
        <div className="hidden w-full overflow-hidden text-center xl:block">
          <p className="py-4 text-xs font-medium leading-[120%] tracking-tight text-[#9E9E9E]">
            FinAI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
