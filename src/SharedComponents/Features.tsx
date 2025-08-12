
import React from "react";
import first from "../assets/icons/first.svg";
import second from "../assets/icons/second.svg";
import third from "../assets/icons/third.svg";
import fourth from "../assets/icons/fourth.svg";
import fifth from "../assets/icons/fifth.svg";
import sixth from "../assets/icons/sixth.svg";
import { useNavigate } from "react-router-dom";

type Item = {
    icon: string;
    label: string;
};

const items: Item[] = [
    { icon: first, label: "سفر و تفریح" },
    { icon: third, label: "گشتنی و دیدنی" },
    { icon: fourth, label: "هتل و اقامتگاه" },
    { icon: fifth, label: "فرهنگی و هنری" },
    { icon: sixth, label: "تجربه‌ خاص" },
    { icon: second, label: "غذا و رستوران" },
];

const Features: React.FC = () => {
    const navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate('/planner');
        // Scroll to top after navigation
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    };

    return (
        <div className="text-center py-12 px-4">
            <h2 className="text-3xl font-myIranSansMedium text-gray-900 mb-10">چیکار کنیم؟</h2>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                {items.map((item, index) => (
                    <button
                        onClick={handleNavigate}
                        key={index}
                        className="bg-[#FAF9FD] rounded-xl p-4 w-[140px] h-[160px] flex flex-col items-center justify-center shadow-sm hover:shadow-md transition"
                    >
                        <div className="bg-white rounded-full p-4 mb-1">
                            <img src={item.icon} alt={item.label} className="w-8 h-8" />
                        </div>
                        <span className="text-base mt-2 font-myIranSansMedium text-gray-900 text-center leading-tight">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Features;