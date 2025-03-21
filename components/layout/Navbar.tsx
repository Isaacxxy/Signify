"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";



export default function Navbar({
  className2,
}: {
  className2?: string;
}

) {
  const [active, setActive] = useState<string | null>(null);

  const navItems = [
    {
      name: "Home",
      link: "./",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About us",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/About",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  return (
    <div className={cn("relative", className2)}>
      <FloatingNav navItems={navItems} className="flex justify-between" />
    </div>
  )
}

