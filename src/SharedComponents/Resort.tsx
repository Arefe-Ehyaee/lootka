import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import NoImg from '../assets/images/no-image-icon-23485.png';
import starGreen from '../assets/icons/StarGreen.svg';
import heart from '../assets/icons/heart-rounded.svg';
import orci3 from '../assets/images/Hotel_Rasht_orci_1.jpg';
import orci2 from '../assets/images/Hotel_Rasht_orci_2.jpg';
import orci1 from '../assets/images/Hotel_Rasht_orci_4.jpg';
import orci4 from '../assets/images/Hotel_Rasht_orci_5.jpg';
import orci5 from '../assets/images/Hotel_Rasht_orci_3.jpg';
import building from "../assets/icons/resort_701348.png";
import donse1 from "../assets/images/Hotel_Rasht_donse_1.png";
import donse2 from "../assets/images/Hotel_Rasht_donse_2.png";
import donse3 from "../assets/images/Hotel_Rasht_donse_3.png";
import donse4 from "../assets/images/Hotel_Rasht_donse_4.png";
import paradise1 from "../assets/images/Hotel_Rasht_paradise_1.png";
import paradise6 from "../assets/images/Hotel_Rasht_paradise_6.png";
import paradise5 from "../assets/images/Hotel_Rasht_paradise_5.png";
import mijaan1 from "../assets/images/Hotel_Rasht_mijanBoutique_1.png";
import mijaan2 from "../assets/images/Hotel_Rasht_mijanBoutique_2.png";
import mijaan3 from "../assets/images/Hotel_Rasht_mijanBoutique_3.png";


import ReactMarkdown from 'react-markdown';

interface Hotel {
  id: string;
  name: string;
  rating: number;
  image_names: string[];
  address?: string;
  opening_hours?: { all_day: string | null };
  description: string;
}

