import {cn} from "~/lib/utils";
import {ChatHistory} from "../histories";
import {DoorOpen, MessageCirclePlus, Menu, Wallet2, CreditCard} from "lucide-react";
import {RefreshCw} from "lucide-react";
import {FinAI} from "../icons/logo";
import {ProToast} from "../pro-toast";
import {WalletInfo} from "../wallet-info";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import {useLocalStorage} from "~/hooks/useLocalStorage";
import Link from "next/link";
import {useRouter} from "next/router";
import {questrial} from "~/lib/fonts";

export function MobileNavbar() {
  const [user] = useLocalStorage("logged-in", false);
  const r = useRouter();

  return (
    <div className="pointer-events-none absolute top-0 z-10 w-full px-2 ipad:hidden">
      <div>
        <div className="pointer-events-auto flex w-full justify-between bg-[#161616] px-5 py-[19px]">
          <Sheet>
            <SheetTrigger className="rounded-lg hover:bg-[#1E1E1E]">
              <span className="sr-only">Sidebar</span>
              <Menu />
            </SheetTrigger>
            <SheetContent
              className="min-w-60 max-w-[280px] shrink-0 border-none sm:max-w-[280px]"
              showCloseButton={false}
              side="left">
              <SheetHeader className="sr-only">
                <SheetTitle>Fin AI</SheetTitle>
                <SheetDescription>Mobile Sidebar</SheetDescription>
              </SheetHeader>
              <SideBar />
            </SheetContent>
          </Sheet>

          <button
            disabled={!user}
            onClick={() => r.push("/")}
            className={cn(
              "text-white/08 group rounded-lg bg-[#1E1E1E] hover:bg-[#C9AB95] hover:text-black disabled:cursor-not-allowed",
              user ? "pointer-events-auto" : "pointer-events-none opacity-50",
            )}
            type="button">
            <span className="sr-only">Create new chat</span>
            <MessageCirclePlus
              size={22}
              className="text-white/80 group-hover:text-black"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SideBar({className, ...props}: React.ComponentProps<"div">) {
  const [user, setUser] = useLocalStorage("logged-in", false);

  const r = useRouter();

  return (
    <div
      className={cn(
        "relative h-full max-w-[280px] border-r border-[#222222] bg-[#161616]",
        className,
        questrial.className,
      )}
      {...props}>
      <div
        className={cn(
          "mx-6 py-[1.625rem]",
          user ? "pointer-events-auto" : "pointer-events-none opacity-50",
        )}>
        <Link href="/">
          <FinAI className="ml-6" />
        </Link>
      </div>

      <div
        className={cn(
          "flex flex-col gap-4",
          user ? "pointer-events-auto" : "pointer-events-none opacity-50",
        )}>
        <div className="w-full px-4">
          <button
            onClick={() => r.push("/")}
            className="border-xs group flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#1E1E1E] px-2 py-2 font-medium text-white/80 hover:bg-[#C9AB95] hover:text-black">
            <MessageCirclePlus
              size={22}
              className="text-white/80 group-hover:text-black"
            />
            <p className="text-sm">New Chat</p>
          </button>
        </div>

        <nav className="px-4">
          {links.map((i) => (
            <Link
              key={i.name}
              href={i.href}
              className="flex items-center gap-3 rounded-lg p-2 text-sm font-medium text-white hover:bg-[#1E1E1E]">
              <i.icon className="size-5 text-[#757575]" />
              {i.name}
            </Link>
          ))}
        </nav>

        <ChatHistory />
      </div>

      <div className="absolute bottom-0 z-10 flex h-max w-full shrink flex-col justify-end gap-3 bg-[#161616]">
        <div className="relative">
          <ProToast />
          <div
            className={cn(
              "w-full px-2 font-medium text-foreground",
              user ? "pointer-events-auto" : "pointer-events-none opacity-70",
            )}>
            <button
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-white transition-colors hover:bg-[#1E1E1E]"
              type="button">
              <RefreshCw /> Clear Converstaion
            </button>
            <button
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-white transition-colors hover:bg-[#1E1E1E]"
              onClick={() => setUser(false)}
              type="button">
              <DoorOpen />
              Log Out
            </button>
          </div>
        </div>

        <WalletInfo />
      </div>
    </div>
  );
}

const links = [
  {href: "/wallet", name: "Wallet", icon: Wallet2},
  {href: "/payment", name: "Access Payment", icon: CreditCard},
];
