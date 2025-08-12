import React, { useState } from 'react';
import CustomButton from '../CustomButton';

interface StepThreeProps {
  onNext: () => void;
  onBack: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ onNext, onBack }) => {
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(null);

  const companions = [
    { id: 'car', name: 'خودرو شخصی' },
    { id: 'train', name: 'قطار' },
    { id: 'bus', name: 'اتوبوس' },
    { id: 'plane', name: 'هواپیما' },
  ];

  return (
    <div className="flex flex-col w-full mt-20">
      <div className="mb-[40px] font-myIranSansBold text-[32px] text-center p-4 rounded">
با چی میخوای بری سفر؟    </div>

      <div className='flex flex-col justify-between'>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {companions.map(option => (
          <CustomButton
            key={option.id}
            text={option.name}
            handleOnClick={() => setSelectedCompanion(option.id)}
            className={`text-black font-myIranSansRegular text-base justify-center shadow-custom h-[80px] w-[140px] rounded-[10.84px] ${selectedCompanion === option.id ? 'bg-[#648A33]/20' : ''
              }`}
          />
        ))}
      </div>

      <div className="flex flex-row justify-center gap-[143px] mt-[40px]">
        <CustomButton
          text="بعدی"
          className="border text-black font-myIranSansRegular text-[12px] w-[180px] h-[44px] bg-[#648A33] justify-center text-white"
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

export default StepThree;
