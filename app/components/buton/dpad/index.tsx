"use client";

import { playSound, SOUNDS } from "@/lib/sounds";

type DPadProps = {
  className?: string;
};

const DIRECTIONS = [
  { label: "Cima", className: "top-0 left-1/3 h-1/3 w-1/3" },
  { label: "Baixo", className: "bottom-0 left-1/3 h-1/3 w-1/3" },
  { label: "Esquerda", className: "top-1/3 left-0 h-1/3 w-1/3" },
  { label: "Direita", className: "top-1/3 right-0 h-1/3 w-1/3" },
] as const;

export default function DPad({ className = "" }: DPadProps) {
  return (
    <div className={`relative aspect-square ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-x-1 translate-y-1 bg-black"
        style={{ clipPath: CROSS_CLIP }}
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-black"
        style={{ clipPath: CROSS_CLIP }}
      />

      <div
        aria-hidden
        className="absolute inset-[3px] bg-[#6E706D]"
        style={{ clipPath: CROSS_CLIP }}
      />

      <div
        className="absolute inset-[7px] bg-[#1a1a22]"
        style={{ clipPath: CROSS_CLIP }}
      />

      <div className="absolute top-1/2 left-1/2 size-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#121218] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />

      {DIRECTIONS.map((direction) => (
        <button
          key={direction.label}
          type="button"
          aria-label={`D-pad ${direction.label}`}
          onClick={() => playSound(SOUNDS.dpad)}
          className={`absolute z-10 cursor-pointer border-0 bg-transparent p-0 active:bg-white/5 ${direction.className}`}
        />
      ))}
    </div>
  );
}

const CROSS_CLIP = [
  "polygon(",
  "33% 0%, 67% 0%,",
  "67% 33%, 100% 33%,",
  "100% 67%, 67% 67%,",
  "67% 100%, 33% 100%,",
  "33% 67%, 0% 67%,",
  "0% 33%, 33% 33%",
  ")",
].join(" ");
