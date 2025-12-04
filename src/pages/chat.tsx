import ChatInput from "~/components/chat-input";
import RootLayout from "~/components/layout";
import {AssistantLog, UserLog} from "~/components/messages";
import {cn} from "~/lib/utils";
import mockChats from "~/constant/dummy-chat.json";
import {useLocalStorage} from "~/hooks/useLocalStorage";

const Chat = () => {
  const [user] = useLocalStorage("logged-in", false);

  return (
    <RootLayout title="FinAI Chat">
      <div className="relative flex w-full flex-1 flex-col items-center justify-center transition-[width,height]">
        <div className="absolute bottom-0 top-0 w-full">
          <ChatInput />
          <div className="absolute inset-0 overflow-y-scroll">
            <div
              className={cn(
                "relative mx-auto mb-32 mt-[88px] h-auto w-full",
                user ? "pointer-events-auto" : "pointer-events-none opacity-50",
              )}>
              <div className="ipad:px-0" role="log" aria-label="Chat messages">
                <div className="mx-auto w-full whitespace-pre-line px-6 ipad:px-10">
                  <div className="mx-auto min-h-20 max-w-[720px] space-y-6">
                    {mockChats.map((chat, id) => (
                      <div
                        className={cn(
                          "flex",
                          chat.role === "user" ? "justify-end" : "justify-start",
                        )}
                        key={id}>
                        {chat.role === "user" ? (
                          <UserLog chat={chat} />
                        ) : (
                          <AssistantLog chat={chat} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Chat;
