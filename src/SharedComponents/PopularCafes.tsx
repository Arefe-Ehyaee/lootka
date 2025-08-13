import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import NoImg from '../assets/images/no-image-icon-23485.png';
import heart from "../assets/icons/heart-rounded.svg";
import starGreen from "../assets/icons/StarGreen.svg";
import ReactMarkdown from 'react-markdown';

const BASE_URL = "http://91.212.174.72:2000";

interface Cafe {
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
  image_ids?: string[];
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

const CafeCard: React.FC<{
  cafe: Cafe;
  getImageUrl: (img: string) => string;
}> = ({ cafe, getImageUrl }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    cafe.image_ids && cafe.image_ids.length > 1 ? 1 : 0
  );

  const imageList = cafe.image_ids?.length
    ? cafe.image_ids
    : cafe.image_names;

  const imageCount = imageList?.length || 1;

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
    if (!imageList || imageList.length === 0) return getImageUrl('NaN');
    return getImageUrl(imageList[currentImageIndex]);
  };

  return (
    <Link to={`/places/${cafe.id}`} className="flex-shrink-0 w-64 sm:w-72 md:w-80 group">
      <div className="overflow-hidden relative">
        <div className="relative">
          <img
            src={getCurrentImage()}
            alt={cafe.name}
            className="w-full h-48 sm:h-52 md:h-[250px] object-cover rounded-lg rounded-b-none transition-opacity duration-300 group-hover:brightness-75"
          />
          <img src={heart} alt="" className='absolute top-3 right-1' />

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
                    role="button"
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
        <div className="md:hidden py-2 px-3 text-black rounded-lg rounded-t-none border border-t-0 h-[150px]">
          <div className='flex justify-between items-center'>
            <h3 className="text-sm font-myIranSansMedium line-clamp-1">{cafe.name}</h3>
            <div className='bg-[#EDF9F3] text-[#1BA75E] rounded-lg text-sm font-myIranSansFaNumRegular flex items-center gap-1 px-1'>
              {cafe.Rate}
              <img src={starGreen} alt="" className='w-3 h-3' />
            </div>
          </div>
          {cafe.opening_hours && (
            <div className="flex items-center text-xs mt-2" dir='rtl'>
              <ClockIcon className="h-3 w-3 ml-1" />
              <div className="line-clamp-1 font-myIranSansFaNumMedium">{cafe.opening_hours}</div>
            </div>
          )}
          {cafe.address && (
            <div className="flex items-start text-xs mt-1">
              <MapPinIcon className="h-3 w-3 ml-1 mt-0.5" />
              <span className="line-clamp-1 font-myIranSansFaNumRegular">{cafe.address}</span>
            </div>
          )}
          <div className="text-[8px] pb-1 mt-1">
            <p className="text-justify font-myIranSansMedium line-clamp-3">
              <p className='text-[10px] mb-0.5'>توضیحات</p>
              <ReactMarkdown>{cafe.description}</ReactMarkdown>
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block py-2 px-2 text-black rounded-lg rounded-t-none h-[170px] border border-t-0">
          <div className='flex justify-between items-center'>
            <h3 className="text-[18px] font-myIranSansMedium line-clamp-1">{cafe.name}</h3>
            <div className='bg-[#EDF9F3] text-[#1BA75E] rounded-lg text-base font-myIranSansFaNumRegular flex items-center gap-2 px-1'>
              {cafe.Rate}
              <img src={starGreen} alt="" className='w-4 h-4' />
            </div>
          </div>
          {cafe.opening_hours && (
            <div className="flex items-start text-sm mt-4 font-myIranSansFaNumRegular" dir='rtl'>
              <ClockIcon className="h-4 w-4 ml-1 flex-shrink-0" />
              <div>{cafe.opening_hours}</div>
            </div>
          )}
          {cafe.address && (
            <div className="flex items-center text-sm mt-2 font-myIranSansFaNumRegular">
              <MapPinIcon className="w-4 h-4 ml-1" />
              <span className="flex-1 truncate">{cafe.address}</span>
            </div>
          )}
          <div className="text-[10px] pb-2 mt-2 flex items-end justify-between font-myIranSansFaNumRegular">
            <p className="text-justify line-clamp-3">
              <p className='font-myIranSansFaNumBold text-xs mb-1'>توضیحات</p>
              <ReactMarkdown>{cafe.description}</ReactMarkdown>
            </p>
            <button><ChevronLeftIcon className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const PopularCafes: React.FC = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [filteredCafes, setFilteredCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('همه');

  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  const pageSize = 6;

  const getImageUrl = (idOrFilename: string) =>
    !idOrFilename || idOrFilename === 'NaN' ? NoImg : `${BASE_URL}/images/${idOrFilename}`;

  const fetchImageFilenames = async (placeId: string): Promise<string[]> => {
    try {
      const res = await fetch(`${BASE_URL}/entity_images/place/${placeId}`);
      const data = await res.json();
      return data.map((img: any) => img.image_id);
    } catch (err) {
      console.error(`Error fetching images for ${placeId}:`, err);
      return [];
    }
  };

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/places?page=1&limit=${pageSize}&sub_category=${encodeURIComponent("کافه")}`);
        const data: BackendResponse = await res.json();

        const formattedCafes: Cafe[] = await Promise.all(
          data.data.map(async (item) => {
            const imageIds = await fetchImageFilenames(item.place_id);

            return {
              id: item.place_id,
              name: item.name,
              Rate: item.rate || 0,
              ImgName: item.image_names?.[0] || 'NaN',
              image_ids: imageIds,
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
              image_names: item.image_names,
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
              sub_category: item.sub_category
            };
          })
        );

        setCafes(formattedCafes);
        setFilteredCafes(formattedCafes);
      } catch (err: any) {
        setError(err.message || 'خطا در دریافت اطلاعات');
      } finally {
        setLoading(false);
      }
    };

    fetchCafes();
  }, []);

  useEffect(() => {
    const filtered =
      selectedCategory === 'همه'
        ? cafes
        : cafes.filter(r => r.Category === selectedCategory);
    setFilteredCafes(filtered);

    mobileScrollRef.current?.scrollTo({ left: 0 });
    desktopScrollRef.current?.scrollTo({ left: 0 });
  }, [selectedCategory, cafes]);

  const scrollMobileNext = () => mobileScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const scrollMobilePrev = () => mobileScrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  const scrollDesktopNext = () => desktopScrollRef.current?.scrollBy({ left: -600, behavior: 'smooth' });
  const scrollDesktopPrev = () => desktopScrollRef.current?.scrollBy({ left: 600, behavior: 'smooth' });

  if (loading) return <div className="text-center py-20">در حال بارگذاری...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="py-12 px-6">
      <div className="flex justify-between items-center mb-6 px-4">
        <h2 className="text-xl md:text-3xl font-myIranSansMedium">کافه</h2>
        <Link to="/cafes" className="text-sm text-gray-800 hover:underline font-myIranSansRegular">مشاهده همه</Link>
      </div>

      {/* Mobile */}
      <div className="relative md:hidden">
        <div className="px-8">
          <button onClick={scrollMobilePrev} className="absolute left-0 top-[130px] -translate-y-1/2 z-10 hover:bg-gray-100 w-8 h-8">
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button onClick={scrollMobileNext} className="absolute right-0 top-[130px] -translate-y-1/2 z-10 hover:bg-gray-100 w-8 h-8">
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          <div ref={mobileScrollRef} className="flex overflow-x-auto pb-6 scrollbar-hide space-x-4 rtl:space-x-reverse scroll-smooth px-2">
            {filteredCafes.map(cafe => (
              <CafeCard key={cafe.id} cafe={cafe} getImageUrl={getImageUrl} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block relative">
        <div className="px-14">
          <button onClick={scrollDesktopPrev} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <button onClick={scrollDesktopNext} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div ref={desktopScrollRef} className="flex overflow-x-auto pb-6 scrollbar-hide space-x-6 rtl:space-x-reverse scroll-smooth px-4">
            {filteredCafes.map(cafe => (
              <CafeCard key={cafe.id} cafe={cafe} getImageUrl={getImageUrl} />
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

export default PopularCafes;
