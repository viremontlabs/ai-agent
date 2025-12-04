import ChatInput from "~/components/chat-input";
import RootLayout from "~/components/layout";
import {useLocalStorage} from "~/hooks/useLocalStorage";
import {cn} from "~/lib/utils";

const Home = () => {
  const [user] = useLocalStorage("logged-in", false);

  return (
    <RootLayout>
      <div className="relative grow">
        <div
          className={cn(
            "relative flex min-h-svh w-full grow items-center justify-center",
            user ? "pointer-events-auto" : "pointer-events-none opacity-50",
            "mx-auto max-w-[680px]",
          )}>
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-2xl font-semibold leading-[120%] text-white">
              Hi! I’m FinAI
            </h1>
            <p className="px-2 font-medium leading-[120%] text-[#999999]">
              Ask me anything about WEB3, Finance, and cryptocurrency.
            </p>
          </div>
        </div>
        <ChatInput />
      </div>
    </RootLayout>
  );
};

export default Home;
