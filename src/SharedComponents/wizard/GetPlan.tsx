import React, { useState } from 'react';
import CustomButton from '../CustomButton';
import z from 'zod';

const phoneSchema = z
  .string()
  .regex(/^09\d{9}$/, { message: 'شماره موبایل معتبر نیست (باید با 09 شروع شود و 11 رقم باشد)' });

const GetPlan: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const result = phoneSchema.safeParse(phoneNumber);

    if (result.success) {
      setError(null);
      // ✅ Submit the phone number or continue
      console.log('شماره تایید شد:', phoneNumber);
    } else {
      setError(result.error.issues[0].message);
    }
  };

  return (
    <div className="w-full mt-20 flex flex-col items-center justify-center text-center">
      <h2 className="font-myIranSansBold text-[24px] md:text-[32px] mb-6">
        برای دریافت برنامه سفرت شماره موبایلت رو وارد کن
      </h2>

      <label className="text-base text-gray-600 font-myIranSansRegular mb-2 mt-[57px]">
        لطفا شماره موبایل خود را وارد کنید
      </label>

      <input
        type="tel"
        placeholder="09126496755"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className={`border rounded-md px-4 py-2 w-[280px] md:w-[477px] text-right font-myIranSansFaNumRegular text-gray-800 focus:outline-none ${error ? 'border-red-500' : 'focus:ring-2 focus:ring-[#648A33]'
          }`}
      />

      {error && (
        <span className="text-red-500 text-sm font-myIranSansRegular mt-2">{error}</span>
      )}
      <CustomButton
        text="تایید"
        handleOnClick={handleSubmit}
        className="border text-black font-myIranSansRegular text-[12px] w-[180px] h-[44px] mt-[32px] bg-[#648A33] justify-center text-white"
      />
    </div>
  );
};

export default GetPlan;
