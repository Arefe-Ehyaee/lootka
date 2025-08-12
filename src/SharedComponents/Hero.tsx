import React from 'react';
import rasht from "../assets/images/mostafa-yekrangi-d4uDkMbdma0-unsplash.jpg";
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onAdventureClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAdventureClick }) => {
    const navigate = useNavigate();
  return (
    <div
      className="relative h-[500px] bg-cover bg-center"
      style={{ backgroundImage: `url(${rasht})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-start pt-3">
          <div className="text-white w-full text-center lg:text-right lg:max-w-[400px] lg:ml-auto lg:mr-40 mt-4">
            <h1 className="text-5xl font-myIranSansMedium mb-2">لوتکا</h1>
            <p className="text-2xl font-myIranSansMedium">قایق چوبی ما،</p>
            <p className="text-xl font-myIranSansMedium">راهِ‌تو به كشف نشده‌ها...</p>


          </div>

          <div className='pr-[54%] text-gray-50 mt-[6%] font-myIranSansMedium'>
            <p>هر کجا در گیلان، قصه‌ای در انتظار توست؛

            </p>

            <p>از بوی نان تازه تا مه جنگل‌های پنهان...</p>
          </div>

           <button
              onClick={() => navigate("/planner")}
              className="min-[390px]:max-[743px]:mt-[32%] desktop:mt-[13%] font-myIranSansMedium tablet:mt-[18%] mt-[50%] mx-auto flex justify-center bg-gray-600 desktop:w-[15%] tablet:w-[26%] w-[60%] min-[390px]:max-[743px]:w-[36%] min-[390px]:max-[477px]:w-[50%] desktop:text-lg tablet:text-base text-sm border border-white bg-opacity-50 hover:bg-gray-700 text-white font-myIranSansFaNumBold py-2 px-6 rounded-full transition-all duration-300"
            >
               برنامه‌ریزی سفر 
            </button> 

        </div>
      </div>
    </div>
  );
};

export default Hero;
