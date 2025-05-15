"use client";
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useAuth, UserButton } from '@clerk/nextjs'
import {
  motion,
  AnimatePresence,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Settings, Settings2 } from 'lucide-react';

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {

  const { scrollYProgress } = useScroll();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = React.useState(false);
  const router = useRouter()
  const { userId } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      const direction = currentPosition > scrollPosition ? "down" : "up";

      setScrollPosition(currentPosition);
      setScrollDirection(direction);
    };


    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);


  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className={`${scrollPosition === 0
      ? "z-[5000] fixed top-0 w-full bg-transparent border-b border-transparent"
      : "z-[5000] fixed top-0 w-full border-b backdrop-blur-sm bg-black/[0.6] border-white/[0.1] "
      } ${scrollDirection === "down" ? "transition-transform duration-200 transform -translate-y-full" : "transition-transform duration-200 transform translate-y-0"}`}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "container flex h-16 items-center sm:max-w-[88rem] mx-auto p-5",
            className
          )}
        >
          <h1 className="flex sm:hidden items-center justify-center space-x-2 text-2xl font-bold py-4 text-center  mr-10 text-white"><img src="./logo.svg" alt="" className="w-[32px]" /></h1>
          <h1 className="hidden sm:flex items-center justify-between gap-2 space-x-2 text-2xl font-bold py-4 text-center selection:bg-indigo-700/[0.2] selection:text-indigo-500 mr-10 text-white"><img src="./logo.svg" alt="" className="w-[32px]" />Signify</h1>
          <div className="relative text-neutral-50 items-center flex justify-between gap-4 hover:text-neutral-300">
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "relative text-zinc-100 items-center hover:text-neutral-300"
                )}
              >
                <span className="block sm:hidden px-3">{navItem.icon}</span>
                <span className="hidden sm:block text-base text-center">{navItem.name}</span>
              </Link>
            ))}
          </div>
          <div className="flex space-x-[8px] z-[5000]">
            {userId && (
              <div className="ml-[104px] flex justify-center items-center gap-4">
                <div
                  onClick={() => router.push('/keybinds')}
                  className="cursor-pointer text-zinc-100 items-center hover:text-neutral-300"
                  aria-label="Keybinds"
                >
                  <Settings />
                </div>
                <div className="border rounded-full w-fit h-fit p-0 flex items-center border-neutral-700">
                  <UserButton />
                </div>
              </div>)}
            {!userId && (
              <>
                <Button onClick={() => router.push('/sign-in')} size='sm' className="">Sign in</Button>
                <Button onClick={() => router.push('/sign-up')} size='sm' className="">Sign up</Button>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>

  );
};