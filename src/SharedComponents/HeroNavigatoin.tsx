import { useNavigate } from "react-router-dom";
import suitcase from "../assets/images/Suitcase.svg";
import scuba from "../assets/images/Scuba.svg";
import map from "../assets/images/map.svg"
import tent from "../assets/images/tent.svg"
import eat from "../assets/images/eat (2).svg"
import boat from "../assets/images/Boat.svg"


const HeroNavigation = () => {
    const navigate = useNavigate();

    return (
        <div className="mx-auto">
            {/* Navigation buttons without text */}
            <div className="h-[120px] w-[894px] px-[0px] mx-auto bg-white rounded-full pt-4 flex justify-around items-center text-center">
                <button
                    onClick={() => navigate('/')}
                    className="flex flex-col items-center justify-center w-[100px] h-[100px] border-[1.8px] border-[#CFD6DC] rounded-lg "
                >
                    <img src={suitcase} alt="" />
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="flex flex-col items-center justify-center w-[100px] h-[100px] border-[1.8px] border-[#CFD6DC] rounded-lg "
                >
                    <img src={map} alt="" />
                </button>
                <button
                    onClick={() => navigate('/restaurants')}
                    className="flex flex-col items-center justify-center w-[100px] h-[100px] border-[1.8px] border-[#CFD6DC] rounded-lg "
                >
                    <img src={eat} alt="" />

                </button>
                <button
                    onClick={() => navigate('/hostels')}
                    className="flex flex-col items-center justify-center w-[100px] h-[100px] border-[1.8px] border-[#CFD6DC] rounded-lg "
                >
                    <img src={tent} alt="" />
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="flex flex-col items-center justify-center w-[100px] h-[100px] border-[1.8px] border-[#CFD6DC] rounded-lg "
                >
                    <img src={boat} alt="" />

                </button>
                <button
                    onClick={() => navigate('/')}
                    className="flex flex-col items-center justify-center w-[100px] h-[100px] border-[1.8px] border-[#CFD6DC] rounded-lg "
                >
                    <img src={scuba} alt="" />
                </button>
            </div>

            {/* Section names displayed below */}
            <div className="w-[894px] mx-auto mt-[10px] flex items-center text-center justify-between px-[24px]">
                <span className="text-sm font-myIranSansMedium w-[100px]">تور</span>
                <span className="text-sm font-myIranSansMedium w-[100px]">برنامه‌ریزی سفر</span>
                <span className="text-sm font-myIranSansMedium w-[100px]">کافه و رستوران</span>
                <span className="text-sm font-myIranSansMedium w-[100px]">هتل و اقامتگاه</span>
                <span className="text-sm font-myIranSansMedium w-[100px]">تفریح</span>
                <span className="text-sm font-myIranSansMedium w-[100px]">تجربه خاص</span>
            </div>
        </div>
    );
};

export default HeroNavigation;