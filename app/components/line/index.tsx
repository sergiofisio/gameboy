

export default function Line({ className, position}: { className: string, position: string }){
    return (
        <div className={`absolute ${position} ${className} flex flex-col gap-1`}>
            <div className={`bg-[#562D4D] h-0.75 w-full `}></div>
            <div className={`bg-[#1D1841] h-0.75 w-full `}></div>
        </div>
    )
}