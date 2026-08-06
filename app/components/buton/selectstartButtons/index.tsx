"use client";

import { playSound, SOUNDS } from "@/lib/sounds";

export default function SelectStartButtons({ text }: { text: string }) {
  return (
    <div className="flex -rotate-30 flex-col items-center justify-center gap-1">
      <button
        type="button"
        aria-label={`Botão ${text}`}
        onClick={() => playSound(SOUNDS.click)}
        className="h-3 w-12 rounded-full border border-black bg-[#69666D] active:scale-95 active:brightness-75"
      />
      <h1 className="scale-x-130 text-[0.6rem] font-black tracking-wide text-[#1D204D]">
        {text}
      </h1>
    </div>
  );
}
