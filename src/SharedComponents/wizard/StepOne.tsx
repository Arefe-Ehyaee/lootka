import React, { useState } from 'react';
import CustomButton from '../CustomButton';

interface StepProps {
  onNext: () => void;
}

const StepOne: React.FC<StepProps> = ({ onNext }) => {
  const [selectedOriginCity, setSelectedOriginCity] = useState<string | null>(null);

  const cities = [
    { id: 'tehran', name: 'تهران' },
    { id: 'rasht', name: 'رشت' },
    { id: 'shiraz', name: 'شیراز' },
    { id: 'isfahan', name: 'اصفهان' }
  ];

  return (
    <div className="w-full mt-20 mb-[117px]">
      <div className="mb-[40px] font-myIranSansBold text-[32px] text-center p-4 rounded">
مقصد سفرت کجاست؟     </div>

      <div className='flex flex-col justify-between'>
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {cities.map(city => (
            <CustomButton
              key={city.id}
              text={city.name}
              handleOnClick={() => setSelectedOriginCity(city.id)}
              className={`text-black font-myIranSansRegular text-base justify-center shadow-custom h-[80px] w-[140px] rounded-[10.84px] ${selectedOriginCity === city.id ? 'bg-[#648A33]/20' : ''
                }`}
            />
          ))}
        </div>

        <div className="flex flex-row justify-center mt-[40px]">
          <CustomButton
            text="بعدی"
            className="border text-black font-myIranSansRegular text-[12px] w-[180px] h-[44px] bg-[#648A33] justify-center text-white"
            handleOnClick={onNext}
          />
        </div>
      </div>

    </div>
  );
};

export default StepOne;
