import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon } from '@heroicons/react/24/outline';
import NoImg from '../assets/images/no-image-icon-23485.png';
import starGreen from "../assets/icons/StarGreen.svg";
import heart from "../assets/icons/heart-rounded.svg";
import ReactMarkdown from 'react-markdown';

// const BASE_URL = "http://91.212.174.72:2000";
const BASE_URL = "/api";

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

const AttractionCard: React.FC<{
  attraction: Attraction;
  getImageUrl: (img: string) => string;
}> = ({ attraction, getImageUrl }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageCount = attraction.image_names?.length || 1;

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
    if (!attraction.image_names || attraction.image_names.length === 0) {
      return getImageUrl('NaN');
    }
    return getImageUrl(attraction.image_names[currentImageIndex]);
  };

  return (
    <Link to={`/places/${attraction.id}`} className="flex-shrink-0 w-64 sm:w-72 md:w-80 group">
      <div className="overflow-hidden relative">
        <div className="relative">
          <img
            src={getCurrentImage()}
            alt={attraction.name}
            className="w-full h-48 sm:h-52 md:h-[250px] object-cover rounded-lg rounded-b-none transition-opacity duration-300 group-hover:brightness-75"
          />
          <img src={heart} alt="" className='text-white absolute top-3 right-1 transform -translate-x-1/2' />

          {imageCount > 1 && (
            <>
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                {Array.from({ length: imageCount }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                  />
                ))}
              </div>
              <button onClick={handlePrevImage} className="absolute top-1/2 right-2 -translate-y-1/2 z-20 hover:bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <ChevronRightIcon className="h-5 w-5" />
              </button>
              <button onClick={handleNextImage} className="absolute top-1/2 left-2 -translate-y-1/2 z-20 hover:bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden p-[16px] text-black rounded-lg rounded-t-none border border-t-0 h-[130px]">
          <div className='flex flex-row justify-between items-center'>
            <h3 className="text-sm font-myIranSansMedium line-clamp-1">{attraction.name}</h3>
            <div className='bg-[#EDF9F3] border text-[#1BA75E] font-myIranSansFaNumRegular rounded-lg text-sm flex items-center gap-1 px-1'>
              {attraction.Rate}
              <img src={starGreen} alt="" className='w-3 h-3' />
            </div>
          </div>
          {attraction.address && (
            <div className="flex items-start mb-2 text-xs mt-4">
              <MapPinIcon className="h-3 w-3 ml-1 flex-shrink-0" />
              <span className="line-clamp-1">{attraction.address}</span>
            </div>
          )}
          <div className="text-[8px] pb-1 mt-4">
            <p className="text-justify font-myIranSansMedium line-clamp-3">
              {/* <p className='text-[10px] mb-0.5'>توضیحات</p> */}
              <ReactMarkdown>{attraction.description}</ReactMarkdown>
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block p-[16px] text-black rounded-lg rounded-t-none h-[160px] border border-t-0">
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-[18px] font-myIranSansMedium line-clamp-1">{attraction.name}</h3>
            <div className="bg-[#EDF9F3] border text-[#1BA75E] font-myIranSansFaNumRegular rounded-lg text-base flex items-center gap-2 px-1">
              {attraction.Rate}
              <img src={starGreen} alt="" className="w-4 h-4" />
            </div>
          </div>
          {attraction.address && (
            <div className="flex items-center mt-5 mb-3 text-sm">
              <MapPinIcon className="h-4 w-4 ml-1 flex-shrink-0" />
              <span className="line-clamp-1">{attraction.address}</span>
            </div>
          )}
          <div className="text-[10px] pb-2 mt-4 flex items-end justify-between font-myIranSansFaNumRegular mt-1">
            <p className="text-justify line-clamp-3">
              {/* <p className='font-myIranSansFaNumBold text-xs mb-1'>توضیحات</p> */}
              <ReactMarkdown>{attraction.description}</ReactMarkdown>
            </p>
            <button><ChevronLeftIcon className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const PopularDestination: React.FC = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('همه');

  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  const categories: CategoryType[] = ['همه', 'فست فود', 'غذای محلی', 'کافه', 'فود تراک'];
  const pageSize = 10;

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/places?page=1&limit=${pageSize}&sub_category=${encodeURIComponent("جای دیدنی")}`);
        const data: BackendResponse = await res.json();

        const formattedAttractions: Attraction[] = await Promise.all(data.data.map(async (item) => {
          let imageUrls: string[] = [];
          try {
            const imgRes = await fetch(`${BASE_URL}/entity_images/place/${item.place_id}`);
            const imageData = await imgRes.json();
            if (Array.isArray(imageData)) {
              imageUrls = imageData.map(img => `${BASE_URL}/images/${img.image_id}`);
            }
          } catch (e) {
            console.warn(`Image fetch failed for ${item.place_id}`);
          }

          const randomCategory = categories[Math.floor(Math.random() * (categories.length - 1)) + 1];

          return {
            id: item.place_id,
            name: item.name,
            Rate: item.rate || 0,
            ImgName: imageUrls[0] || 'NaN',
            image_names: imageUrls,
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
        }));

        setAttractions(formattedAttractions);
        setFilteredAttractions(formattedAttractions);
      } catch (err: any) {
        setError(err.message || 'خطایی رخ داده است.');
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, []);

  useEffect(() => {
    const filtered =
      selectedCategory === 'همه'
        ? attractions
        : attractions.filter(a => a.Category === selectedCategory);
    setFilteredAttractions(filtered);
    mobileScrollRef.current?.scrollTo({ left: 0 });
    desktopScrollRef.current?.scrollTo({ left: 0 });
  }, [selectedCategory, attractions]);

  const getImageUrl = (img: string) => (!img || img === 'NaN' ? NoImg : img);

  const scrollMobileNext = () => mobileScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const scrollMobilePrev = () => mobileScrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  const scrollDesktopNext = () => desktopScrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' });
  const scrollDesktopPrev = () => desktopScrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' });

  if (loading) return <div className="text-center py-20">در حال بارگذاری...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="py-12 px-0 desktop:px-16">
      <div className="flex justify-between items-center mb-4 desktop:px-16 px-[16px]">
        <h2 className="text-base tablet:text-2xl desktop:text-3xl font-myIranSansMedium">جاهای دیدنی</h2>
        <Link to="/attractions" className="text-sm text-gray-800 hover:underline font-myIranSansRegular">مشاهده همه</Link>
      </div>

      {/* Mobile View */}
      <div className="relative md:hidden px-0">
        <div
          ref={mobileScrollRef}
          className="flex overflow-x-auto space-x-2 rtl:space-x-reverse scroll-smooth pb-6 scrollbar-hide px-2"
        >
          {filteredAttractions.map(attr => (
            <AttractionCard key={attr.id} attraction={attr} getImageUrl={getImageUrl} />
          ))}
        </div>
      </div>


      {/* Desktop View */}
      <div className="hidden md:block relative px-14">
        <button onClick={scrollDesktopPrev} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10">
          <ChevronRightIcon className="h-6 w-6" />
        </button>
        <button onClick={scrollDesktopNext} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10">
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <div ref={desktopScrollRef} className="flex overflow-x-auto space-x-2 rtl:space-x-reverse scroll-smooth pb-6 scrollbar-hide px-4">
          {filteredAttractions.map(attr => (
            <AttractionCard key={attr.id} attraction={attr} getImageUrl={getImageUrl} />
          ))}
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

export default PopularDestination;
