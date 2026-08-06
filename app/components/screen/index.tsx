"use client";

import { useEffect, useRef } from "react";
import type { CartridgeGame } from "@/lib/cartridges";

type ScreenProps = {
  className: string;
  isOn?: boolean;
  volume?: number;
  cartridge: CartridgeGame | null;
};

export default function Screen({
  className,
  isOn = false,
  volume = 0.6,
  cartridge,
}: ScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasCartridge = Boolean(cartridge);
  const shouldPlay = isOn && hasCartridge;
  const cartridgeId = cartridge?.id ?? null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
    if (shouldPlay) video.muted = volume === 0;
  }, [volume, shouldPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay && cartridge) {
      video.src = cartridge.videoSrc;
      video.currentTime = 0;
      video.volume = volume;
      video.muted = volume === 0;
      const play = async () => {
        try {
          await video.play();
        } catch {
          video.muted = true;
          await video.play().catch(() => {});
        }
      };
      void play();
      return;
    }

    video.pause();
    video.removeAttribute("src");
    video.load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldPlay, cartridgeId]);

  return (
    <div
      className={`relative overflow-hidden transition-colors duration-300 ${
        isOn ? "bg-[#9cbc0f]" : "bg-[#2a3310]"
      } ${className}`}
    >
      {isOn && !hasCartridge && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#9cbc0f] p-3 text-center">
          <p className="font-['Press_Start_2P',monospace] text-[0.45rem] leading-relaxed text-[#1a2a08] sm:text-[0.5rem]">
            ERRO
          </p>
          <p className="font-['Press_Start_2P',monospace] text-[0.4rem] leading-relaxed text-[#1a2a08] sm:text-[0.45rem]">
            INSIRA UM
            <br />
            CARTUCHO
          </p>
          <span className="mt-1 animate-pulse font-['Press_Start_2P',monospace] text-[0.55rem] text-[#1a2a08]">
            ▼
          </span>
        </div>
      )}

      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover [image-rendering:pixelated] transition-opacity duration-300 ${
          shouldPlay ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}
