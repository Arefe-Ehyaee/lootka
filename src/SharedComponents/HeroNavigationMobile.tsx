import { useNavigate } from "react-router-dom";
import suitcase from "../assets/images/Suitcase.svg";
import scuba from "../assets/images/Scuba.svg";
import map from "../assets/images/map.svg";
import tent from "../assets/images/tent.svg";
import eat from "../assets/images/eat (2).svg";
import boat from "../assets/images/Boat.svg";

const HeroNavigationMobile = () => {
    const navigate = useNavigate();

    const navItems = [
        { img: suitcase, path: '/planner', label: 'برنامه ریز سفر' },
        { img: map, path: '/destinations', label: 'جای دیدنی' },
        { img: eat, path: '/restaurants', label: '  رستوران' },
        { img: boat, path: '/cafes', label: 'کافه' },
        { img: tent, path: '/hostels', label: 'اقامتگاه بومگردی' },
        { img: scuba, path: '/restaurants', label: 'تجربه خاص' }
    ];

    return (
        <div className="mx-auto">
            <div className="bg-white rounded-3xl p-4 grid grid-cols-3 gap-4 w-full">
                {navItems.map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <button
                            onClick={() => navigate(item.path)}
                            className="flex items-center justify-center w-[100px] h-[100px] border border-[#CFD6DC] rounded-lg"
                        >
                            <img src={item.img} alt={item.label} />
                        </button>
                        <span className="mt-2 text-sm font-myIranSansMedium text-center w-[100px]">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroNavigationMobile;
