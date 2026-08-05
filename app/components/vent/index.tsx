

export default function Vent({number}: {number: number}){
    const vents = []    
    for(let i = 0; i < number; i++){
        vents.push(
            <div key={i} className="w-2 h-18 bg-[#908F8D] rounded-full border-l bordel-black borde-l-inset-1"></div>
        )
    }
    return (
        <div className="flex items-center justify-center gap-3.5">
            {vents}
        </div>
    )
}