import React, { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import NoImg from '../assets/images/no-image-icon-23485.png';
import { useQuery } from '@tanstack/react-query';
import PlaceCard from './PlaceCard'; 

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Attraction {
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
  opening_hours?: string; 
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

interface BackendResponse {
  data: any[];
  total_items: number;
  total_pages: number;
}

type CategoryType = 'همه' | 'فست فود' | 'غذای محلی' | 'کافه' | 'فود تراک';

const categories: CategoryType[] = ['همه', 'فست فود', 'غذای محلی', 'کافه', 'فود تراک'];
const pageSize = 10;

// 🔹 fetcher with first image
const fetchAttractions = async (): Promise<Attraction[]> => {
  const res = await fetch(
    `${BASE_URL}/places/?page=1&limit=${pageSize}&sub_category=${encodeURIComponent("جای دیدنی")}`
  );
  const data: BackendResponse = await res.json();

  return Promise.all(
    data.data.map(async (item) => {
      let firstImageId: string = 'NaN';
      try {
        const imgRes = await fetch(`${BASE_URL}/entity_images/place/${item.place_id}`);
        const imageData = await imgRes.json();
        if (Array.isArray(imageData) && imageData.length > 0) {
          firstImageId = imageData[0].image_id;
        }
      } catch {
        console.warn(`Image fetch failed for ${item.place_id}`);
      }

      const randomCategory =
        categories[Math.floor(Math.random() * (categories.length - 1)) + 1];

      return {
        id: item.place_id,
        name: item.name,
        Rate: item.rate || 0,
        ImgName: firstImageId || 'NaN',
        image_names: [firstImageId],
        Category: item.food_types?.[0] || randomCategory,
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
        subCategory: item.subCategory,
        mealTime: item.mealTime,
        Cuisine: item.Cuisine,
        price_range: item.price_range,
        latitude: item.latitude,
        longitude: item.longitude,
        map_url: item.map_url,
        review_summary: item.review_summary,
        description: item.description,
      };
    })
  );
};

const PopularDestination: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('همه');
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  const scrollDesktopNext = () =>
    desktopScrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' });
  const scrollDesktopPrev = () =>
    desktopScrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' });

  // 🔹 React Query hook
  const {
    data: attractions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['attractions'],
    queryFn: fetchAttractions,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  // 🔹 filter memoized
  const filteredAttractions = useMemo(() => {
    return selectedCategory === 'همه'
      ? attractions
      : attractions.filter((a) => a.Category === selectedCategory);
  }, [selectedCategory, attractions]);

  const getImageUrl = (idOrFilename: string) =>
    !idOrFilename || idOrFilename === 'NaN'
      ? NoImg
      : `${BASE_URL}/images/${idOrFilename}`;

  if (isLoading) return <div className="text-center py-20">در حال بارگذاری...</div>;
  if (error instanceof Error)
    return <div className="text-red-500 text-center">{error.message}</div>;

  return (
    <div className="py-12 px-0 desktop:px-16">
      <div className="flex justify-between items-center mb-4 desktop:px-20 px-[16px]">
        <h2 className="text-xl tablet:text-2xl desktop:text-3xl font-myYekanDemibold">
          جای دیدنی
        </h2>
        <Link
          to="/attractions"
          className="flex flex-row items-center gap-1 text-sm text-gray-800 font-myYekanRegular"
        >
          مشاهده همه
          <ChevronLeftIcon className="h-4 w-4" />
        </Link>
      </div>

      {/* Mobile View */}
      <div className="relative md:hidden px-0">
        <div
          ref={mobileScrollRef}
          className="flex overflow-x-auto space-x-2 rtl:space-x-reverse scroll-smooth pb-6 scrollbar-hide px-2"
        >
          {filteredAttractions.map((attr) => (
            <PlaceCard
              key={attr.id}
              place={attr}
              getImageUrl={getImageUrl}
              type="attraction"
            />
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block relative px-12">
        <div className="relative flex items-center">
          <button
            onClick={scrollDesktopPrev}
            className="z-10 w-10 h-10 flex items-center justify-center"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <div
            ref={desktopScrollRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide space-x-2 rtl:space-x-reverse scroll-smooth flex-1"
          >
            {filteredAttractions.map((attr) => (
              <PlaceCard
                key={attr.id}
                place={attr}
                getImageUrl={getImageUrl}
                type="attraction"
              />
            ))}
          </div>
          <button
            onClick={scrollDesktopNext}
            className="z-10 w-10 h-10 flex items-center justify-center"
          >
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

export default PopularDestination;
