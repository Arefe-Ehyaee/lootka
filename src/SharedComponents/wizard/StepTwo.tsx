import React, { useState } from 'react';
import CustomButton from '../CustomButton';

interface StepTwoProps {
  onNext: () => void;
  onBack: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onNext, onBack }) => {
  const [selectedDestinationCity, setSelectedDestinationCity] = useState<string | null>(null);
  const [gilantour, setGilantour] = useState<boolean>(false);

  const cities = [
    { id: 'tehran', name: 'تهران' },
    { id: 'rasht', name: 'رشت' },
    { id: 'shiraz', name: 'شیراز' },
    { id: 'isfahan', name: 'اصفهان' }
  ];

  return (
    <div className="w-full mt-20 mb-[117px]">
      <div className="mb-[40px] font-myIranSansBold text-[32px] text-center p-4 rounded">
        به کجا میخوای سفر کنی؟
      </div>

      <div className='flex flex-col justify-between'>
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {cities.map(city => (
            <CustomButton
              key={city.id}
              text={city.name}
              handleOnClick={() => setSelectedDestinationCity(city.id)}
              className={`text-black font-myIranSansRegular text-base justify-center shadow-custom h-[80px] w-[140px] rounded-[10.84px] ${selectedDestinationCity === city.id ? 'bg-[#648A33]/20' : ''
                }`}
            />
          ))}
        </div>

        {/* Gilan Tour Checkbox */}
        <div className="mt-6 justify-center">
          <label className="flex flex-row items-center justify-center gap-2 text-[#333] font-myIranSansRegular text-[14px]">
            <input
              type="checkbox"
              checked={gilantour}
              onChange={() => setGilantour(!gilantour)}
              className="w-4 h-4 accent-[#648A33]"
            />
            میخوام گیلان‌گردی کنم        </label>
        </div>

        <div className="flex flex-row justify-center gap-[143px] mt-6">
          <CustomButton
            text="بعدی"
            className="border font-myIranSansRegular text-[12px] w-[180px] h-[44px] bg-[#648A33] justify-center text-white"
            handleOnClick={onNext}
          />
          <button
            onClick={onBack}
            className="font-myIranSansRegular text-[14px] underline underline-offset-8 text-[#648A33]"
          >
            بازگشت به مرحله قبل
          </button>
        </div>
      </div>

    </div>
  );
};

export default StepTwo;
