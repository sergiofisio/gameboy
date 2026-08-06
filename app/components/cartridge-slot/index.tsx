"use client";

import type { CartridgeGame } from "@/lib/cartridges";
import Cartridge from "../cartridge";

type CartridgeSlotProps = {
  game: CartridgeGame | null;
  isAnimating: boolean;
  onEject: () => void;
  poweredOn?: boolean;
};

export default function CartridgeSlot({
  game,
  isAnimating,
  onEject,
  poweredOn = false,
}: CartridgeSlotProps) {
  return (
    <div className="pointer-events-none absolute -top-12 left-1/2 z-30 flex h-16 w-36 -translate-x-1/2 items-end justify-center overflow-visible">
      <div
        aria-hidden
        className="absolute bottom-0 h-3.5 w-30 rounded-t-sm border border-b-0 border-[#6a6867] bg-[#8e8c8b] shadow-[inset_0_2px_3px_rgba(0,0,0,0.35)]"
      />

      {game && (
        <div
          className={`origin-bottom transition-all duration-500 ease-out ${
            poweredOn ? "pointer-events-none" : "pointer-events-auto"
          } ${
            isAnimating
              ? "-translate-y-12 scale-95 opacity-0"
              : "translate-y-2 opacity-100"
          }`}
        >
          <Cartridge
            game={game}
            size="slot"
            inserted
            disabled={poweredOn}
            onClick={onEject}
            className="drop-shadow-md"
          />
        </div>
      )}
    </div>
  );
}
