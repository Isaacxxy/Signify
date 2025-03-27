"use client"
import { CircleX } from "lucide-react";
import Link from "next/link";
import React, { useEffect, } from "react";
import { useRouter } from "next/navigation";

interface MySettingsHeaderProps {
  title: string;
}

export default function SettingsHeader({ title }: MySettingsHeaderProps) {
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
    <div className="flex flex-row justify-between items-center m-8">
      <div className="font-bold text-2xl">{title} :</div>
      <Link className="flex flex-col justify-center items-center" href={"/"}>
        <CircleX />
        <span className="text-xs">ESC</span>
      </Link>
    </div>
  );
}
