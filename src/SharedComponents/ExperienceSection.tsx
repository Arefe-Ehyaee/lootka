import g4 from "../assets/images/aerial-shot-village-houses-beautiful-grass-covered-fields.jpg";
import g2 from "../assets/images/rasht-great-bazaar.jpg";
import g3 from "../assets/images/20180615-205636-largejpg.jpg";
import g1 from "../assets/images/Shahrdari.jpg";
import g5 from "../assets/images/Sights_Rasht_ParkeShahr_1.webp.jpg";
import g6 from "../assets/images/photo_2025-05-18_17-27-08.jpg";
import g7 from "../assets/images/30669.jpg";

const ExperiencesSection = () => {
  const images = [
    { src: g1, name: "میدان شهرداری" },
    { src: g4, name: "جنگل لاتون" },
    { src: g3, name: "میدان شهرداری" },
    { src: g2, name: "بازار بزرگ رشت" },
    { src: g5, name: "پارک شهر" },
    { src: g6, name: "طبیعت گیلان" },
    { src: g7, name: "ساحل خزر" },
  ];

  return (
    <div className="relative desktop:mx-32 mb-6 overflow-hidden desktop:h-[400px] tablet:h-[320px] h-[620px]">

      {/* متن بالا */}
      <div className="relative z-10 text-center mt-60 tablet:mt-0 desktop:mt-0">
        <h2
          className="text-xl tablet:text-[32px] desktop:text-[40px] font-myYekanDemibold text-gray-800 desktop:mb-8 mb-2 tablet:mb-6 tablet:mt-6"
          dir="rtl"
        >
          تجربه‌های خودتو به لوتکا اضافه کن
        </h2>
        <p
          className="text-base tablet:text-[20px] desktop:text-[24px] font-myYekanRegular text-gray-600 desktop:mb-2 mb-1 max-w-md mx-auto"
          dir="rtl"
        >
          جایی که رفتی رو دوستش داشتی؟
        </p>
        <p
          className="text-base tablet:text-[20px] desktop:text-[24px] font-myYekanRegular text-gray-600 desktop:mb-8 mb-4 max-w-md mx-auto"
          dir="rtl"
        >
          به بقیه هم پیشنهاد بده!
        </p>

        <button className="flex items-center justify-center bg-white border border-[#647B3B] hover:bg-[#647B3B]/5 font-myYekanDemibold desktop:px-[16px] px-0 desktop:py-4 py-2 rounded-full desktop:w-[118px] tablet:w-[120px] w-[84px] h-[32px] text-[#647B3B] desktop:text-[18px] tablet:text-base text-[14px] mx-auto">
          ادامه
        </button>
      </div>

      {/* عکس‌های شناور */}
      <div className="absolute inset-0 pointer-events-none">

        {/* میدان */}
        <div className="float3 absolute desktop:top-6 tablet:top-[10%] top-[20%] desktop:right-40 tablet:right-[12%] right-[10%] flex flex-col items-center w-24">
          <div className="w-20 h-20 md:w-14 md:h-14 lg:w-24 lg:h-24 rounded-full overflow-hidden">
            <img src={images[0].src} alt={images[0].name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs mt-1 text-gray-700 bg-white/70 px-2 rounded-md">{images[0].name}</p>
        </div>

        {/* سبز */}
        <div className="float3 absolute desktop:top-40 desktop:left-40 bottom-[24%] right-10 flex flex-col items-center w-24">
          <div className="w-20 h-20 md:w-14 md:h-14 lg:w-24 lg:h-24 rounded-full overflow-hidden">
            <img src={images[1].src} alt={images[1].name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs mt-1 text-gray-700 bg-white/70 px-2 rounded-md">{images[1].name}</p>
        </div>

        {/* میرزا */}
        <div className="float3 absolute desktop:top-6 top-[20%] tablet:top-[10%] desktop:left-40 tablet:left-[12%] left-[10%] flex flex-col items-center w-24">
          <div className="w-20 h-20 md:w-14 md:h-14 lg:w-24 lg:h-24 rounded-full overflow-hidden">
            <img src={images[2].src} alt={images[2].name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs mt-1 text-gray-700 bg-white/70 px-2 rounded-md">{images[2].name}</p>
        </div>

        {/* میوه */}
        <div className="float3 absolute desktop:top-40 desktop:left-20 bottom-[24%] left-10 flex flex-col items-center w-24">
          <div className="w-20 h-20 md:w-14 md:h-14 lg:w-24 lg:h-24 rounded-full overflow-hidden">
            <img src={images[3].src} alt={images[3].name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs mt-1 text-gray-700 bg-white/70 px-2 rounded-md">{images[3].name}</p>
        </div>

        {/* پارک */}
        <div className="float3 absolute desktop:top-[60%] tablet:top-[60%] bottom-[2%] desktop:right-[30%] tablet:right-[24%] right-[40%] flex flex-col items-center w-24">
          <div className="w-20 h-20 md:w-14 md:h-14 lg:w-24 lg:h-24 rounded-full overflow-hidden transform rotate-15">
            <img src={images[4].src} alt={images[4].name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs mt-1 text-gray-700 bg-white/70 px-2 rounded-md">{images[4].name}</p>
        </div>

        {/* کوه */}
        <div className="float3 absolute desktop:top-[60%] tablet:top-[60%] top-[2%] desktop:left-[30%] tablet:left-[24%] left-[40%] flex flex-col items-center w-24">
          <div className="w-20 h-20 md:w-14 md:h-14 lg:w-24 lg:h-24 rounded-full overflow-hidden transform rotate-15">
            <img src={images[5].src} alt={images[5].name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs mt-1 text-gray-700 bg-white/70 px-2 rounded-md">{images[5].name}</p>
        </div>

        {/* 7 (فقط دسکتاپ) */}
        <div className="desktop:absolute hidden bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center w-20">
          <div className="w-8 h-8 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden rotate-3">
            <img src={images[6].src} alt={images[6].name} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs mt-1 text-gray-700 bg-white/70 px-2 rounded-md">{images[6].name}</p>
        </div>

      </div>
    </div>
  );
};

export default ExperiencesSection;
