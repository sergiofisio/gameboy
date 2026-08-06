"use client";

import { useState } from "react";
import { getCartridge } from "@/lib/cartridges";
import { playSound, SOUNDS } from "@/lib/sounds";
import ABButtons from "../components/buton/abButtons";
import DPad from "../components/buton/dpad";
import SelectStartButtons from "../components/buton/selectstartButtons";
import CartridgeRack from "../components/cartridge-rack";
import CartridgeSlot from "../components/cartridge-slot";
import Header from "../components/header";
import Light from "../components/light";
import Line from "../components/line";
import Screen from "../components/screen";
import Vent from "../components/vent";
import VolumeWheel from "../components/volume-wheel";

export default function Page() {
  const [isOn, setIsOn] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [insertedId, setInsertedId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const insertedGame = getCartridge(insertedId);

  const handleInsert = (id: string) => {
    if (isOn || insertedId === id || isAnimating) return;

    playSound(SOUNDS.click, 0.4);

    const insert = () => {
      setInsertedId(id);
      setIsAnimating(true);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsAnimating(false);
        });
      });
    };

    if (insertedId) {
      setIsAnimating(true);
      window.setTimeout(() => {
        insert();
      }, 280);
      return;
    }

    insert();
  };

  const handleEject = () => {
    if (isOn || !insertedId || isAnimating) return;
    playSound(SOUNDS.dpad, 0.35);
    setIsAnimating(true);

    window.setTimeout(() => {
      setInsertedId(null);
      setIsAnimating(false);
    }, 350);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5 overflow-x-hidden px-3 py-4 sm:gap-6 sm:py-6">
      {/* Mobile: cartuchos no topo */}
      <div className="w-full max-w-lg lg:hidden">
        <CartridgeRack
          insertedId={insertedId}
          onInsert={handleInsert}
          poweredOn={isOn}
        />
      </div>

      {/* Desktop: rack | console | spacer (mesma largura do rack) = console no centro */}
      <div className="flex w-full max-w-5xl items-center justify-center gap-4 sm:gap-6">
        <div className="hidden shrink-0 lg:block">
          <CartridgeRack
            insertedId={insertedId}
            onInsert={handleInsert}
            poweredOn={isOn}
          />
        </div>

        <div className="relative mt-8 flex h-[36rem] w-[22rem] max-w-[min(22rem,92vw)] shrink-0 scale-[0.92] flex-col items-center origin-top sm:mt-10 sm:scale-100">
          <CartridgeSlot
            game={insertedGame}
            isAnimating={isAnimating}
            onEject={handleEject}
            poweredOn={isOn}
          />

          <div className="absolute top-0 left-0 mx-0.5! my-2! h-[35.5rem] w-[21.5rem] max-w-[calc(100%-0.25rem)] rounded-t-md rounded-br-[5rem] rounded-bl-md border border-[#8e8c8b] bg-transparent shadow-2xl" />
          <VolumeWheel volume={volume} onChange={setVolume} />
          <Header isOn={isOn} onToggle={() => setIsOn((prev) => !prev)} />
          <div className="max-h-0.5 w-full self-end border-b-6 border-b-[#8e8c8b]" />
          <div className="flex h-full w-full flex-col items-center justify-center rounded-tl-md rounded-br-[6rem] rounded-bl-xl bg-[#b3b1af]">
            <div className="relative flex items-center justify-center p-5!">
              <div className="relative flex h-58 w-80 max-w-full flex-col items-center-safe justify-center-safe rounded-t-xl rounded-br-[3rem] rounded-bl-xl border-3 border-[#878785] bg-[#53535F]">
                <Line className="h-fit w-22" position="top-2 left-4" />
                <Line className="h-fit w-10" position="top-2 right-4" />
                <Screen
                  className="h-45 w-50 rounded-sm border-2 border-black"
                  isOn={isOn}
                  volume={volume}
                  cartridge={insertedGame}
                />
                <Light className="top-18 left-2" isOn={isOn} />
              </div>
            </div>
            <div className="flex h-full w-full flex-col justify-center gap-3 pt-4!">
              <div className="relative flex h-1/2 w-full items-center gap-2 pr-2! pl-7!">
                <div className="flex h-fit w-full">
                  <DPad className="h-24 w-24" />
                </div>
                <div className="flex h-fit w-1/2 items-start justify-center gap-5 -rotate-25">
                  <ABButtons text="B" />
                  <ABButtons text="A" />
                </div>
              </div>
              <div className="flex h-1/2 w-full justify-center">
                <div className="flex h-fit items-center justify-center gap-5">
                  <SelectStartButtons text="SELECT" />
                  <SelectStartButtons text="START" />
                </div>
                <div className="absolute right-6 bottom-10 flex items-center justify-center -rotate-35">
                  <Vent number={6} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer espelha a largura do rack para manter o Game Boy no centro */}
        <div className="hidden w-[5.5rem] shrink-0 lg:block" aria-hidden />
      </div>
    </div>
  );
}
