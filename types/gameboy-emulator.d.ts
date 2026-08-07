declare module "gameboy-emulator" {
  export class Gameboy {
    fps: number;
    keyboardManager: {
      a: string;
      b: string;
      start: string;
      select: string;
      up: string;
      down: string;
      left: string;
      right: string;
    };
    apu: {
      enableSound: () => void;
      disableSound: () => void;
      isAudioEnabled: boolean;
    };
    loadGame: (rom: ArrayBuffer) => void;
    run: () => void;
    runFrame: (time: number) => void;
    onFrameFinished: (
      callback: (imageData: ImageData, fps: number) => void
    ) => void;
  }
}
