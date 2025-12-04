import Head from "next/head";
import {ReactNode} from "react";
import {MobileNavbar, SideBar} from "./navbar";
import {cn} from "~/lib/utils";
import {questrial} from "~/lib/fonts";

interface Props {
  title?: string;
  children: ReactNode;
}

export default function RootLayout({title = "FinAI", children}: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <MobileNavbar />
      <main className={cn("min-h-pwa relative flex w-full", questrial.className)}>
        <SideBar className="hidden h-svh w-[264px] shrink-0 ipad:block" />
        {children}
      </main>
    </>
  );
}
