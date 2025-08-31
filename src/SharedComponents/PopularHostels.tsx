import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon } from '@heroicons/react/24/outline';
import NoImg from '../assets/images/no-image-icon-23485.png';
import ReactMarkdown from 'react-markdown';
import starGreen from "../assets/icons/StarGreen.svg";
import heart from "../assets/icons/heart-rounded.svg";
import { useQuery } from '@tanstack/react-query';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
  address?: string;
  opening_hours: string;
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

const HostelCard: React.FC<{
  hostel: Hostel;
  getImageUrl: (img: string) => string;
}> = ({ hostel, getImageUrl }) => {
  // Remove all carousel-related state and functions
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const imageCount = hostel.image_names?.length || 1;
  // const handleNextImage = (e: React.MouseEvent) => { ... };
  // const handlePrevImage = (e: React.MouseEvent) => { ... };

  const getCurrentImage = () => {
    if (!hostel.image_names || hostel.image_names.length === 0) {
      return getImageUrl('NaN');
    }
    // Just return the first image instead of using currentImageIndex
    return getImageUrl(hostel.image_names[0]);
  };

  return (
    <Link to={`/places/${hostel.id}`} className="flex-shrink-0 w-64 sm:w-72 md:w-80 group">
      <div className="overflow-hidden relative">
        <div className="relative">
          <img
            src={getCurrentImage()}
            alt={hostel.name}
            className="w-full h-48 sm:h-52 md:h-[250px] object-cover border border-b-none rounded-lg rounded-b-none transition-opacity duration-300 group-hover:brightness-75"
          />
          <img src={heart} alt="" className='absolute top-3 right-2 w-5 h-5' />
          
          {/* Remove all carousel controls - dots and navigation buttons */}
        </div>

        {/* Mobile Info */}
        <div className="md:hidden p-[16px] text-black rounded-lg rounded-t-none border border-t-0 h-[130px]">
          <div className='flex justify-between items-center'>
            <h3 className="text-sm font-myYekanDemibold line-clamp-1">{hostel.name}</h3>
            <div className='text-[#1BA75E] font-myYekanFaNumRegular rounded-lg text-sm flex items-center gap-1'>
              <img src={starGreen} alt="" className='w-4 h-4 pb-1' />
              {hostel.Rate}
            </div>
          </div>

          {hostel.address && (
            <div className="flex items-start text-xs mt-4">
              <MapPinIcon className="h-3 w-3 ml-1 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1 font-myYekanFaNumRegular">{hostel.address}</span>
            </div>
          )}

          <div className="text-[8px] pb-1 mt-4">
            <p className="text-justify font-myYekanFaNumRegular line-clamp-3">
              <ReactMarkdown>{hostel.description}</ReactMarkdown>
            </p>
          </div>
        </div>

        {/* Desktop Info */}
        <div className="hidden md:block p-[16px] text-black rounded-lg rounded-t-none h-[160px] border border-t-0">
          <div className="flex justify-between items-center">
            <h3 className="text-[18px] font-myYekanDemibold line-clamp-1">{hostel.name}</h3>
            <div className=" text-[#1BA75E] font-myYekanFaNumRegular rounded-lg text-base flex items-center gap-1 px-1">
              <img src={starGreen} alt="" className="w-4 h-4 pb-1" />
              {hostel.Rate}
            </div>
          </div>

          {hostel.address && (
            <div className="flex items-center mt-5 mb-3 text-sm">
              <MapPinIcon className="h-4 w-4 ml-1 flex-shrink-0" />
              <span className="line-clamp-1 font-myYekanFaNumRegular">{hostel.address}</span>
            </div>
          )}

          <div className="text-[10px] pb-2 mt-4 flex items-end justify-between font-myYekanFaNumRegular">
            <p className="text-justify line-clamp-3">
              <ReactMarkdown>{hostel.description}</ReactMarkdown>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ------------------ Main Component ------------------
const PopularHostels: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('همه');
  const [filteredHostels, setFilteredHostels] = useState<Hostel[]>([]);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  const categories: CategoryType[] = ['همه', 'فست فود', 'غذای محلی', 'کافه', 'فود تراک'];
  const pageSize = 10;

  const getImageUrl = (img: string) => (!img || img === 'NaN' ? NoImg : img);

  const fetchImagesForHostel = async (placeId: string): Promise<string[]> => {
    try {
      const res = await fetch(`${BASE_URL}/entity_images/place/${placeId}`);
      const imageMeta = await res.json();

      const imageUrls: string[] = [];
      for (const img of imageMeta) {
        const imgId = img.image_id;
        const response = await fetch(`${BASE_URL}/images/${imgId}`);
        if (response.ok) {
          imageUrls.push(`${BASE_URL}/images/${imgId}`);
        }
      }
      return imageUrls;
    } catch {
      return [];
    }
  };

  const fetchHostels = async (): Promise<Hostel[]> => {
    const res = await fetch(`${BASE_URL}/places/?page=1&limit=${pageSize}&sub_category=اقامتگاه`);
    const data: BackendResponse = await res.json();

    return await Promise.all(
      data.data.map(async (item) => {
        const images = await fetchImagesForHostel(item.place_id);
        const randomCategory = categories[Math.floor(Math.random() * (categories.length - 1)) + 1];
        return {
          id: item.place_id,
          name: item.name,
          Rate: item.rate || 0,
          ImgName: images[0] || 'NaN',
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
          image_names: images,
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

  const { data: hostels = [], isLoading, error } = useQuery<Hostel[], Error>({
    queryKey: ['hostels'],
    queryFn: fetchHostels,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    const filtered =
      selectedCategory === 'همه'
        ? hostels
        : hostels.filter(r => r.Category === selectedCategory);

    setFilteredHostels(filtered);
    mobileScrollRef.current?.scrollTo({ left: 0 });
    desktopScrollRef.current?.scrollTo({ left: 0 });
  }, [selectedCategory, hostels]);

  const scrollMobileNext = () => mobileScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const scrollMobilePrev = () => mobileScrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  const scrollDesktopNext = () => desktopScrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' });
  const scrollDesktopPrev = () => desktopScrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' });

  if (isLoading) return <div className="text-center py-20">در حال بارگذاری...</div>;
  if (error) return <div className="text-red-500 text-center">{error.message}</div>;

  return (
    <div className="py-12 px-0 desktop:px-16">
      <div className="flex justify-between items-center mb-4 desktop:px-20 px-[16px]">
        <h2 className="text-base tablet:text-2xl desktop:text-3xl  font-myYekanDemibold">اقامتگاه</h2>
        <Link to="/hostels" className="text-sm text-gray-800 font-myYekanRegular">مشاهده همه</Link>
      </div>

      {/* Mobile View */}
      <div className="md:hidden relative">
        <div className="px-0 relative">
          <div
            ref={mobileScrollRef}
            className="flex overflow-x-auto pb-6 space-x-2 rtl:space-x-reverse scroll-smooth px-2 scrollbar-hide"
          >
            {filteredHostels.map(h => (
              <HostelCard key={h.id} hostel={h} getImageUrl={getImageUrl} />
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
            {filteredHostels.map(h => <HostelCard key={h.id} hostel={h} getImageUrl={getImageUrl} />)}
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

export default PopularHostels;
