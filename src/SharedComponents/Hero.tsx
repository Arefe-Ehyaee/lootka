import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroAboutUs from '../assets/images/30669.jpg';
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
        style={{ backgroundImage: `url(${heroAboutUs})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 flex items-start">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-3">
            {/* Title */}
            <div className="text-[#222222] w-full text-center mt-20 desktop:mt-[105px] font-myIranSansBold">
              <h1 className="desktop:text-[48px] tablet:text-[32px] text-[24px] desktop:mb-[39px] mb-[16px]">لوتکا</h1>
              <p className="desktop:text-[24px] tablet:text-[20px] text-[12px]">
                قایق چوبی ما، راهِ‌تو به كشف نشده‌ها...
              </p>
              <p className="desktop:text-[24px] tablet:text-[20px] text-[12px]">
                هر کجا در گیلان، قصه‌ای در انتظار توست؛ از بوی نان تازه تا مه جنگل‌های پنهان...
              </p>
            </div>

            {/* Search */}
            <div className="mt-[10px] desktop:mt-[50px] flex justify-center items-center w-full text-center">
              <div className="relative w-[600px]">
                <Magnifier className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none  w-[20px] h-[20px]" />
                <input
                  type="text"
                  placeholder="جستجوی جاذبه‌های دیدنی، رستوران و اقامتگاه"
                  className="w-full h-10 desktop:h-12 font-myIranSansRegular text-[#222222] text-[14px] pr-12 pl-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
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
