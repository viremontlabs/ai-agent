import {InfinityIcon, X} from "lucide-react";
import {useLocalStorage} from "~/hooks/useLocalStorage";

export function ProToast() {
  const [user] = useLocalStorage("logged-in", false);
  const [closed, setClosed] = useLocalStorage("upgrade-pro-toast", false);

  if (!user) return null;

  return (
    !closed && (
      <div className="border-xs absolute bottom-0 z-10 mx-4 rounded-xl bg-[#FCFCFD]">
        <div className="flex flex-col gap-4 p-3">
          <div>
            <div className="relative flex w-full items-center gap-2">
              <div className="rounded-full bg-[#EDEDED] p-1">
                <InfinityIcon />
              </div>
              <p className="text-sm font-medium leading-[120%] text-foreground">FinAI</p>
              <button
                type="button"
                className="absolute right-0 top-0 p-1 hover:bg-[#1E1E1E] hover:text-current"
                onClick={() => setClosed(true)}>
                <X />
              </button>
            </div>
            <div className="mt-2">
              <p className="text-pretty text-xs leading-tight text-[#757575]">
                Enjoy more features like priority processing, custom AI models, and
                unlimited access
              </p>
            </div>
          </div>

          <button
            className="border-xs w-full rounded-lg px-2 py-[7px] text-xs font-medium leading-[120%] text-foreground transition-colors hover:bg-[#C9AB95]"
            type="button">
            Get Waitlist
          </button>
        </div>
      </div>
    )
  );
}
