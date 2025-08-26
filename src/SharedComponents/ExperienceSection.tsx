import g4 from "../assets/images/aerial-shot-village-houses-beautiful-grass-covered-fields.jpg";
import g2 from "../assets/images/rasht-great-bazaar.jpg";
import g3 from "../assets/images/20180615-205636-largejpg.jpg";
import g1 from "../assets/images/Shahrdari.jpg";
import g5 from "../assets/images/Sights_Rasht_ParkeShahr_1.webp.jpg";
import g6 from "../assets/images/photo_2025-05-18_17-27-08.jpg";
import g7 from "../assets/images/30669.jpg";
import wave from "../assets/icons/wave.svg"
import cir from "../assets/icons/cir.svg"
import loc from "../assets/icons/loc-fncy.svg"

const ExperiencesSection = () => {
  const images = [g1, g4, g3, g2, g5, g6, g7, g7];

  return (
    <div className="relative desktop:mx-32 desktop:p-8 p-2 py-4 desktop:border border-[#CFD6DC] border-y desktop:rounded-3xl overflow-hidden desktop:h-[400px] tablet:h-[300px] h-[140px]">

      {/* Central content */}
      <div className="relative z-10 text-center">
        <h2 className="text-[12px] tablet:text-[32px] desktop:text-[40px] font-bold text-gray-800 desktop:mb-6 mb-2 tablet:mt-6" dir="rtl">
          تجربه‌های خودتو به لوتکا اضافه کن
        </h2>
        {/* <h3 className="text-[12px] desktop:text-[40px] font-bold text-gray-800 desktop:mb-6 mb-2" dir="rtl">
          اضافه کن
        </h3> */}
        <p className="text-[10px] tablet:text-[20px] desktop:text-[24px] text-gray-600 desktop:mb-2 mb-1 max-w-md mx-auto" dir="rtl">
          جایی که رفتی رو دوستش داشتی؟
        </p>
        <p className="text-[10px] tablet:text-[20px] desktop:text-[24px] text-gray-600 desktop:mb-8 mb-4 max-w-md mx-auto" dir="rtl">
          به بقیه هم پیشنهاد بده!
        </p>

        <button
          className="flex items-center justify-center bg-[#647B3B] desktop:px-[16px] px-0 desktop:py-4 py-2 rounded-[8px] desktop:w-[148px] tablet:w-[120px] w-[84px] h-[24px] text-white desktop:text-base tablet:text-base text-[10px] mx-auto"
        >
          ادامه
        </button>

      </div>

      {/* Floating circular images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* gym */}
        <div className="absolute desktop:top-10 tablet:top-10 top-12 desktop:right-40 right-20 w-8 h-8 md:w-14 md:h-14 lg:w-20 lg:h-20 rounded-full overflow-hidden shadow-lg">
          <img src={images[0]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* vintage */}
        <div className="absolute desktop:top-40 desktop:left-40 bottom-24 right-10 w-8 h-8 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-md">
          <img src={images[1]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* pool */}
        <div className="absolute desktop:top-10 top-12 tablet:top-10 desktop:left-40 left-20 w-8 h-8 md:w-14 md:h-14 lg:w-20 lg:h-20 rounded-full overflow-hidden shadow-lg">
          <img src={images[2]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* vintage pool */}
        <div className="absolute desktop:top-40 desktop:left-20 bottom-24 left-10 w-8 h-8 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-md">
          <img src={images[3]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Bottom right */}
        <div className="absolute desktop:bottom-12 bottom-4 right-1/4 w-8 h-8 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-md transform rotate-15">
          <img src={images[4]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Bottom left */}
        <div className="absolute desktop:bottom-12 bottom-4 left-1/4 w-8 h-8 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-md transform rotate-15">
          <img src={images[5]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Bottom center */}
        <div className="desktop:absolute hidden bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-md rotate-3">
          <img src={images[7]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Decorative icons */}
        {/* <div className="absolute desktop:bottom-20 bottom-2 desktop:left-20 left-2 transform -translate-x-1/2">
          <img src={wave} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="absolute desktop:bottom-20 bottom-2 desktop:right-10 right-0">
          <img src={wave} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="absolute top-24 left-64 transform -translate-x-1/2">
          <img src={cir} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="absolute top-24 right-60 transform -translate-x-1/2 rotate-180">
          <img src={cir} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="absolute top-48 left-3/4 transform -translate-x-1/2">
          <img src={loc} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="absolute top-48 right-3/4 transform -translate-x-1/2">
          <img src={loc} alt="" className="w-full h-full object-cover" />
        </div> */}
      </div>

      {/* Decorative dots */}
      {/* <div className="absolute bottom-12 left-1/3 w-3 h-3 bg-blue-400 rounded-full opacity-40"></div>
      <div className="absolute bottom-24 left-1/2 w-3 h-3 border rounded-full opacity-80"></div>
      <div className="absolute bottom-60 left-3/4 w-3 h-3 border rounded-full opacity-80"></div>
      <div className="absolute bottom-20 left-1/4 w-3 h-3 border rounded-full opacity-80"></div>
      <div className="absolute top-24 left-1/3 w-3 h-3 border rounded-full opacity-80"></div>
      <div className="absolute top-42 right-3/4 w-3 h-3 border rounded-full opacity-80"></div>
      <div className="absolute top-24 right-1/3 w-3 h-3 border rounded-full opacity-80"></div>

      <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-yellow-400 rounded-full opacity-70"></div> */}
    </div>
  );
};

export default ExperiencesSection;
