import React from 'react';
import heroAboutUs from '../assets/images/30669.webp';
import { ReactComponent as Magnifier } from "../assets/icons/Minimalistic Magnifer.svg";

interface HeroProps {
  onAdventureClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAdventureClick }) => {
  return (
    <div className="relative w-full desktop:h-[693px] h-[283px]">
      {/* Hero Image with high priority for LCP */}
      <img
        src={heroAboutUs}
        alt="لوتکا، اولین پلتفرم بومی سفر به گیلان"
        className="w-full h-full object-cover"
        fetchpriority="high" // مرورگر فوراً دانلود می‌کند
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 flex flex-col justify-center items-center">
        {/* Title */}
        <h1 className="text-[#000000] text-center desktop:text-[32px] tablet:text-[32px] text-[18px] font-myYekanMedium mb-4">
          لوتکا، اولین پلتفرم بومی سفر به گیلان
        </h1>

        {/* Search */}
        <div className="mt-4 desktop:mt-6 flex justify-center items-center w-full text-center">
          <div className="relative desktop:w-[500px] tablet:w-[500px] w-[300px]">
            <Magnifier className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-[20px] h-[20px]" />
            <input
              type="text"
              placeholder="جستجوی جاذبه‌های دیدنی، رستوران و اقامتگاه"
              className="w-full h-10 desktop:h-12 font-myYekanRegular text-[#222222] desktop:text-[14px] text-xs desktop:pr-12 pr-10 pl-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
