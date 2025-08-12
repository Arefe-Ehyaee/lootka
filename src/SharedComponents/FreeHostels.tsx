import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import NoImg from '../assets/images/no-image-icon-23485.png';
import food from "../assets/icons/cutlery_308556.png";
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import starGreen from "../assets/icons/StarGreen.svg";
import heart from "../assets/icons/heart-rounded.svg";

const BASE_URL = "http://82.115.25.241:4000";

interface Hostel {
  id: string;
  name: string;
  Rate: number;
  ImgName: string;
  Category?: string;
  OurDescription: string;
  UsersDescription?: string;
  rating?: number;
  reviews?: number;
  order: number;
  address?: string;
  opening_hours: OpeningHours;
  phone?: string;
  website?: string;
  instagram?: string;
  image_names?: string[];
  Menu?: any[];
  food_types?: string[];
  subCategory?: string[];
  mealTime?: string[];
  Cuisine?: string;
  price_range?: string;
  latitude?: number;
  longitude?: number;
  map_url: string;
  review_summary: string;
  description: string;
}

interface OpeningHours {
  monday?: string | null;
  tuesday?: string | null;
  wednesday?: string | null;
  thursday?: string | null;
  friday?: string | null;
  saturday?: string | null;
  sunday?: string | null;
  all_day: string | null;
}

// Interface for the backend response
interface BackendResponse {
  data: {
    place_id: string;
    name: string;
    OurDescription: string;
    UsersDescription?: string;
    rating?: number;
    reviews?: number;
    address?: string;
    opening_hours: OpeningHours;
    phone?: string;
    website?: string;
    instagram?: string;
    order: number;
    image_names?: string[];
    Menu?: any[];
    food_types?: string[];
    subCategory?: string[];
    mealTime?: string[];
    Cuisine?: string;
    price_range?: string;
    latitude?: number;
    longitude?: number;
    map_url: string;
    review_summary: string;
    description: string;
  }[];
  total_items: number;
  total_pages: number;
}

type CategoryType = 'همه' | 'فست فود' | 'غذای محلی' | 'کافه' | 'فود تراک';

