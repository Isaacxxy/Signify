"use client"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@radix-ui/react-separator"
import { ThemeProvider } from "@/providers/theme-provider"
import { CircleX } from "lucide-react"
import Link from "next/link";
import React, { useEffect, } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.push("/");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="w-full flex items-center justify-end">
              <h1 className="hidden sm:flex items-center justify-between gap-2 space-x-2 text-2xl font-bold py-4 text-center selection:bg-indigo-700/[0.2] selection:text-indigo-500 mr-10 text-white"><img src="./logo.svg" alt="" className="w-[32px]" />Signify</h1>
            </div>
            <div className="flex flex-row justify-end items-center w-full">
              <Link className="flex flex-col justify-center items-center w-fit" href={"/"}>
                <CircleX />
                <span className="text-xs">ESC</span>
              </Link>
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
