

export default function SelectStartButtons({ text }: { text: string }) {
    return (
        <div className="flex flex-col gap-1 items-center justify-center -rotate-30">
            <button className="bg-[#69666D] w-12 h-3 rounded-full border border-black">
                
            </button>
            <h1 className="text-[#1D204D] text-[0.6rem] font-black tracking-wide scale-x-130">
                {text}
            </h1>
        </div>
    )
}