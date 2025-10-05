import { useNavigate } from "react-router-dom";
import map from "../assets/images/map.webp";
import camera from "../assets/images/camera.webp";
import resort from "../assets/images/localResort.webp"
import cuisine from "../assets/images/cuisine.webp"
import cafe from "../assets/images/cafe.webp"
import road from "../assets/images/roud.webp"


const HeroNavigation = () => {
    const navigate = useNavigate();

    return (
        <div className="mx-auto">
            {/* Navigation buttons without text */}
            <div className="h-[120px] w-[894px] px-[0px] mx-auto bg-white rounded-lg pt-4 flex justify-around items-center text-center">
                <button
                    onClick={() => navigate('/planner')}
                    className="flex flex-col items-center justify-center w-[100px] h-[100px] border-[1.8px] border-[#CFD6DC] rounded-lg "
                >
                    <img src={map} alt="برنامه‌ریز سفر" className="rounded-lg" />
                </button>
                <button
                    onClick={() => navigate('/attractions')}
                    className="flex flex-col items-center justify-center w-[100px] h-[100px] border-[1.8px] border-[#CFD6DC] rounded-lg "
                >
                    <img src={camera} alt="جای دیدنی" className="w-[100px] h-[100px] rounded-lg" />
                </button>
                <button
                    onClick={() => navigate('/restaurants')}
                    className="flex flex-col items-center justify-center w-[100px] h-[100px] border-[1.8px] border-[#CFD6DC] rounded-lg "
                >
                    <img src={cuisine} alt="رستوران" className=" rounded-lg" />
                </button>
                <button
                    onClick={() => navigate('/cafes')}
                    className="flex flex-col items-center justify-center w-[100px] h-[100px] border-[1.8px] border-[#CFD6DC] rounded-lg "
                >
                    <img src={cafe} alt="کافه" className=" rounded-lg"/>
                </button>
                <button
                    onClick={() => navigate('/hostels')}
                    className="flex flex-col items-center justify-center w-[100px] h-[100px] border-[1.8px] border-[#CFD6DC] rounded-lg "
                >
                    <img src={resort} alt="اقامتگاه" className=" rounded-lg"/>

                </button>
                <button
                    onClick={() => navigate('/')}
                    className="flex flex-col items-center justify-center w-[100px] h-[100px] border-[1.8px] border-[#CFD6DC] rounded-lg "
                >
                    <img src={road} alt="تجربه خاض" className=" rounded-lg"/>
                </button>
            </div>

            {/* Section names displayed below */}
            <div className="w-[894px] mx-auto mt-[10px] flex items-center font-myYekanDemibold text-center justify-between px-[24px]">
                <span className="text-sm w-[100px]">برنامه‌ریز سفر</span>
                <span className="text-sm w-[100px]">جای دیدنی</span>
                <span className="text-sm w-[100px]">رستوران</span>
                <span className="text-sm w-[100px]">کافه</span>
                <span className="text-sm w-[100px]">اقامتگاه بومگردی</span>
                <span className="text-sm w-[100px]">تجربه خاص</span>
            </div>
        </div>
    );
};

export default HeroNavigation;