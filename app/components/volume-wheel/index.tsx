"use client";

import type { WheelEvent } from "react";

type VolumeWheelProps = {
  volume: number;
  onChange: (volume: number) => void;
  className?: string;
};

export default function VolumeWheel({
  volume,
  onChange,
  className = "",
}: VolumeWheelProps) {
  const clamp = (value: number) => Math.min(1, Math.max(0, value));

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.05 : 0.05;
    onChange(clamp(volume + delta));
  };

  const handlePointer = (clientY: number, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const ratio = 1 - (clientY - rect.top) / rect.height;
    onChange(clamp(ratio));
  };

  return (
    <div
      role="slider"
      aria-label="Volume do vídeo"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(volume * 100)}
      tabIndex={0}
      onWheel={handleWheel}
      onPointerDown={(event) => {
        const target = event.currentTarget;
        target.setPointerCapture(event.pointerId);
        handlePointer(event.clientY, target);
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        handlePointer(event.clientY, event.currentTarget);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowUp" || event.key === "ArrowRight") {
          event.preventDefault();
          onChange(clamp(volume + 0.05));
        }
        if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
          event.preventDefault();
          onChange(clamp(volume - 0.05));
        }
      }}
      className={`absolute right-0 z-30 flex h-28 w-4 -translate-y-1/2 cursor-pointer items-center justify-end outline-none ${className}`}
      style={{ top: "28%" }}
    >
      <div className="relative h-full w-2.5 overflow-hidden rounded-l-md border border-r-0 border-[#6a6867] bg-[#2a2a2a] shadow-[-2px_0_4px_rgba(0,0,0,0.25)]">
        <div
          className="absolute inset-x-0 bottom-0 bg-[#4a4a4a] transition-[height] duration-75"
          style={{ height: `${volume * 100}%` }}
        />
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className="absolute right-0 left-0 h-px bg-[#1a1a1a]/60"
            style={{ top: `${(i + 1) * 9}%` }}
          />
        ))}
        <div
          className="absolute right-0 left-0 h-3 -translate-y-1/2 rounded-[1px] border border-[#111] bg-[#111] shadow-sm"
          style={{ top: `${(1 - volume) * 100}%` }}
        >
          <div className="absolute inset-x-0.5 top-1/2 h-0.5 -translate-y-1/2 bg-[#555]" />
        </div>
      </div>
    </div>
  );
}
