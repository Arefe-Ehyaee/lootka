import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import NoImg from '../assets/images/no-image-icon-23485.png';
import heart from "../assets/icons/heart-rounded.svg";
import starGreen from "../assets/icons/StarGreen.svg";
import ReactMarkdown from 'react-markdown';
import { useQuery } from '@tanstack/react-query';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Restaurant {
  id: string;
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
  image_name?: string;
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
  data: any[];
  total_items: number;
  total_pages: number;
}

type CategoryType = 'همه' | 'فست فود' | 'غذای محلی' | 'کافه' | 'فود تراک';

const RestaurantCard: React.FC<{
  restaurant: Restaurant;
  getImageUrl: (img: string) => string;
}> = ({ restaurant, getImageUrl }) => {
  const getCurrentImage = () => {
    if (!restaurant.ImgName || restaurant.ImgName === 'NaN') {
      return getImageUrl('NaN');
    }
    return getImageUrl(restaurant.ImgName);
  };

  return (
    <Link to={`/places/${restaurant.id}`} className="flex-shrink-0 w-64 sm:w-72 md:w-80 group">
      <div className="overflow-hidden relative">
        <div className="relative">
          <img
            src={getCurrentImage()}
            alt={restaurant.name}
            className="w-full h-48 sm:h-52 md:h-[250px] border border-b-none object-cover rounded-lg rounded-b-none transition-opacity duration-300 group-hover:brightness-75"
          />
          <img src={heart} alt="" className='absolute top-3 right-1' />
        </div>

        {/* Mobile */}
        <div className="md:hidden p-[16px] text-black rounded-lg rounded-t-none border border-t-0 h-[150px]">
          <div className='flex justify-between items-center'>
            <h3 className="text-sm font-myYekanDemibold line-clamp-1">{restaurant.name}</h3>
            <div className='text-[#1BA75E] font-myYekanFaNumRegular rounded-lg text-sm flex items-center gap-1'>
              <img src={starGreen} alt="" className='w-4 h-4 pb-1' />
              {restaurant.Rate}
            </div>
          </div>
          {restaurant.opening_hours && (
            <div className="flex items-center text-xs mt-2" dir='rtl'>
              <ClockIcon className="h-3 w-3 ml-1" />
              <div className="line-clamp-1 font-myYekanFaNumRegular">{restaurant.opening_hours}</div>
            </div>
          )}
          {restaurant.address && (
            <div className="flex items-start text-xs mt-1">
              <MapPinIcon className="h-3 w-3 ml-1 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1 font-myYekanFaNumRegular">{restaurant.address}</span>
            </div>
          )}
          <div className="text-[8px] pb-1 mt-2">
            <p className="text-justify font-myIranSansMedium line-clamp-3">
              <ReactMarkdown>{restaurant.description}</ReactMarkdown>
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block p-[16px] text-black rounded-lg rounded-t-none h-[170px] border border-t-0">
          <div className='flex justify-between items-center'>
            <h3 className="text-[18px] font-myYekanDemibold line-clamp-1">{restaurant.name}</h3>
            <div className=" text-[#1BA75E] font-myYekanFaNumRegular rounded-lg text-base flex items-center gap-1 px-1">
              <img src={starGreen} alt="" className="w-4 h-4 pb-1" />
              {restaurant.Rate}
            </div>
          </div>
          {restaurant.opening_hours && (
            <div className="flex items-start text-sm mt-4 font-myYekanFaNumRegular" dir='rtl'>
              <ClockIcon className="h-4 w-4 ml-1 flex-shrink-0" />
              <div>{restaurant.opening_hours}</div>
            </div>
          )}
          {restaurant.address && (
            <div className="flex items-start text-sm mt-1">
              <MapPinIcon className="h-4 w-4 ml-1 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1 font-myYekanFaNumRegular">{restaurant.address}</span>
            </div>
          )}
          <div className="text-[10px] pb-2 mt-2 flex items-end justify-between font-myYekanFaNumRegular">
            <p className="text-justify line-clamp-3">
              <ReactMarkdown>{restaurant.description}</ReactMarkdown>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const PopularEat: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('همه');
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  const pageSize = 10;

  const getImageUrl = (idOrFilename: string) =>
    !idOrFilename || idOrFilename === 'NaN' ? NoImg : `${BASE_URL}/images/${idOrFilename}`;

  // فقط اولین عکس واکشی می‌شود
  const fetchFirstImageForRestaurant = async (placeId: string): Promise<string | null> => {
    try {
      const res = await fetch(`${BASE_URL}/entity_images/place/${placeId}`);
      const data = await res.json();
      if (!data || data.length === 0) return null;
      return data[1].image_id;
    } catch (err) {
      console.error(`Error fetching first image for ${placeId}:`, err);
      return null;
    }
  };

  const fetchRestaurants = async (): Promise<Restaurant[]> => {
    const res = await fetch(`${BASE_URL}/places/?page=1&limit=${pageSize}&sub_category=${encodeURIComponent("رستوران")}`);
    const data: BackendResponse = await res.json();

    return Promise.all(
      data.data.map(async (item) => {
        const firstImageId = await fetchFirstImageForRestaurant(item.place_id);

        return {
          id: item.place_id,
          name: item.name,
          Rate: item.rate || 0,
          ImgName: firstImageId || 'NaN',
          Category: item.food_types?.[0] || 'کافه',
          OurDescription: item.OurDescription,
          UsersDescription: item.UsersDescription,
          rating: item.rate,
          reviews: item.reviews,
          address: item.address,
          opening_hours: item.opening_hours,
          phone: item.phone,
          website: item.website,
          instagram: item.instagram,
          Menu: item.Menu,
          food_types: item.food_types,
          mealTime: item.mealTime,
          Cuisine: item.Cuisine,
          price_range: item.price_range,
          latitude: item.latitude,
          longitude: item.longitude,
          map_url: item.map_url,
          review_summary: item.review_summary,
          description: item.description,
          sub_category: item.sub_category,
        };
      })
    );
  };

  const { data: restaurants = [], isLoading, isError, error } = useQuery<Restaurant[], Error>({
    queryKey: ['restaurants', pageSize],
    queryFn: fetchRestaurants,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const filteredRestaurants =
    selectedCategory === 'همه'
      ? restaurants
      : restaurants.filter(r => r.Category === selectedCategory);

  const scrollDesktopPrev = () => desktopScrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' });
  const scrollDesktopNext = () => desktopScrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' });

  if (isLoading) return <div className="text-center py-20">در حال بارگذاری...</div>;
  if (isError) return <div className="text-red-500 text-center">{error.message}</div>;

  return (
    <div className="py-12 px-0 desktop:px-16">
      <div className="flex justify-between items-center mb-4 desktop:px-20 px-[16px]">
        <h2 className="text-xl tablet:text-2xl desktop:text-3xl font-myYekanDemibold">رستوران</h2>
        <Link to="/restaurants" className="flex flex-row gap-1 items-center text-sm text-gray-800 font-myYekanRegular">مشاهده همه
        <ChevronLeftIcon className="h-4 w-4" /></Link>
      </div>

      {/* Mobile */}
      <div className="relative md:hidden">
        <div className="px-0 relative">
          <div
            ref={mobileScrollRef}
            className="flex overflow-x-auto pb-6 space-x-2 rtl:space-x-reverse scroll-smooth px-2 scrollbar-hide"
          >
            {filteredRestaurants.map(h => (
              <RestaurantCard key={h.id} restaurant={h} getImageUrl={getImageUrl} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block relative px-12">
        <div className="relative flex items-center">
          <button onClick={scrollDesktopPrev} className="z-10 w-10 h-10 flex items-center justify-center">
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          <div
            ref={desktopScrollRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide space-x-2 rtl:space-x-reverse scroll-smooth flex-1"
          >
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} getImageUrl={getImageUrl} />
            ))}
          </div>

          <button onClick={scrollDesktopNext} className="z-10 w-10 h-10 flex items-center justify-center">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default PopularEat;
