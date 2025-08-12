import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon } from '@heroicons/react/24/outline';
import NoImg from '../assets/images/no-image-icon-23485.png';
import ReactMarkdown from 'react-markdown';
import starGreen from "../assets/icons/StarGreen.svg";
import heart from "../assets/icons/heart-rounded.svg";

const BASE_URL = "http://82.115.25.241:2000";

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
  image_names?: string[]; // now stores full image URLs
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageCount = hostel.image_names?.length || 1;

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
    <Link to={`/places/${hostel.id}`} className="flex-shrink-0 w-64 sm:w-72 md:w-80 group">
      <div className="overflow-hidden relative">
        <div className="relative">
          <img
            src={getCurrentImage()}
            alt={hostel.name}
            className="w-full h-48 sm:h-52 md:h-[250px] object-cover rounded-lg rounded-b-none transition-opacity duration-300 group-hover:brightness-75"
          />
          <img src={heart} alt="" className='absolute top-3 right-2 w-5 h-5' />
          {imageCount > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
              {Array.from({ length: imageCount }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer ${currentImageIndex === index ? 'bg-white' : 'bg-white/40'}`}
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
              <button onClick={handlePrevImage} className="absolute top-1/2 right-2 -translate-y-1/2 text-white">
                <ChevronRightIcon className="h-5 w-5" />
              </button>
              <button onClick={handleNextImage} className="absolute top-1/2 left-2 -translate-y-1/2 text-white">
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Info */}
        <div className="md:hidden py-2 px-3 text-black rounded-lg rounded-t-none border border-t-0 h-[150px]">
          <div className='flex justify-between items-center'>
            <h3 className="text-sm font-myIranSansMedium line-clamp-1">{hostel.name}</h3>
            <div className='bg-[#EDF9F3] border text-[#1BA75E] rounded-lg text-sm flex items-center gap-1 px-1'>
              {hostel.Rate}
              <img src={starGreen} alt="" className='w-3 h-3' />
            </div>
          </div>

          {hostel.address && (
            <div className="flex items-start mb-2 text-xs">
              <MapPinIcon className="h-3 w-3 ml-1 mt-0.5" />
              <span className="line-clamp-1">{hostel.address}</span>
            </div>
          )}

          <div className="text-[8px]">
            <p className='text-[10px] mb-0.5 font-bold'>توضیحات</p>
            <p className='line-clamp-3'>{hostel.description}</p>
          </div>
        </div>

        {/* Desktop Info */}
        <div className="hidden md:block py-2 px-2 text-black rounded-lg rounded-t-none h-[170px] border border-t-0">
          <div className="flex justify-between items-center">
            <h3 className="text-[18px] font-myIranSansMedium line-clamp-1">{hostel.name}</h3>
            <div className="bg-[#EDF9F3] border text-[#1BA75E] rounded-lg text-base flex items-center gap-2 px-1">
              {hostel.Rate}
              <img src={starGreen} alt="" className="w-4 h-4" />
            </div>
          </div>

          {hostel.address && (
            <div className="flex items-center mt-5 mb-3 text-sm">
              <MapPinIcon className="h-4 w-4 ml-1" />
              <span className="line-clamp-1">{hostel.address}</span>
            </div>
          )}

          <div className="text-[10px] pb-2 flex justify-between">
            <div>
              <p className='text-xs mb-1 font-bold'>توضیحات</p>
              <ReactMarkdown>{hostel.description}</ReactMarkdown>
            </div>
            <button><ChevronLeftIcon className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const PopularHostels: React.FC = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [filteredHostels, setFilteredHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('همه');

  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  const categories: CategoryType[] = ['همه', 'فست فود', 'غذای محلی', 'کافه', 'فود تراک'];
  const pageSize = 6;

  const getImageUrl = (img: string) =>
    !img || img === 'NaN' ? NoImg : img;

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
    } catch (err) {
      console.error(`Error fetching images for ${placeId}`, err);
      return [];
    }
  };

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/places?page=1&limit=${pageSize}&sub_category=اقامتگاه`);
        const data: BackendResponse = await res.json();

        const formatted: Hostel[] = await Promise.all(
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

        setHostels(formatted);
        setFilteredHostels(formatted);
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message || 'خطا در دریافت اطلاعات');
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
    mobileScrollRef.current?.scrollTo({ left: 0 });
    desktopScrollRef.current?.scrollTo({ left: 0 });
  }, [selectedCategory, hostels]);

  const scrollMobileNext = () => mobileScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const scrollMobilePrev = () => mobileScrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  const scrollDesktopNext = () => desktopScrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' });
  const scrollDesktopPrev = () => desktopScrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' });

  if (loading) return <div className="text-center py-20">در حال بارگذاری...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="py-12 px-6">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="text-2xl font-myIranSansMedium">اقامتگاه</h2>
        <Link to="/hostels" className="text-sm text-gray-800 hover:underline">مشاهده همه</Link>
      </div>

      {/* Mobile View */}
      <div className="md:hidden relative">
        <div className="px-8 relative">
          <button onClick={scrollMobilePrev} className="absolute left-0 top-[130px] z-10">
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button onClick={scrollMobileNext} className="absolute right-0 top-[130px] z-10">
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          <div ref={mobileScrollRef} className="flex overflow-x-auto pb-6 space-x-4 rtl:space-x-reverse scroll-smooth px-2 scrollbar-hide">
            {filteredHostels.map(h => <HostelCard key={h.id} hostel={h} getImageUrl={getImageUrl} />)}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block relative">
        <div className="px-14 relative">
          <button onClick={scrollDesktopPrev} className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <button onClick={scrollDesktopNext} className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div ref={desktopScrollRef} className="flex overflow-x-auto pb-6 space-x-6 rtl:space-x-reverse scroll-smooth px-4 scrollbar-hide">
            {filteredHostels.map(h => <HostelCard key={h.id} hostel={h} getImageUrl={getImageUrl} />)}
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

export default PopularHostels;
