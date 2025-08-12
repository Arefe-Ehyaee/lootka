import React, { useState } from 'react';
import CustomButton from '../CustomButton';
import { useNavigate } from 'react-router-dom';

interface StepEightProps {
  onNext: () => void;
  onBack: () => void;
}

const StepEight: React.FC<StepEightProps> = ({ onNext, onBack }) => {
  const [selectedResort, setSelectedResort] = useState<string | null>(null);
  const navigate = useNavigate();
  const resorts = [
    { id: 'hostel', name: 'هاستل' },
    { id: 'hotel', name: 'هتل' },
    { id: 'ecology', name: 'بوم گردی' },
    { id: 'boutiqueHotel', name: 'بوتیک هتل' }
  ];

  return (
    <div className="w-full mt-20">
      <div className="mb-[40px] font-myIranSansBold text-[32px] text-center p-4 rounded">
   کجا دوست داری بمونی؟     </div>

      <div className='flex flex-col justify-between'>
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {resorts.map(resort => (
            <CustomButton
              key={resort.id}
              text={resort.name}
              handleOnClick={() => setSelectedResort(resort.id)}
              className={`text-black font-myIranSansRegular text-base justify-center shadow-custom h-[80px] w-[140px] rounded-[10.84px] ${selectedResort === resort.id ? 'bg-[#648A33]/20' : ''
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


export default StepEight;
