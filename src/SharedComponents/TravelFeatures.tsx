import React from "react";
import { ReactComponent as Check } from "../assets/icons/Verified Check.svg"
import IranMapImage from "../assets/images/Frame 2147223539.png";

const TravelFeatures: React.FC = () => {
    const featuresLeft = [
        "سفر مثل یک بومی",
        "معرفی مکان‌های کشف‌نشده",
        "رستوران‌های بومی و محلی",
    ];

    const featuresRight = [
        "شنیده‌های سفر",
        "اطلاعات یکپارچه سفر",
        "اقامتگاه‌های بومگردی و خاص",
    ];

    return (
        <section className="w-full bg-white py-12 px-6 md:px-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                چرا با لوتکا راحت‌تر سفر می‌کنی؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-1">
                {/* لیست سمت راست */}
                <ul className="space-y-[64px] text-right">
                    {featuresLeft.map((item, idx) => (
                        <li
                            key={idx}
                            className="flex items-center justify-end text-lg font-myIranSansRegular"
                        >
                            <Check className="w-5 h-5 text-green-700" />
                            <span className="mr-2">{item}</span>
                        </li>
                    ))}
                </ul>

                {/* تصویر وسط */}
                <div className="flex justify-center">
                    <img
                        src={IranMapImage}
                        alt="ایران - سفر با لوتکا"
                        className="max-h-[300px] object-contain"
                    />
                </div>

                {/* لیست سمت چپ */}
                <ul className="space-y-[64px] text-right">
                    {featuresRight.map((item, idx) => (
                        <li
                            key={idx}
                            className="flex items-center text-lg font-myIranSansRegular"
                        >
                            <Check className="w-5 h-5 text-green-700 ml-2" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default TravelFeatures;