// New component for the restaurant card with image carousel
const HostelCard: React.FC<{
  hostel: Hostel;
  getImageUrl: (img: string) => string;
}> = ({ hostel, getImageUrl }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    hostel.image_names && hostel.image_names.length > 1 ? 0 : 0
  );

  const imageCount = (hostel.image_names?.length || 0) > 0 ? hostel.image_names?.length || 1 : 1;

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
    if (!hostel.image_names || hostel.image_names.length === 0) {
      return getImageUrl('NaN');
    }
    return getImageUrl(hostel.image_names[currentImageIndex]);
  };

  return (
    <Link to={`/hostel/${hostel.id}`} className="flex-shrink-0 w-64 sm:w-72 md:w-80 group">
      <div className="overflow-hidden relative">
        {/* Image and carousel controls */}
        <div className="relative rounded-lg ">
          {/* <img
            src={getCurrentImage()}
            alt={hostel.name}
            className="w-full h-48 sm:h-52 md:h-[250px] object-cover rounded-lg rounded-b-none transition-opacity duration-300 group-hover:brightness-75"
          />
          <img src={heart} alt="" className='text-white absolute top-3 right-1 transform -translate-x-1/2' /> */}
          {/* Dot indicators */}
          {imageCount > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
              {Array.from({ length: imageCount }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${currentImageIndex === index
                    ? 'bg-white'
                    : 'bg-white/40 hover:bg-white/70'
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  role="button"
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}



          {/* Navigation arrows - only show if there are multiple images */}
          {imageCount > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 right-2 -translate-y-1/2 z-20  hover:bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 left-2 -translate-y-1/2 z-20  hover:bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Mobile card info */}
        <div className="md:hidden py-2 px-3 text-black rounded-lg rounded border rounded-lg h-[150px]">
          <div className='flex flex-row justify-between items-center'>
            <h3 className="text-sm sm:text-base font-myIranSansMedium group-hover:underline transition duration-300 line-clamp-1">
              {hostel.name}
            </h3>
            <div className='bg-[#EDF9F3] border border-green-100 text-[#1BA75E] rounded-lg text-sm font-myIranSansFaNumRegular flex flex-row items-center gap-1 px-1'>
              {hostel.Rate}
              <img src={starGreen} alt="" className='w-3 h-3' />
            </div>
          </div>


          {hostel.address && (
            <div className="flex items-start mb-2 text-xs">
              <MapPinIcon className="h-3 w-3 ml-1 mt-0.5" />
              <span className="line-clamp-1 font-myIranSansFaNumRegular">{hostel.address}</span>
            </div>
          )}

          <div className="text-[8px] font-myIranSansMedium pb-1">
            <p className="text-justify line-clamp-3">
              <p className='font-myIranSansFaNumBold text-[10px] mb-0.5'>توضیحات</p>
              <p className='font-myIranSansMedium'>{hostel.description}</p>
            </p>
          </div>
        </div>

        {/* Desktop card info */}
        <div className="hidden md:block py-2 px-2 text-black rounded-lg h-[170px] border">
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-[18px] font-myIranSansMedium group-hover:underline transition duration-300 line-clamp-1">
              {hostel.name}
            </h3>
            <div className="bg-[#EDF9F3] border border-green-100 text-[#1BA75E] rounded-lg text-base font-myIranSansFaNumRegular flex flex-row items-center gap-2 px-1">
              {hostel.Rate}
              <img src={starGreen} alt="" className="w-4 h-4" />
            </div>
          </div>

          {hostel.address && (
            <div className="flex flex-row items-center mt-5 mb-3 text-sm font-myIranSansFaNumRegular">
              <MapPinIcon className="h-4 w-4 ml-1 flex-shrink-0" />
              <span className="line-clamp-1 flex-1">{hostel.address}</span>
            </div>
          )}

          <div className="text-[10px] pb-2 flex flex-row items-end justify-between font-myIranSansFaNumRegular">
            <p className="text-justify line-clamp-4">
              <p className='font-myIranSansFaNumBold text-xs mb-1'>توضیحات</p>
              <ReactMarkdown>{hostel.description}</ReactMarkdown>
            </p>
            <button><ChevronLeftIcon className="h-5 w-5" /></button>
          </div>
        </div>

      </div>
    </Link>
  );
};

const FreeHostels: React.FC = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [filteredHostels, setFilteredHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('همه');

  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  const categories: CategoryType[] = ['همه', 'فست فود', 'غذای محلی', 'کافه', 'فود تراک'];

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/get_hostel`);
        const data: BackendResponse = await res.json();

        if (!Array.isArray(data.data)) {
          throw new Error('Unexpected response format');
        }

        const formattedHostels: Hostel[] = data.data.map((item) => {
          const randomCategory = categories[Math.floor(Math.random() * (categories.length - 1)) + 1];

          return {
            id: item.place_id,
            name: item.name,
            Rate: item.rating || 0,
            ImgName: item.image_names?.[0] || 'NaN',
            Category: item.food_types?.[0] || randomCategory,
            OurDescription: item.OurDescription,
            UsersDescription: item.UsersDescription,
            rating: item.rating,
            reviews: item.reviews,
            address: item.address,
            opening_hours: item.opening_hours,
            phone: item.phone,
            website: item.website,
            instagram: item.instagram,
            image_names: item.image_names,
            Menu: item.Menu,
            food_types: item.food_types,
            subCategory: item.subCategory,
            mealTime: item.mealTime,
            Cuisine: item.Cuisine,
            price_range: item.price_range,
            latitude: item.latitude,
            longitude: item.longitude,
            map_url: item.map_url,
            order: item.order,
            review_summary: item.review_summary,
            description: item.description,
          };
        });

        /* ------------------------------------------------------------------
         * ONLY KEEP HOSTELS WITH order > 400
         * ------------------------------------------------------------------*/
        const orderFiltered = formattedHostels.filter(h => h.order > 400);

        setHostels(orderFiltered);
        setFilteredHostels(orderFiltered);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'مشکلی پیش آمده');
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  useEffect(() => {
    const filtered =
      selectedCategory === 'همه'
        ? hostels
        : hostels.filter(r => r.Category === selectedCategory);
    setFilteredHostels(filtered);

    // Reset scroll position when changing categories
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollLeft = 0;
    }
    if (desktopScrollRef.current) {
      desktopScrollRef.current.scrollLeft = 0;
    }
  }, [selectedCategory, hostels]);

  const getImageUrl = (img: string) =>
    !img || img === 'NaN' ? NoImg : `${BASE_URL}/download-image/${img}`;

  // Mobile scroll functions - FIXED
  const scrollMobileNext = () => {
    // For right-to-left layout, to see next cards (to the left), we need negative value
    mobileScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollMobilePrev = () => {
    // For right-to-left layout, to see previous cards (to the right), we need positive value
    mobileScrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  // Desktop scroll functions - FIXED
  const scrollDesktopNext = () => {
    // For right-to-left layout, to see next cards (to the left), we need negative value
    desktopScrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' });
  };

  const scrollDesktopPrev = () => {
    // For right-to-left layout, to see previous cards (to the right), we need positive value
    desktopScrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="text-center py-20">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="py-12 px-6">
      <div className="flex justify-between items-center flex-row items-center mb-6 desktop:px-11 px-4">
        <span className="flex flex-row items-center gap-1">
          {/* <img src={food} className="w-7 h-7" alt="icon" /> */}
          <h2 className="desktop:text-3xl tablet:text-2xl text-base font-myIranSansMedium">اقامتگاه رایگان</h2>
        </span>
        <Link
          to="/hostels"
          className="flex items-center text-sm gap-1 text-gray-800 font-myIranSansRegular hover:underline"
        >
          مشاهده همه
        </Link>
      </div>

      {/* Mobile View - Outside Navigation Buttons */}
      <div className="relative md:hidden">
        <div className="px-8 relative"> {/* Added padding container */}
          <button
            onClick={scrollMobilePrev}
            className="absolute left-0 top-[130px] transform -translate-y-1/2 z-10  hover:bg-gray-100  w-8 h-8 flex items-center justify-center transition-all duration-200"
            aria-label="Previous"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <button
            onClick={scrollMobileNext}
            className="absolute right-0 top-[130px] transform -translate-y-1/2 z-10  hover:bg-gray-100  w-8 h-8 flex items-center justify-center transition-all duration-200"
            aria-label="Next"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          <div
            ref={mobileScrollRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide space-x-4 rtl:space-x-reverse scroll-smooth px-2" /* Added side padding */
          >
            {filteredHostels.map(hostel => (
              <HostelCard
                key={hostel.id}
                hostel={hostel}
                getImageUrl={getImageUrl}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View - Outside Navigation Buttons */}
      <div className="hidden md:block relative">
        <div className="px-14 relative"> {/* Added padding container */}
          <button
            onClick={scrollDesktopPrev}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 border-gray-200 text-black"
            aria-label="Previous"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          <button
            onClick={scrollDesktopNext}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 border-gray-200 text-black"
            aria-label="Next"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          <div
            ref={desktopScrollRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide space-x-6 rtl:space-x-reverse scroll-smooth px-4" /* Added side padding */
          >
            {filteredHostels.map(hostel => (
              <HostelCard
                key={hostel.id}
                hostel={hostel}
                getImageUrl={getImageUrl}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scrollbar Hide Styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default FreeHostels;
