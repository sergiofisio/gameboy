"use client";

import { CARTRIDGES } from "@/lib/cartridges";
import Cartridge from "../cartridge";

type CartridgeRackProps = {
  insertedId: string | null;
  onInsert: (id: string) => void;
  poweredOn?: boolean;
};

export default function CartridgeRack({
  insertedId,
  onInsert,
  poweredOn = false,
}: CartridgeRackProps) {
  return (
    <aside className="flex w-full flex-col items-center gap-2 lg:w-[5.5rem] lg:items-stretch">
      <div className="rounded bg-black/35 px-2 py-1.5 text-center backdrop-blur-[2px] lg:text-left">
        <h2 className="font-['Press_Start_2P',monospace] text-[0.42rem] tracking-wide text-white">
          JOGOS
        </h2>
        <p className="mt-1 text-[0.6rem] leading-snug text-white/75">
          {poweredOn ? "Desligue para trocar" : "Clique para inserir"}
        </p>
      </div>

      <div className="flex w-full items-end justify-center gap-2 overflow-x-auto pb-1 lg:flex-col lg:items-center lg:gap-2 lg:overflow-visible">
        {CARTRIDGES.map((game) => {
          const isInserted = insertedId === game.id;
          const disabled = poweredOn || isInserted;

          return (
            <div
              key={game.id}
              className={`relative shrink-0 transition-all duration-300 ${
                isInserted || poweredOn ? "opacity-40" : ""
              } ${isInserted ? "grayscale" : ""}`}
            >
              <div className="absolute -bottom-0.5 left-1/2 h-1.5 w-3/4 -translate-x-1/2 rounded-full bg-black/35 blur-[2px]" />
              <Cartridge
                game={game}
                selected={isInserted}
                disabled={disabled}
                onClick={() => onInsert(game.id)}
              />
            </div>
          );
        })}
      </div>
    </aside>
  );
}
