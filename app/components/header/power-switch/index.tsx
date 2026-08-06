"use client";

import { playSound, SOUNDS } from "@/lib/sounds";

type PowerSwitchProps = {
  isOn: boolean;
  onToggle: () => void;
};

export default function PowerSwitch({ isOn, onToggle }: PowerSwitchProps) {
  const handleToggle = () => {
    playSound(isOn ? SOUNDS.powerOff : SOUNDS.powerOn, 0.45);
    onToggle();
  };

  return (
    <button
      type="button"
      aria-pressed={isOn}
      aria-label={isOn ? "Desligar Game Boy" : "Ligar Game Boy"}
      onClick={handleToggle}
      className="absolute top-0 left-4 z-10 flex h-full w-19 cursor-pointer flex-col items-stretch border-0 bg-transparent p-0"
    >
      <span
        className={`absolute -top-3 left-0 flex h-3 w-8 items-center justify-center gap-[2px] rounded-[2px] bg-[#1a1a1a] shadow-[0_1px_2px_rgba(0,0,0,0.45)] transition-transform duration-200 ease-out ${
          isOn ? "translate-x-10" : "translate-x-0"
        }`}
      >
        {Array.from({ length: 3 }, (_, i) => (
          <span
            key={i}
            className="h-2 w-[2px] rounded-[0.5px] bg-[#4a4a4a]"
          />
        ))}
      </span>
      <div className="absolute top-0 left-4 flex w-6 gap-1">
        <span className="h-2 w-1.5 bg-[#8E8C8B]" />
        <span className="h-2 w-1.5 bg-[#8E8C8B]" />
        <span className="h-2 w-1.5 bg-[#8E8C8B]" />
      </div>

      <span className="absolute top-2 mt-auto mb-1.5 flex h-4 w-full items-center justify-center rounded-full bg-[#8E8C8B] bg-[#a09e9c]/[inset_0_1px_2px_rgba(0,0,0,0.18)]">
        <span className="flex items-center gap-1 font-['Unica_One',sans-serif] text-[0.5rem] tracking-wider text-[#3d3b3a] select-none">
          <span aria-hidden className="text-[#b3b1af]">
            ◀
          </span>
          <span className="text-[#b3b1af]">OFF</span>
          <span aria-hidden className="text-[#b3b1af]">
            •
          </span>
          <span className="text-[#b3b1af]">ON</span>
          <span aria-hidden className="text-[#b3b1af]">
            ▶
          </span>
        </span>
      </span>
    </button>
  );
}
