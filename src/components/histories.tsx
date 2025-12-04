import {useLocalStorage} from "~/hooks/useLocalStorage";
import Link from "next/link";
import {MessageCircle} from "lucide-react";

export function ChatHistory() {
  const [chatHistory] = useLocalStorage("chat-history", "[]");
  const [user] = useLocalStorage("logged-in", false);

  return (
    <div className="relative px-4">
      <div className="w-full p-2">
        <p className="spacing cursor-default text-sm font-medium tracking-normal text-[#757575]">
          History
        </p>
      </div>
      {user && (
        <ul className="h-full text-sm">
          {histories.map((i) => (
            <li key={i.name} className="relative w-full">
              <Link
                href={i.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-white transition-colors hover:bg-[#1E1E1E]">
                <MessageCircle size={20} />
                {i.name}
              </Link>
            </li>
          ))}
          {JSON.parse(chatHistory).map((i: {id: string; title: string}) => (
            <li key={i.id} className="relative w-full">
              <Link
                href={`/chat/${i.id}`}
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#1E1E1E]">
                <MessageCircle size={20} className="shrink-0" />
                <p className="truncate font-medium text-white">{i.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const histories = [
  {href: "/chat", name: "Scan CA"},
  {href: "/chat", name: "What is trenches"},
  {href: "/chat", name: "Scan Wallet"},
  {href: "/chat", name: "Analytics Ideas"},
];
