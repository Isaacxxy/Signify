"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        router.push("/keybinds");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [router]);

  return <>{children}</>;
}
