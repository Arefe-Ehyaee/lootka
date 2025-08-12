import React, { useState } from 'react';
import CustomButton from '../CustomButton';
import Calendar from './Calendar';

interface StepFourProps {
  onNext: () => void;
  onBack: () => void;
}

const StepFour: React.FC<StepFourProps> = ({ onNext, onBack }) => {
    const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  
  const companions = [
    { id: 'oneDay', name: 'سفر یک روزه' },
    { id: 'weekend', name: 'سفر آخر هفته ای' },
    { id: 'week', name: 'سفر یک هفته ای' },
    { id: 'summer', name: 'سفر تابستونی' }
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-20 w-full">
      <div className="mb-[40px] font-myIranSansBold text-[32px] text-center p-4 rounded">
چند روزه میخوای بری سفر؟   </div>

      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {companions.map(companion => (
          <CustomButton
            key={companion.id}
            text={companion.name}
                          handleOnClick={() => setSelectedDuration(companion.id)}

              className={`text-black font-myIranSansRegular text-base justify-center shadow-custom h-[80px] w-[140px] rounded-[10.84px] ${selectedDuration === companion.id ? 'bg-[#648A33]/20' : ''
                }`}          />
        ))}
      </div>
      <Calendar></Calendar>

      <div className="flex flex-row gap-[143px] mt-2">
        <CustomButton text="بعدی" className="border text-black font-myIranSansRegular text-[12px] w-[180px] h-[44px] bg-[#648A33] justify-center text-white" handleOnClick={onNext} />
        <button onClick={onBack} className="font-myIranSansRegular text-[14px] underline underline-offset-8 text-[#648A33]">
          بازگشت به مرحله قبل
        </button>
      </div>
    </div>
  );
};

export default StepFour;
