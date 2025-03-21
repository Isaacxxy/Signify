"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
  }>;
  lineColor?: string;
}

export default function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const svgMap = map.getSVG({
    radius: 0.22,
    color: "#FFFFFF40",
    shape: "circle",
    backgroundColor: "black",
  });

  const project = (lat: number, lng: number) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const curvedPath = (start: any, end: any) =>
    `M ${start.x} ${start.y} Q ${(start.x + end.x) / 2} ${Math.min(
      start.y,
      end.y
    ) - 50} ${end.x} ${end.y}`;

  const Point = ({ x, y }: { x: number; y: number }) => (
    <>
      <circle cx={x} cy={y} r="2" fill={lineColor} />
      <circle cx={x} cy={y} r="2" fill={lineColor} opacity="0.5">
        <animate attributeName="r" from="2" to="8" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </>
  );

  return (
    <div className="w-full aspect-[2/1] bg-black rounded-lg relative font-sans">
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        alt="world map"
        height="495"
        width="1056"
        className="h-full w-full pointer-events-none select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        draggable={false}
      />
      <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-full absolute inset-0 pointer-events-none select-none">
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const start = project(dot.start.lat, dot.start.lng);
          const end = project(dot.end.lat, dot.end.lng);
          return (
            <g key={i}>
              <motion.path
                d={curvedPath(start, end)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
              />
              <Point {...start} />
              <Point {...end} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
