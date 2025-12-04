import {useCopyToClipboard} from "~/hooks/useCopyToClipboard";
import {Copy, RefreshCcw, ThumbsDown, ThumbsUp} from "lucide-react";

interface ChatProps {
  chat: {role: string; content: string};
}

const REPLY_ACTIONS = [
  {
    name: "copy",
    icon: Copy,
  },
  {
    name: "refresh",
    icon: RefreshCcw,
  },
  {
    name: "like",
    icon: ThumbsUp,
  },
  {
    name: "dislike",
    icon: ThumbsDown,
  },
];

export function UserLog({chat}: ChatProps) {
  return (
    <div
      role="article"
      aria-label="Your message"
      className="border-xs group relative inline-block max-w-[90%] break-words rounded-2xl bg-[#1E1E1E] px-4 py-3 text-left ipad:max-w-[80%]">
      <p className="text-base ipad-mini:text-[15px]">{chat.content}</p>
    </div>
  );
}

export function AssistantLog({chat}: ChatProps) {
  const [_, copyValue] = useCopyToClipboard();

  const onHandleClick = (action: (typeof REPLY_ACTIONS)[number]) => {
    switch (action.name) {
      case "copy":
        copyValue(chat.content);
        break;
      default:
        console.log(action.name);
        break;
    }
  };

  return (
    <div
      role="article"
      aria-label="Assistant message"
      className="group relative flex w-full max-w-full gap-2">
      <div>
        <span className="inline-block px-[0.5px] pt-[5px]">
          <div className="h-[14px] w-[14px] rounded-full bg-[#C9AB95]" />
        </span>
      </div>
      <div className="max-w-none break-words">
        <p className="text-base ipad-mini:text-[15px]">{chat.content}</p>
        <div className="mt-2 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          {REPLY_ACTIONS.map((action) => (
            <button
              key={action.name}
              type="button"
              className="group rounded-sm p-1 transition-colors hover:bg-[#1E1E1E]"
              title={action.name}
              onClick={() => onHandleClick(action)}>
              <span className="sr-only">{action.name}</span>
              <action.icon size={18} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
