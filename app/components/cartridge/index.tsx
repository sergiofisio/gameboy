"use client";

import Image from "next/image";
import type { CartridgeGame } from "@/lib/cartridges";

type CartridgeProps = {
  game: CartridgeGame;
  selected?: boolean;
  inserted?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  size?: "rack" | "slot";
};

export default function Cartridge({
  game,
  selected = false,
  inserted = false,
  disabled = false,
  onClick,
  className = "",
  size = "rack",
}: CartridgeProps) {
  const isSlot = size === "slot";
  const useFullCart = Boolean(game.cartSrc) && !isSlot;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={
        inserted
          ? `Remover cartucho ${game.title}`
          : `Inserir cartucho ${game.title}`
      }
      aria-pressed={selected || inserted}
      className={`group relative shrink-0 border-0 bg-transparent p-0 text-left transition-transform duration-200 disabled:cursor-not-allowed ${
        isSlot
          ? "h-14 w-24 cursor-pointer"
          : "h-28 w-[4.5rem] cursor-pointer hover:-translate-y-1 active:translate-y-0 sm:h-32 sm:w-20"
      } ${className}`}
    >
      {useFullCart ? (
        <span
          className={`relative block h-full w-full overflow-hidden rounded-sm ${
            selected || inserted ? "ring-2 ring-white/80 ring-offset-1" : ""
          }`}
          style={{
            boxShadow:
              "2px 3px 0 rgba(0,0,0,0.3), 0 6px 12px rgba(0,0,0,0.18)",
          }}
        >
          <Image
            src={game.cartSrc!}
            alt={`Cartucho ${game.title}`}
            fill
            sizes="80px"
            className="object-cover object-top"
            priority={false}
          />
        </span>
      ) : (
        <span
          className={`relative block h-full w-full overflow-hidden rounded-[5px] rounded-b-[3px] border border-[#5c5a58] ${
            selected || inserted ? "ring-2 ring-white/80 ring-offset-1" : ""
          }`}
          style={{
            background:
              "linear-gradient(160deg, #e8e4dc 0%, #cfc9bf 45%, #b7b1a7 100%)",
            boxShadow:
              "2px 3px 0 rgba(0,0,0,0.28), inset 1px 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          <span className="absolute top-0 right-0 left-0 h-2.5 bg-gradient-to-b from-[#d9d4cb] to-[#b8b2a8]">
            <span className="absolute top-1 right-2 left-2 h-1 rounded-sm bg-[#8f8b84]" />
          </span>

          <span
            className={`absolute right-1.5 left-1.5 overflow-hidden rounded-[2px] border border-black/20 ${
              isSlot ? "top-3.5 bottom-1.5" : "top-4 bottom-3.5"
            }`}
          >
            <Image
              src={game.labelSrc}
              alt={`Label ${game.title}`}
              fill
              sizes="72px"
              className="object-cover"
            />
          </span>

          {!isSlot && (
            <span className="absolute right-1 bottom-1 left-1 flex h-2.5 items-end justify-center gap-[2px] rounded-sm bg-[#9e998f] px-1 pb-px">
              {Array.from({ length: 8 }, (_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-[2px] rounded-[1px] bg-gradient-to-b from-[#d4af37] to-[#8a7020]"
                />
              ))}
            </span>
          )}
        </span>
      )}
    </button>
  );
}
