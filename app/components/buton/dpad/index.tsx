type DPadProps = {
  className?: string;
};

export default function DPad({ className = "" }: DPadProps) {
  return (
    <div className={`relative aspect-square ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-x-1 translate-y-1 bg-black"
        style={{ clipPath: CROSS_CLIP }}
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-black"
        style={{ clipPath: CROSS_CLIP }}
      />

      <div
        aria-hidden
        className="absolute inset-[3px] bg-[#6E706D]"
        style={{ clipPath: CROSS_CLIP }}
      />

      <div
        className="absolute inset-[7px] bg-[#1a1a22]"
        style={{ clipPath: CROSS_CLIP }}
      />

      <div className="absolute top-1/2 left-1/2 size-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#121218] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
    </div>
  );
}

/** Cruz simétrica: braços ~34% da largura */
const CROSS_CLIP = [
  "polygon(",
  "33% 0%, 67% 0%,",
  "67% 33%, 100% 33%,",
  "100% 67%, 67% 67%,",
  "67% 100%, 33% 100%,",
  "33% 67%, 0% 67%,",
  "0% 33%, 33% 33%",
  ")",
].join(" ");
