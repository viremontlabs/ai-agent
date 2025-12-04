import Image from "next/image";
import {useLocalStorage} from "~/hooks/useLocalStorage";

export function WalletInfo() {
  const [user, setUser] = useLocalStorage("logged-in", false);

  return (
    <div id="user-info" className="p-4">
      {user ? (
        <button
          className="flex h-9 w-full items-center justify-start gap-3 rounded-full transition-colors hover:bg-[#1E1E1E]"
          type="button">
          <Image
            src="/img/demo-profile.webp"
            alt="dummy user"
            width={40}
            height={40}
            unoptimized
            className="aspect-square h-8 w-8 rounded-full"
          />
          <div className="flex flex-col items-start justify-between">
            <p className="text-sm font-medium text-white">0xsd3...sddf</p>
            <span className="text-xs font-medium text-[#757575]">Connected</span>
          </div>
        </button>
      ) : (
        <div className="mx-2">
          <button
            type="button"
            className="h-11 w-full rounded-lg bg-[#C9AB95] transition-colors hover:bg-opacity-90"
            onClick={() => setUser(true)}>
            <p className="text-sm font-medium text-foreground">Connect Wallet</p>
          </button>
        </div>
      )}
    </div>
  );
}
