const cache = new Map<string, HTMLAudioElement>();

function getAudio(src: string) {
  let audio = cache.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.preload = "auto";
    cache.set(src, audio);
  }
  return audio;
}

export function playSound(src: string, volume = 0.5) {
  if (typeof window === "undefined") return;

  const audio = getAudio(src).cloneNode(true) as HTMLAudioElement;
  audio.volume = volume;
  void audio.play().catch(() => {});
}

export const SOUNDS = {
  click: "/sounds/click.wav",
  dpad: "/sounds/dpad.wav",
  powerOn: "/sounds/power-on.wav",
  powerOff: "/sounds/power-off.wav",
} as const;
