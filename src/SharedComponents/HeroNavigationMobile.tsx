import { useNavigate } from "react-router-dom";
import map from "../assets/images/map.webp";
import camera from "../assets/images/camera.webp";
import resort from "../assets/images/localResort.webp"
import cuisine from "../assets/images/cuisine.webp"
import cafe from "../assets/images/cafe.webp"
import road from "../assets/images/roud.webp"

const HeroNavigationMobile = () => {
    const navigate = useNavigate();

    const navItems = [
        { img: map, path: '/planner', label: 'برنامه ریز سفر' },
        { img: camera, path: '/destinations', label: 'جای دیدنی' },
        { img: cuisine, path: '/restaurants', label: '  رستوران' },
        { img: cafe, path: '/cafes', label: 'کافه' },
        { img: resort, path: '/hostels', label: 'اقامتگاه بومگردی' },
        { img: road, path: '/restaurants', label: 'تجربه خاص' }
    ];

    return (
        <div className="mx-auto">
            <div className="bg-white rounded-3xl p-4 grid grid-cols-3 gap-4 w-full  font-myYekanDemibold">
                {navItems.map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <button
                            onClick={() => navigate(item.path)}
                            className="flex items-center justify-center w-[100px] h-[100px] border border-[#CFD6DC] rounded-lg"
                        >
                            <img src={item.img} alt={item.label} className="rounded-lg" />
                        </button>
                        <span className="mt-2 text-sm font-myYekanDemibold text-center w-[100px]">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeroNavigationMobile;
