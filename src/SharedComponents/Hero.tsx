import React from 'react';
import heroAboutUs from '../assets/images/30669.webp';
import { ReactComponent as Magnifier } from "../assets/icons/Minimalistic Magnifer.svg";

interface HeroProps {
  onAdventureClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAdventureClick }) => {

  return (
    <div className="relative">
      {/* Hero Section */}
      <div
        className="desktop:h-[693px] h-[283px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroAboutUs})`, minHeight: '283px' }}
      >

        {/* Dark overlay */}
        <div className="absolute inset-0 flex items-start">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-3">
            {/* Title */}
            <div className="text-[#000000] w-full text-center mt-[20px] desktop:mt-[20px] font-myYekanMedium">
              <h1 className="desktop:text-[32px] tablet:text-[32px] text-[18px] desktop:mb-[4px] mb-[4px]">لوتکا، اولین پلتفرم بومی سفر به گیلان</h1>
            </div>

            {/* Search */}
            <div className="mt-1 desktop:mt-[16px] flex justify-center items-center w-full text-center">
              <div className="relative desktop:w-[500px] tablet:w-[500px] w-[300px]">
                <Magnifier className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none  w-[20px] h-[20px]" />
                <input
                  type="text"
                  placeholder="جستجوی جاذبه‌های دیدنی، رستوران و اقامتگاه"
                  className="w-full h-10 desktop:h-12 font-myYekanRegular text-[#222222] desktop:text-[14px] text-xs desktop:pr-12 pr-10 pl-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            </div>

          </div>
        </div>
      </div>



    </div>
  );
};

export default Hero;
