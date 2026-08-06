type LightProps = {
  className: string;
  isOn?: boolean;
};

export default function Light({ className, isOn = false }: LightProps) {
  return (
    <div className={`absolute flex flex-col justify-center gap-2 ${className}`}>
      <div className="mx-2! h-3 w-3 rounded-full bg-black">
        <div
          className={`h-full w-full rounded-full border border-black shadow-lg transition-opacity duration-300 ${
            isOn
              ? "animate-blink bg-red-500 opacity-100"
              : "bg-red-950 opacity-40"
          }`}
        />
      </div>
      <h1 className="text-[0.5rem] text-white">BATTERY</h1>
    </div>
  );
}
