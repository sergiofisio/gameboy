

export default function Light({ className }: { className: string }) {
  return (
    <div className={`absolute flex flex-col justify-center gap-2 ${className}`}>
        <div className={`bg-black w-3 h-3 rounded-full mx-2!`}>
            <div
            className={`bg-red-500 w-full h-full rounded-full animate-blink shadow-lg border border-black`}
            />
        </div>
        <h1 className="text-white text-[0.5rem]">BATTERY</h1>
    </div>
  );
}