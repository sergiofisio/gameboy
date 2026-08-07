"use client";

import { useEffect, useRef, useState } from "react";
import type { Gameboy } from "gameboy-emulator";
import { ensureSharedArrayBuffer } from "@/lib/ensure-shared-array-buffer";

type TetrisEmulatorProps = {
  volume?: number;
  romUrl?: string;
};

/** Prevents React Strict Mode from keeping two RAF loops alive. */
let emulatorOwnerId = 0;

export default function TetrisEmulator({
  volume = 0.6,
  romUrl,
}: TetrisEmulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"boot" | "loading" | "ready" | "error" | "missing">(
    romUrl ? "boot" : "missing"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!romUrl) {
      setStatus("missing");
      return;
    }

    const ownerId = ++emulatorOwnerId;
    let cancelled = false;
    let preventDefaults: ((event: KeyboardEvent) => void) | null = null;

    const start = async () => {
      setStatus("loading");
      setErrorMessage(null);

      try {
        const audioSupported = ensureSharedArrayBuffer();

        const mod = await import("gameboy-emulator");
        const GameboyCtor =
          (mod as { Gameboy?: new () => Gameboy }).Gameboy ??
          (mod as { default?: { Gameboy?: new () => Gameboy } }).default?.Gameboy;

        if (!GameboyCtor) {
          throw new Error("Gameboy export not found");
        }

        if (cancelled || ownerId !== emulatorOwnerId || !canvasRef.current) {
          return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas 2D unavailable");

        const romResponse = await fetch(romUrl);
        if (!romResponse.ok) {
          throw new Error(`ROM HTTP ${romResponse.status}`);
        }
        const romBuffer = await romResponse.arrayBuffer();

        if (cancelled || ownerId !== emulatorOwnerId) return;

        const gb = new GameboyCtor();

        // Plan mapping: Z=A, X=B, Enter=Start, Space=Select, arrows=D-pad
        gb.keyboardManager.a = "KeyZ";
        gb.keyboardManager.b = "KeyX";
        gb.keyboardManager.start = "Enter";
        gb.keyboardManager.select = "Space";
        gb.keyboardManager.up = "ArrowUp";
        gb.keyboardManager.down = "ArrowDown";
        gb.keyboardManager.left = "ArrowLeft";
        gb.keyboardManager.right = "ArrowRight";

        gb.onFrameFinished((imageData) => {
          if (cancelled || ownerId !== emulatorOwnerId) return;
          ctx.putImageData(imageData, 0, 0);
        });

        // Stop RAF when this session is no longer the owner (Strict Mode safe)
        const originalRunFrame = gb.runFrame.bind(gb);
        gb.runFrame = (time: number) => {
          if (cancelled || ownerId !== emulatorOwnerId) return;
          originalRunFrame(time);
        };

        gb.loadGame(romBuffer);

        preventDefaults = (event: KeyboardEvent) => {
          if (
            [
              "ArrowUp",
              "ArrowDown",
              "ArrowLeft",
              "ArrowRight",
              "Space",
            ].includes(event.code)
          ) {
            event.preventDefault();
          }
        };
        window.addEventListener("keydown", preventDefaults, { passive: false });

        gb.run();

        const enableAudio = () => {
          if (!audioSupported || !crossOriginIsolated) return;
          try {
            if (volume > 0) gb.apu.enableSound();
            else gb.apu.disableSound();
          } catch {
            /* AudioWorklet / Atomics may still fail without real SAB */
          }
        };
        enableAudio();
        window.addEventListener("pointerdown", enableAudio, { once: true });

        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        canvas.focus();

        if (!cancelled && ownerId === emulatorOwnerId) {
          setStatus("ready");
        }
      } catch (error) {
        if (cancelled || ownerId !== emulatorOwnerId) return;
        console.error("[TetrisEmulator]", error);
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Falha ao iniciar o emulador"
        );
      }
    };

    void start();

    return () => {
      cancelled = true;
      if (preventDefaults) {
        window.removeEventListener("keydown", preventDefaults);
      }
    };
  }, [romUrl, volume]);

  return (
    <div className="absolute inset-0 z-10 bg-[#9cbc0f]">
      <canvas
        ref={canvasRef}
        width={160}
        height={144}
        className="h-full w-full [image-rendering:pixelated]"
        tabIndex={0}
        aria-label="Tetris Game Boy"
      />

      {status === "ready" && (
        <p className="pointer-events-none absolute bottom-1 left-0 right-0 text-center font-['Press_Start_2P',monospace] text-[0.28rem] text-[#1a2a08]/70">
          ENTER=START  Z=A  X=B
        </p>
      )}

      {status !== "ready" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#9cbc0f] p-3 text-center">
          {status === "missing" && (
            <>
              <p className="font-['Press_Start_2P',monospace] text-[0.4rem] leading-relaxed text-[#1a2a08]">
                ROM NAO
                <br />
                CONFIGURADA
              </p>
              <p className="max-w-[90%] font-['Unica_One',sans-serif] text-[0.55rem] text-[#1a2a08]/80">
                Defina NEXT_PUBLIC_TETRIS_ROM_URL
              </p>
            </>
          )}
          {status === "loading" || status === "boot" ? (
            <p className="font-['Press_Start_2P',monospace] text-[0.4rem] text-[#1a2a08]">
              CARREGANDO...
            </p>
          ) : null}
          {status === "error" && (
            <>
              <p className="font-['Press_Start_2P',monospace] text-[0.4rem] text-[#1a2a08]">
                ERRO ROM
              </p>
              {errorMessage ? (
                <p className="max-w-[90%] wrap-break-word font-['Unica_One',sans-serif] text-[0.5rem] text-[#1a2a08]/80">
                  {errorMessage}
                </p>
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
  );
}
