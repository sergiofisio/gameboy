

export default function ABButtons({ text }: { text: string }) {
    return (
        <div className="flex flex-col gap-3 items-center justify-center ">
            <button className="bg-[#800943] w-10 h-10 rounded-full">
                
            </button>
            <h1 className="text-[#1D204D] text-[0.75rem] font-black scale-x-[1.4]">
                {text}
            </h1>
        </div>
    )
}
