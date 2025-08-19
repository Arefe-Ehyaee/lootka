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
  // Sample image URLs - replace with your actual images
  const images = [
    g1, g4, g3, g2, g5, g6, g7, g7
  ];

  return (
    <div className="relative mx-6 desktop:mx-32 p-8 border border-[#CFD6DC] rounded-3xl overflow-hidden h-[400px]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 300">
          <path d="M50,150 Q200,50 350,150 Q200,250 50,150" fill="none" stroke="#e5e7eb" strokeWidth="2" />
          <path d="M100,100 Q200,200 300,100" fill="none" stroke="#e5e7eb" strokeWidth="1" />
        </svg>
      </div>

      {/* Central content */}
      <div className="relative z-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2" dir="rtl">
          تجربه‌های خودتو به لوتکا
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6" dir="rtl">
          اضافه کن
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto" dir="rtl">
          جایی که رفتی و دوستش داشتی؟ به بقیه هم پیشنهاد بده!
        </p>


        <button
          className="bg-[#647B3B] desktop:px-[16px] px-0 desktop:py-[4px] py-0 rounded-[8px] desktop:w-[168px] w-[84px] desktop:h-[48px] h-[24px] text-white desktop:text-base text-[10px]"

        >
          ادامه
        </button>
      </div>

      {/* Floating circular images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* gym */}
        <div className="absolute desktop:top-10 top-40 desktop:right-40 right-10 w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden shadow-lg transform">
          <img src={images[0]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* vintage */}
        <div className="absolute desktop:top-40 desktop:left-40 bottom-24 right-10 w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-md transform">
          <img src={images[1]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* pool */}
        <div className="absolute desktop:top-10 top-40 desktop:left-40 left-10 w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden shadow-lg transform">
          <img src={images[2]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* vintage poool */}
        <div className="absolute desktop:top-40 desktop:left-20 bottom-24 left-10 w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-md">
          <img src={images[3]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Bottom right */}
        <div className="absolute bottom-12 right-1/4 w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-md transform rotate-15">
          <img src={images[4]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Bottom left */}
        <div className="absolute bottom-12 left-1/4 w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-md transform rotate-15">
          <img src={images[5]} alt="" className="w-full h-full object-cover" />
        </div>



        {/* Bottom center */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full overflow-hidden shadow-md rotate-3">
          <img src={images[7]} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="absolute bottom-20 left-20 transform -translate-x-1/2  ">
          <img src={wave} alt="" className="w-full h-full object-cover" />
        </div>


        <div className="absolute bottom-20 right-10 transform -translate-x-1/2  ">
          <img src={wave} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="absolute top-24 left-64 transform -translate-x-1/2  ">
          <img src={cir} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="absolute top-24 right-60 transform -translate-x-1/2 rotate-180 ">
          <img src={cir} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="absolute top-48 left-3/4 transform -translate-x-1/2 ">
          <img src={loc} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="absolute top-48 right-3/4 transform -translate-x-1/2 ">
          <img src={loc} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-8 right-1/3 w-2 h-2 bg-green-400 rounded-full opacity-60"></div>
      <div className="absolute bottom-12 left-1/3 w-3 h-3 bg-blue-400 rounded-full opacity-40"></div>
      <div className="absolute bottom-24 left-1/2 w-3 h-3 border rounded-full opacity-80"></div>
      <div className="absolute bottom-60 left-3/4 w-3 h-3 border rounded-full opacity-80"></div>
      <div className="absolute bottom-20 left-1/4 w-3 h-3 border rounded-full opacity-80"></div>
      <div className="absolute top-24 left-1/3 w-3 h-3 border rounded-full opacity-80"></div>
      <div className="absolute top-42 right-3/4 w-3 h-3 border rounded-full opacity-80"></div>
      <div className="absolute top-24 right-1/3 w-3 h-3 border rounded-full opacity-80"></div>

      <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-yellow-400 rounded-full opacity-70"></div>
    </div>
  );
};

export default ExperiencesSection;