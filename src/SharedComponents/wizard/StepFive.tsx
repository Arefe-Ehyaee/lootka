import React, { useState } from 'react';
import CustomButton from '../CustomButton';
import friends from "../../assets/icons/friends.svg";
import single from "../../assets/icons/character-1_user-avatar-79.svg";
import partner from "../../assets/icons/partner.svg";
import family from "../../assets/icons/Family_family-56.svg"

interface StepFiveProps {
  onNext: () => void;
  onBack: () => void;
}

const StepFive: React.FC<StepFiveProps> = ({ onNext, onBack }) => {
  const [selectedCompanionType, setSelectedCompanionType] = useState<string | null>(null);

  const companions = [
    {
      id: 'alone',
      name: 'تک نفره',
      icon: (
        <img src={single} alt="" />
      )
    },
    {
      id: 'partner',
      name: 'دو نفره',
      icon: (
        <img src={partner} alt="" />
      )
    },
    {
      id: 'friends',
      name: 'دوستانه',
      icon: (
        <img src={friends} alt="" />
      )
    },
    {
      id: 'family',
      name: 'خانوادگی',
      icon: (
        <img src={family} alt="" />
      )
    }
  ];

  return (
    <div className="mt-20 w-full mb-[117px]">
      <div className="mb-[40px] font-myIranSansBold text-[32px] text-center p-4 rounded">
با کی میری سفر؟   </div>

      <div className='flex flex-col justify-between'>
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {companions.map(companion => (
            <CustomButton
              key={companion.id}
              handleOnClick={() => setSelectedCompanionType(companion.id)}
              className={`text-black font-myIranSansRegular text-base justify-center shadow-custom h-[80px] w-[140px] rounded-[10.84px] ${selectedCompanionType === companion.id ? 'bg-[#648A33]/20' : ''
                }`} 
              size="large"
            >
              <div className="flex flex-row items-center gap-[10px] justify-center">
                {/* {option.icon} */}
                <span className="whitespace-nowrap">{companion.name}</span>
              </div>
            </CustomButton>
          ))}
        </div>

        <div className="flex flex-row justify-center gap-[143px] mt-[40px]">
          <CustomButton
            className="border text-white bg-[#648A33] font-myIranSansMedium text-[16px] w-[180px] h-[44px] justify-center"
            handleOnClick={onNext}
            size="medium"
          >
            بعدی
          </CustomButton>

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

export default StepFive;
