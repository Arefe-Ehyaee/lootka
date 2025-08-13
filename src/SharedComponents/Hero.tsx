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
        className="h-[693px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroAboutUs})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 flex items-start">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-3">
            {/* Title */}
            <div className="text-white w-full text-center desktop:mt-[105px]">
              <h1 className="text-[48px] font-myIranSansBold mb-[39px]">لوتکا</h1>
              <p className="text-[24px] font-myIranSansBold">
                قایق چوبی ما، راهِ‌تو به كشف نشده‌ها...
              </p>
              <p className="text-[24px] font-myIranSansMedium">
                هر کجا در گیلان، قصه‌ای در انتظار توست؛ از بوی نان تازه تا مه جنگل‌های پنهان...
              </p>
            </div>

            {/* Search */}
            <div className="mt-[50px] flex justify-center">
              <div className="relative w-full w-[600px]">
                <Magnifier className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="جستجوی جاذبه‌های دیدنی، رستوران و اقامتگاه"
                  className="w-full h-12 font-myIranSansRegular text-[#222222] text-[14px] pr-[100px] pl-1 text-right border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
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
