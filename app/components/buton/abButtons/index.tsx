"use client";

import { playSound, SOUNDS } from "@/lib/sounds";

export default function ABButtons({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <button
        type="button"
        aria-label={`Botão ${text}`}
        onClick={() => playSound(SOUNDS.click)}
        className="h-10 w-10 rounded-full bg-[#800943] active:scale-95 active:brightness-75"
      />
      <h1 className="scale-x-[1.4] text-[0.75rem] font-black text-[#1D204D]">
        {text}
      </h1>
    </div>
  );
}
