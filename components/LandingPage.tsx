"use client";
import React from "react";
import { Cover } from "@/components/ui/cover";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { StarsBackground } from "@/components/ui/stars-background";
import { Layers, Zap, Lock, LayoutPanelLeft, Wrench, ShieldCheck } from "lucide-react";
import WorldMap from "./ui/world-map";
import { useRouter } from "next/navigation";

export function LandingPage() {
  const router = useRouter();
  return (
    <div className="w-full rounded-md flex md:items-center md:justify-center bg-black antialiased bg-grid-white/[0.02] relative mt-[200px]">
      <StarsBackground />
      <div className="p-4 mx-auto relative z-10 w-full flex flex-col gap-28 justify-center items-center">
        <div>
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 md:leading-tight">
            Welcome to <Cover>Signify</Cover>
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Instant sign language interpretation, making your conversations seamless.
          </p>
          <div className="mt-8 flex justify-between w-fit mx-auto gap-[10px]">
            <Button className="px-6 py-3 bg-indigo-500 text-white rounded-md font-semibold text-sm" variant="default" onClick={() => router.push('./videoChat')}>Try Now</Button>
            <Button className="px-6 py-3 rounded-md font-semibold text-sm w-fit" variant="secondary">Learn More</Button>
          </div>
        </div>
        <div className="div1 flex justify-center">
          <img src="./pic1.png" alt="" className="md:h-[500px]" />
        </div>
        <div className="flex flex-col w-full gap-10 justify-center items-center">
          <h1 className="md:text-3xl text-xl text-zinc-200 ">Collaboration that drives innovation</h1>
          <div className="mx-auto flex flex-row items-center justify-around px-40 w-full space-x-auto gap-10">
            <div className="flex justify-center items-center gap-2">
              <img src="./tensorflow.svg" alt="" className="w-[36px]" />
              <p className="text-[#AAAAAA] font-extrabold text-xl">TensorFlow</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img src="./socket-io.svg" alt="" className="w-[36px]" />
              <p className="text-[#AAAAAA] font-extrabold text-xl">Socket.io</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img src="./webrtc.svg" alt="" className="w-[36px]" />
              <p className="text-[#AAAAAA] font-extrabold text-xl">WebRTC</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img src="./Clerk.svg" alt="" className="w-[36px]" />
              <p className="text-[#AAAAAA] font-extrabold text-xl">Clerk</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img src="./Supabase.svg" alt="" className="w-[36px]" />
              <p className="text-[#AAAAAA] font-extrabold text-xl">SupaBase</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img src="./Kaggle.svg" alt="" className="w-[80px]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-7">
          <div className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFFFFF_0%,#3e59b8_50%,#FFFFFF_100%)]" />
            <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2">
              <Layers size={18} />
              Why Choose Our Application
            </span>
          </div>
          <h1 className="text-2xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 md:leading-tight">
            Revolutionize Communication Now
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Break your communication barriers. With our AI you can translate sign language into text in real-time during video calls.
          </p>
          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 w-full px-96 pt-10">
            <GridItem
              area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
              icon={<Zap className="h-4 w-4 text-neutral-400" />}
              title="Performance"
              description="Real-time predictions and resource optimization."
            />

            <GridItem
              area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
              icon={<Lock className="h-4 w-4 text-neutral-400" />}
              title="Security"
              description="Protection of video data used for detection."
            />

            <GridItem
              area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
              icon={<LayoutPanelLeft className="h-4 w-4 text-neutral-400" />}
              title="Accessibility"
              description="Intuitive interface with adjustable text."
            />

            <GridItem
              area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
              icon={<Wrench className="h-4 w-4 text-neutral-400" />}
              title="Maintainability"
              description="Well-structured and documented code for updates."
            />

            <GridItem
              area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
              icon={<ShieldCheck className="h-4 w-4 text-neutral-400" />}
              title="Reliability"
              description="≥ 85% accuracy in sign detection."
            />
          </ul>
        </div>
        <div className="bg-black w-1/2">
          <div className="flex flex-col justify-center items-center pb-24">
            <h1 className="text-2xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 md:leading-tight">
              Global Reach
            </h1>
            <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
              Connecting people worldwide, breaking language and distance barriers.
            </p>
          </div>
          <WorldMap
            dots={[
              {
                start: {
                  lat: 64.2008,
                  lng: -149.4937,
                }, // Alaska (Fairbanks)
                end: {
                  lat: 34.0522,
                  lng: -118.2437,
                }, // Los Angeles
              },
              {
                start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              },
              {
                start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
              },
              {
                start: { lat: 51.5074, lng: -0.1278 }, // London
                end: { lat: 28.6139, lng: 77.209 }, // New Delhi
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
              },
            ]}
          />
        </div>

      </div>
    </div>
  );
}
interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem] text-neutral-400"
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};