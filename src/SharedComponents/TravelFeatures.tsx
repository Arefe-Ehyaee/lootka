import React from "react";
import { ReactComponent as Check } from "../assets/icons/Verified Check.svg"
import IranMapImage from "../assets/images/Frame 2147223539.png";
import MobileImage from "../assets/images/Frame 2147223550.png";

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

    // ترکیب همه موارد برای نمایش موبایل
    const allFeatures = [...featuresLeft, ...featuresRight];

    return (
        <section className="w-full bg-white py-12 px-6 md:px-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                چرا با لوتکا راحت‌تر سفر می‌کنی؟
            </h2>

            {/* نمایش دسکتاپ */}
            <div className="hidden sm:grid sm:grid-cols-3 items-center gap-1">
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

            {/* نمایش موبایل */}
            <div className="sm:hidden flex items-start gap-4">

                {/* تصویر سمت راست */}
                <div className="flex-2">
                    <img
                        src={MobileImage}
                        alt="سفر با لوتکا"
                        className="max-h-[300px] w-fit"
                    />
                </div>
                {/* لیست موارد */}
                <ul className="flex-1 space-y-[32px] mt-2">
                    {allFeatures.map((item, idx) => (
                        <li
                            key={idx}
                            className="flex items-center justify-start text-[12px] font-myIranSansRegular"
                        >
                            <Check className="w-5 h-5 text-green-700" />
                            <span className="mr-2">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default TravelFeatures;