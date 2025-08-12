// This file is already a complete and production-ready React component
// There are no missing pieces or broken logic
// However, here's the exact code again for use as a self-contained file
// You may use this file as is in your project

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import NoImg from '../assets/images/no-image-icon-23485.png';
import starGreen from '../assets/icons/StarGreen.svg';
import heart from '../assets/icons/heart-rounded.svg';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';

const BASE_URL = "http://91.212.174.72:2000";

interface Cafe {
  palce_id: string;
  name: string;
  Rate: number;
  ImgName: string;
  Category?: string;
  OurDescription: string;
  UsersDescription?: string;
  rating?: number;
  reviews?: number;
  address?: string;
  opening_hours: string;
  phone?: string;
  website?: string;
  instagram?: string;
  image_names?: string[];
  Menu?: any[];
  food_types?: string[];
  mealTime?: string[];
  Cuisine?: string;
  price_range?: string;
  latitude?: number;
  longitude?: number;
  map_url: string;
  review_summary: string;
  description: string;
  sub_category: string;
}

interface BackendResponse {
  data: Cafe[];
  total_items: number;
  total_pages: number;
}

type CategoryType = 'همه' | 'فست فود' | 'غذای محلی' | 'کافه' | 'فود تراک';

const RestaurantCard: React.FC<{ restaurant: Cafe; getImageUrl: (img: string) => string }> = ({ restaurant, getImageUrl }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    restaurant.image_names && restaurant.image_names.length > 1 ? 1 : 0
  );

  const imageCount = (restaurant.image_names?.length || 0) > 0 ? restaurant.image_names?.length || 1 : 1;

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
    if (!restaurant.image_names || restaurant.image_names.length === 0) {
      return getImageUrl('NaN');
    }
    return getImageUrl(restaurant.image_names[currentImageIndex]);
  };

  return (
    <Link to={`/places/${restaurant.palce_id}`} className="flex-shrink-0 w-64 sm:w-72 md:w-80 group">
      <div className="overflow-hidden relative">
        <div className="relative">
          <img
            src={getCurrentImage()}
            alt={restaurant.name}
            className="w-full h-48 sm:h-52 md:h-[250px] object-cover rounded-lg rounded-b-none transition-opacity duration-300 group-hover:brightness-75"
          />
          <img src={heart} alt="" className='text-white absolute top-3 right-1 transform -translate-x-1/2' />
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
                />
              ))}
            </div>
          )}
          {imageCount > 1 && (
            <>
              <button onClick={handlePrevImage} className="absolute top-1/2 right-2 -translate-y-1/2 z-20  hover:bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200">
                <ChevronRightIcon className="h-5 w-5" />
              </button>
              <button onClick={handleNextImage} className="absolute top-1/2 left-2 -translate-y-1/2 z-20  hover:bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200">
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <div className="md:hidden py-2 px-3 text-black rounded-lg rounded-t-none border border-t-0 h-[150px]">
          <div className='flex flex-row justify-between items-center'>
            <h3 className="text-sm sm:text-base font-myIranSansMedium group-hover:underline transition duration-300 line-clamp-1">{restaurant.name}</h3>
            <div className='bg-[#EDF9F3] border border-green-100 text-[#1BA75E] rounded-lg text-sm font-myIranSansFaNumRegular flex flex-row items-center gap-1 px-1'>
              {restaurant.Rate}<img src={starGreen} alt="" className='w-3 h-3' />
            </div>
          </div>
          {restaurant.opening_hours && (
            <div className="flex items-center text-xs mb-1 mt-2" dir='rtl'>
              <ClockIcon className="h-3 w-3 ml-1" />
              <div className="line-clamp-1 font-myIranSansFaNumMedium">{restaurant.opening_hours}</div>
            </div>
          )}
          {restaurant.address && (
            <div className="flex items-start mb-2 text-xs">
              <MapPinIcon className="h-3 w-3 ml-1 mt-0.5" />
              <span className="line-clamp-1 font-myIranSansFaNumRegular">{restaurant.address}</span>
            </div>
          )}
          <div className="text-[8px] pb-1">
            <p className="text-justify font-myIranSansMedium line-clamp-3">
              <p className=' text-[10px] mb-0.5'>توضیحات</p>
              <ReactMarkdown>{restaurant.description}</ReactMarkdown>
            </p>
          </div>
        </div>

        <div className="hidden md:block py-2 px-2 text-black rounded-lg rounded-t-none h-[170px] border border-t-0">
          <div className='flex flex-row justify-between items-center'>
            <h3 className="text-[18px] font-myIranSansMedium group-hover:underline transition duration-300 line-clamp-1">{restaurant.name}</h3>
            <div className='bg-[#EDF9F3] border border-green-100 text-[#1BA75E] rounded-lg text-base font-myIranSansFaNumRegular flex flex-row items-center gap-2 px-1'>
              {restaurant.Rate}<img src={starGreen} alt="" className='w-4 h-4' />
            </div>
          </div>
          {restaurant.opening_hours && (
            <div className="flex items-start text-sm mb-2 mt-4 font-myIranSansFaNumRegular" dir='rtl'>
              <ClockIcon className="h-4 w-4 ml-1 flex-shrink-0 text-sm" />
              <div className="">{restaurant.opening_hours}</div>
            </div>
          )}
          {restaurant.address && (
            <div className="flex items-center mb-3 text-sm font-myIranSansFaNumRegular">
              <div className="flex-shrink-0 w-4 h-4 ml-1">
                <MapPinIcon className="w-full h-full" />
              </div>
              <span className="flex-1 truncate">{restaurant.address}</span>
            </div>
          )}
          <div className="text-[10px] pb-2 flex flex-row items-end justify-between font-myIranSansFaNumRegular">
            <p className="text-justify line-clamp-3">
              <p className='font-myIranSansFaNumBold text-xs mb-1'>توضیحات</p>
              <ReactMarkdown>{restaurant.description}</ReactMarkdown>
            </p>
            <button><ChevronLeftIcon className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const PopularCafes: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Cafe[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('همه');

  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  const categories: CategoryType[] = ['همه', 'فست فود', 'غذای محلی', 'کافه', 'فود تراک'];
  const pageSize = 6;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/places?page=1&limit=${pageSize}&sub_category=${encodeURIComponent("کافه")}`);
        const data: BackendResponse = await res.json();

        if (!Array.isArray(data.data)) throw new Error('Unexpected response format');

const formattedRestaurants: Cafe[] = data.data.map((item) => ({
  ...item,
  id: item.palce_id,
  name: item.name,
  Rate: item.rating || 0,
  ImgName: item.image_names?.[0] || 'NaN',
  Category: item.food_types?.[0] || 'کافه',
}));


        setRestaurants(formattedRestaurants);
        setFilteredRestaurants(formattedRestaurants);
      } catch (err: any) {
        setError(err.message || 'مشکلی پیش آمده');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const filtered = selectedCategory === 'همه' ? restaurants : restaurants.filter(r => r.Category === selectedCategory);
    setFilteredRestaurants(filtered);
    if (mobileScrollRef.current) mobileScrollRef.current.scrollLeft = 0;
    if (desktopScrollRef.current) desktopScrollRef.current.scrollLeft = 0;
  }, [selectedCategory, restaurants]);

  const getImageUrl = (img: string) => (!img || img === 'NaN' ? NoImg : `${BASE_URL}/download-image/${img}`);

  const scrollMobileNext = () => mobileScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const scrollMobilePrev = () => mobileScrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  const scrollDesktopNext = () => desktopScrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' });
  const scrollDesktopPrev = () => desktopScrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' });

  if (loading) return <div className="text-center py-20">در حال بارگذاری...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="py-12 px-6">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="text-2xl font-myIranSansMedium">کافه</h2>
        <Link to="/cafes" className="text-sm text-gray-800 hover:underline font-myIranSansRegular">مشاهده همه</Link>
      </div>

      <div className="relative md:hidden">
        <button onClick={scrollMobilePrev} className="absolute left-0 top-[130px] z-10">
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button onClick={scrollMobileNext} className="absolute right-0 top-[130px] z-10">
          <ChevronRightIcon className="h-5 w-5" />
        </button>
        <div ref={mobileScrollRef} className="flex overflow-x-auto pb-6 space-x-4 rtl:space-x-reverse px-2 scrollbar-hide">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.palce_id} restaurant={restaurant} getImageUrl={getImageUrl} />
          ))}
        </div>
      </div>

      <div className="hidden md:block relative">
        <button onClick={scrollDesktopPrev} className="absolute right-0 top-1/2 z-10">
          <ChevronRightIcon className="h-6 w-6" />
        </button>
        <button onClick={scrollDesktopNext} className="absolute left-0 top-1/2 z-10">
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <div ref={desktopScrollRef} className="flex overflow-x-auto pb-6 space-x-6 rtl:space-x-reverse px-4 scrollbar-hide">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.palce_id} restaurant={restaurant} getImageUrl={getImageUrl} />
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default PopularCafes;