const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    hotel.image_names.length > 1 ? 1 : 0
  );
  const imageCount = hotel.image_names.length;

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imageCount);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };


  const getCurrentImage = () => {
    if (!hotel.image_names || hotel.image_names.length === 0) {
      return NoImg;
    }
    return hotel.image_names[currentImageIndex] || NoImg;
  };

  return (
    <div className="flex-shrink-0 w-64 sm:w-72 md:w-80 group">
      <div className="overflow-hidden relative">
        <div className="relative">
          <img
            src={getCurrentImage()}
            alt={hotel.name}
            className="w-full h-48 sm:h-52 md:h-[250px] object-cover rounded-lg rounded-b-none transition-opacity duration-300 group-hover:brightness-75"
          />
          <img
            src={heart}
            alt=""
            className="absolute top-3 right-1 transform -translate-x-1/2"
          />
          {imageCount > 1 && (
            <>
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                {Array.from({ length: imageCount }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full cursor-pointer ${currentImageIndex === index
                      ? 'bg-white'
                      : 'bg-white/40 hover:bg-white/70'
                      }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    role="button"
                  />
                ))}
              </div>
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 right-2 -translate-y-1/2"
                aria-label="Previous Image"
              >
                <ChevronRightIcon className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 left-2 -translate-y-1/2"
                aria-label="Next Image"
              >
                <ChevronLeftIcon className="h-5 w-5 text-white" />
              </button>

            </>
          )}
        </div>
        <div className="py-3 px-2 text-black border h-[150px] rounded-b-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-[18px] font-myIranSansMedium group-hover:underline transition duration-300 line-clamp-1">
              {hotel.name}
            </h3>
            <div className='bg-[#EDF9F3] border border-green-100 text-[#1BA75E] rounded-lg text-base font-myIranSansFaNumRegular flex flex-row items-center gap-2 px-1'>
              {hotel.rating}
              <img src={starGreen} alt="" className='w-4 h-4' />
            </div>
          </div>

          {hotel.address && (
            <div className="flex items-center mt-2 mb-2 text-sm font-myIranSansFaNumRegular">
              <MapPinIcon className="h-4 w-4 ml-1 shrink-0" />
              <span className="line-clamp-1 grow">{hotel.address}</span>
            </div>
          )}


          <div className="text-[10px] pb-2 flex flex-row items-end justify-between font-myIranSansFaNumRegular">
            <p className="text-justify line-clamp-3">
              <p className='font-myIranSansFaNumBold text-xs mb-1 mt-2'>توضیحات</p>
              <ReactMarkdown>{hotel.description}</ReactMarkdown>
            </p>
            <button><ChevronLeftIcon className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Resort: React.FC = () => {
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);
  const desktopScrollRef = useRef<HTMLDivElement | null>(null);

  const hotels: Hotel[] = [
    {
      id: '1',
      name: 'هتل دُنسه گیلاریا',
      rating: 4.4,
      image_names: [donse2, donse4, donse1, donse3],
      address: 'گیلان، کیاشهر، کیلومتر ۷ جاده کیاشهر چمخاله، روستای لب دریا',
      opening_hours: { all_day: '24 ساعته' },
      description: 'هتل دُنسه گیلاریا، اقامتگاهی مدرن و در عین حال هماهنگ با طبیعت در ساحل کیاشهر است که با الهام از سادگی، پاکی و آرامش طراحی شده است. این مجموعه با دارا بودن ۱۲ اتاق رو به دریا و ۵ اتاق با چشم‌انداز محوطه، امکانات رفاهی کاملی همچون سیستم گرمایش و سرمایش، روم سرویس، تراس و حیاط اختصاصی، تجربه‌ای دلنشین از اقامت در کنار دریای خزر را به مهمانان خود ارائه می‌دهد. دُنسه در منطقه‌ای آرام و بکر، تنها پنج دقیقه پیاده تا ساحل فاصله دارد و همین دسترسی آسان به طبیعت، یکی از امتیازهای ویژه آن است. در کنار اتاق‌های هتل، ۶ ویلای مستقل نیز برای اقامت‌های خانوادگی یا گروهی در نظر گرفته شده که با آشپزخانه مجهز، فضای خصوصی، و چشم‌انداز طبیعی، حس خانه را در دل شمال تداعی می‌کنند. همچنین رستوران و کافه‌ی هتل با منوی متنوع از غذاهای محلی و بین‌المللی، و صبحانه‌ای رایگان و دلپذیر، تکمیل‌کننده این تجربه آرام و باکیفیت هستند. دُنسه گیلاریا با انعطاف در نرخ‌گذاری برای روزهای هفته و تعطیلات، تلاش می‌کند تا اقامتی در دسترس و بی‌نقص را برای هر سلیقه‌ای فراهم کند.'
    },
    {
      id: '2',
      name: 'هاستل اورسی',
      rating: 4.2,
      image_names: [orci2, orci4, orci1, orci3, orci5],
      address: 'رشت، خیابان امام خمینی، میدان شهرداری، کوچه رضا مهربان، کوچه سینما سعدی',
      opening_hours: { all_day: '24 ساعته' },
      description: 'اقامتگاه ارُسی رشت در قلب بافت تاریخی شهر و نزدیکی میدان شهرداری، در خانه‌ای تاریخی از دوره قاجار واقع شده که با مرمت اصولی و حفظ معماری اصیل، به فضایی دل‌نشین برای اقامت تبدیل شده است. معماری بنا ترکیبی از دوره‌های قاجار و پهلوی است؛ ارسی بزرگ سالن بازمانده از قاجار و بخش‌های افزوده‌شده در پهلوی تنوعی چشمگیر به فضاها بخشیده‌اند. اتاق‌های اقامتی با نام‌هایی برگرفته از محله‌ها و مکان‌های دیدنی رشت مانند «اتاق شهرداری» یا «اتاق منظریه» و همچنین دورمیتوری‌های ۴ و ۱۰ تخته برای بانوان و آقایان فراهم شده‌اند. نزدیکی به جاذبه‌های شهری و امکان حضور در رویدادهایی چون کنسرت‌های محلی با رزرو قبلی، تجربه‌ای خاص، فرهنگی و پویا را برای مهمانان ارسی رقم می‌زند.'
    },
    {
      id: '3',
      name: 'اقامتگاه بوم گردی بهشت',
      rating: 4.8,
      image_names: [paradise1, paradise5, paradise6],
      address: 'گیلان، دهستان سراوان، ۲۰ کیلومتری شهر رشت، روستای موشنگاه، ابتدای خیابان شهید نجار، بعد از پل سمت چپ داخل بن بست',
      opening_hours: { all_day: '24 ساعته' },
      description: 'اقامتگاه بهشت، مجموعه‌ای گرم و صمیمی در دل طبیعت سرسبز گیلان است که با ترکیبی از معماری بومی و امکانات مدرن، تجربه‌ای بی‌نظیر از اقامت را برای مهمانان خود فراهم می‌کند. این مجموعه با دو خانه‌ی اصلی «خونه بهشت» و «خونه اردی بهشت» و همچنین کلبه‌های چوبی مستقل، محیطی امن و دلنشین برای آرامش، استراحت و فرار از هیاهوی زندگی شهری است. تمامی اتاق‌ها و سوئیت‌ها با دقت بالا در طراحی داخلی، تهویه مناسب، تجهیزات کامل و ایوان‌هایی رو به طبیعت ساخته شده‌اند تا میهمانان در کنار آسایش، از منظره‌ و عطر جنگل‌ لذت ببرند. هر اتاق با نامی برگرفته از طبیعت یا فرهنگ بومی گیلان، داستان خاص خود را دارد؛ از اتاق دُرفَک با چشم‌انداز کوهستانی گرفته تا کلبه بلوط با ایوانی دلباز رو به جنگل و امکانات ویژه‌ای مانند جکوزی، هرکدام برای سلیقه‌ای خاص طراحی شده‌اند. این اقامتگاه با خدماتی همچون صبحانه محلی، مینی‌بار، سیستم‌های سرمایش و گرمایش مدرن، و مهم‌تر از همه، میزبانی گرم و حرفه‌ای، مکانی مناسب برای سفرهای دونفره، خانوادگی یا رویدادهای خاص مثل سالگرد و ماه‌عسل است.'

    },
    {
      id: '4',
      name: 'بوتیک هتل می جان جان',
      rating: 4.8,
      image_names: [mijaan2, mijaan1, mijaan3],
      address: 'رشت، بازار بزرگ رشت',
      opening_hours: { all_day: '24 ساعته' },
      description: 'بوتیک هتل می‌جان، اقامتگاهی منحصر‌به‌فرد در قلب رشت و یکی از کهن‌ترین محله‌های این شهر، در خانه‌ای قجری با قدمت بیش از ۲۰۰ سال واقع شده است. این هتل که در محله‌ای با پیشینه‌ای از دوران صفویه قرار دارد، با مرمتی دقیق به فضایی برای تجربه زندگی سنتی با حال و هوای تاریخی بدل شده است. موقعیت مکانی می‌جان امکان دسترسی پیاده به محله‌های تاریخی نظیر ساغری‌سازان، خواهر امام و خانه میرزا کوچک‌خان را در کمتر از ۲۰ دقیقه فراهم می‌کند. اتاق‌های هتل با نام درختان بومی ایران مانند انجیلی، لیلکی، ممرز، ملج، مازو و ون، هرکدام روایتی از طبیعت و فرهنگ شمال ایران دارند. طراحی خاص، فضاهای بازسازی‌شده مانند مدیا روم، صبحانه‌های محلی، حیاطی زنده و دیوارهایی آکنده از خاطره، اقامت در می‌جان را به تجربه‌ای عمیق از زیستن در دل تاریخ تبدیل کرده‌اند؛ جایی برای مزه کردن لحظه‌ها و تنفس در فضای ناب رشتی.'
    },
  ];

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: 'left' | 'right',
    amount: number
  ) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="py-12 px-6">
      <div className="flex justify-between items-center flex-row items-center mb-6 desktop:px-11 px-4">
        <span className="flex flex-row items-center gap-1">
          <img src={building} className="w-7 h-7" alt="icon" />
          <h2 className="desktop:text-3xl tablet:text-2xl text-base font-myIranSansMedium">موندنی</h2>
        </span>
        <Link to="/hotels" className="flex items-center text-sm gap-1 text-gray-800 font-myIranSansRegular hover:underline"
        >
          مشاهده همه
        </Link>
      </div>

      {/* Mobile */}
      <div className="relative md:hidden">
        <button
          onClick={() => scroll(mobileScrollRef, 'left', 240)}
          className="absolute left-0 top-[130px] z-10 "
          aria-label="Scroll Left"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll(mobileScrollRef, 'right', 240)}
          className="absolute right-0 top-[130px] z-10"
          aria-label="Scroll Right"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
        <div
          ref={mobileScrollRef}
          className="flex overflow-x-auto pb-6 scrollbar-hide space-x-4 rtl:space-x-reverse pr-4 pl-4"
        >
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block relative">
        <div className="px-14 relative"> {/* Added padding container */}
          <button
            onClick={() => scroll(desktopScrollRef, 'left', 600)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 border-gray-200 text-black"
            aria-label="Previous"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => scroll(desktopScrollRef, 'right', 600)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 border-gray-200 text-black"
            aria-label="Next"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div
            ref={desktopScrollRef}
            className="flex overflow-x-auto pb-8 space-x-6 rtl:space-x-reverse pr-8 pl-8 scrollbar-hide"
          >
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Resort;
