import ABButtons from "../components/buton/abButtons";
import DPad from "../components/buton/dpad";
import SelectStartButtons from "../components/buton/selectstartButtons";
import Light from "../components/light";
import Line from "../components/line";
import Screen from "../components/screen";
import Vent from "../components/vent";


export default function Page() {
    return (
        <div className="w-96 h-150  relative flex flex-col items-center ">
            <div className="shadow-2xl mx-0.5! my-2! w-94 h-147 bg-transparent border border-[#8e8c8b] rounded-br-[5rem] rounded-bl-md rounded-t-md absolute top-0 left-0"></div>
            <header className="flex h-9 w-full">
                <div className="bg-[#b3b1af] w-8 h-full rounded-tr-sm rounded-tl-xl"></div>
                <div className="self-end border-l-6 border-l-[#8e8c8b] h-7.5"></div>
                <div className="bg-[#b3b1af] w-full h-full rounded-t-sm"></div>
                <div className="self-end border-l-6 border-l-[#8e8c8b] h-7.5"></div>
                <div className="bg-[#b3b1af] w-10 h-full rounded-tr-xl rounded-tl-sm"></div>
            </header>
            <div className="self-end border-b-6 border-b-[#8e8c8b] w-95.5 max-h-0.5"></div>
            <div className="bg-[#b3b1af] w-full h-full rounded-br-[6rem] rounded-tl-md rounded-bl-xl flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center p-5!">
                    <div className="bg-[#53535F] w-80 h-58 border-3 rounded-br-[3rem] rounded-bl-xl rounded-t-xl border-[#878785] relative flex flex-col items-center-safe justify-center-safe">
                        <Line className="w-22 h-fit" position="top-2 left-4" />
                        <Line className="w-10 h-fit" position="top-2 right-4" />
                        <Screen className="w-50 h-45 border-2 border-black rounded-sm" />
                        <Light className="top-18 left-2" />
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-3 justify-center pt-4!">
                    <div className='w-full h-1/2 flex items-center pl-7! pr-2! gap-2 relative'>
                        <div className="w-full h-fit flex ">
                            <DPad className="w-24 h-24" />
                        </div>
                        <div className="w-1/2 h-fit flex items-start justify-center gap-5 -rotate-25">
                            <ABButtons text="B" />
                            <ABButtons text="A" />
                        </div>
                    </div>
                    <div className="w-full h-1/2 flex justify-center">
                        <div className="h-fit flex items-center justify-center gap-5">
                            <SelectStartButtons text="SELECT" />
                            <SelectStartButtons text="START" />
                        </div>
                        <div className="absolute bottom-10 right-6 flex items-center justify-center -rotate-35">
                            <Vent number={6} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}