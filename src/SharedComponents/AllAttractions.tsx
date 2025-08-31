import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import NoImg from '../assets/images/no-image-icon-23485.png';
import ReactMarkdown from 'react-markdown';
import Navbar from './Navbar';
import Footer from './Footer';
import starGreen from "../assets/icons/StarGreen.svg";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Attraction {
  id: string;
  name: string;
  Rate: number;
  ImgName: string;
  address?: string;
  opening_hours: { all_day?: string | null };
  description: string;
  image_names?: string[];
}

// React Query functions
const fetchImagesForAttraction = async (placeId: string): Promise<string[]> => {
  try {
    const res = await fetch(`${BASE_URL}/entity_images/place/${placeId}`);
    if (!res.ok) throw new Error('Failed to fetch images');
    const imageData = await res.json();
    
    if (Array.isArray(imageData)) {
      return imageData.map((img: any) => `${BASE_URL}/images/${img.image_id}`);
    }
    return [];
  } catch (e) {
    console.warn(`Image fetch failed for ${placeId}`);
    return [];
  }
};

const fetchAttractions = async (page: number, pageSize: number) => {
  const res = await fetch(
    `${BASE_URL}/places?page=${page}&limit=${pageSize}&sub_category=${encodeURIComponent("جای دیدنی")}`
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch attractions');
  }
  
  const json = await res.json();
  
  // Fetch images for all attractions in parallel
  const formatted: Attraction[] = await Promise.all(
    json.data.map(async (item: any) => {
      const imageUrls = await fetchImagesForAttraction(item.place_id);
      
      return {
        id: item.place_id,
        name: item.name,
        Rate: item.rate || 0,
        ImgName: imageUrls[0] || 'NaN',
        image_names: imageUrls,
        address: item.address,
        opening_hours: item.opening_hours,
        description: item.description,
      };
    })
  );
  
  return {
    attractions: formatted,
    totalPages: json.total ? Math.ceil(json.total / pageSize) : 
               (json.data.length === pageSize ? page + 1 : page)
  };
};

const AttractionCard: React.FC<{ attraction: Attraction }> = ({ attraction }) => {
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
      return NoImg;
    }
    return attraction.image_names[currentImageIndex];
  };

  return (
    <Link
      to={`/places/${attraction.id}`}
      key={attraction.id}
      className="group border rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      <div className="relative">
        <img
          src={getCurrentImage()}
          alt={attraction.name}
          className="w-full h-60 object-cover group-hover:brightness-75 transition"
        />

        {imageCount > 1 && (
          <>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
              {Array.from({ length: imageCount }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer ${currentImageIndex === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-myIranSansMedium">{attraction.name}</h2>
          <div className="bg-[#EDF9F3] font-myIranSansFaNumRegular border border-green-100 text-[#1BA75E] rounded-lg text-base flex items-center gap-2 px-1">
            {attraction.Rate}
            <img src={starGreen} alt="" className="w-4 h-4" />
          </div>
        </div>

        {attraction.address && (
          <div className="flex items-center mt-2 mb-2 text-sm font-myIranSansFaNumRegular">
            <MapPinIcon className="h-4 w-4 ml-1 shrink-0" />
            <span className="line-clamp-1 grow">{attraction.address}</span>
          </div>
        )}

        <div className="text-[10px] pb-2 flex flex-row items-end justify-between font-myIranSansFaNumRegular">
          <p className="text-justify line-clamp-3">
            <p className="font-myIranSansFaNumBold text-xs mb-1 mt-2">توضیحات</p>
            <ReactMarkdown>{attraction.description}</ReactMarkdown>
          </p>
        </div>
      </div>
    </Link>
  );
};

const AllAttractions: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // React Query for fetching attractions
  const {
    data,
    isLoading,
    isError,
    error,
    isPlaceholderData
  } = useQuery({
    queryKey: ['attractions', currentPage, pageSize],
    queryFn: () => fetchAttractions(currentPage, pageSize),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
  });

  const attractions = data?.attractions || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(newPage);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (isError) {
    return (
      <div className="min-h-screen min-w-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-3">
          <div className="p-4 md:p-10">
            <div className="text-center py-20 text-red-600">
              خطا در بارگذاری جاهای دیدنی: {error?.message}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-3">
        <div className="p-4 md:p-10">
          <h1 className="text-xl font-myIranSansFaNumBold mb-6 mt-12">همه جاهای دیدنی</h1>

          {isLoading ? (
            <div className="text-center py-20">در حال بارگذاری...</div>
          ) : isPlaceholderData ? (
            <div className="text-center py-20">
              <div className="text-gray-500 text-lg">در حال بارگذاری صفحه جدید...</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {attractions.map(attraction => (
                  <AttractionCard key={attraction.id} attraction={attraction} />
                ))}
              </div>

              {attractions.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                  هیچ جای دیدنی‌ای یافت نشد
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center font-myIranSansFaNumRegular">
                  <nav className="flex items-center gap-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>

                    {getPageNumbers().map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-md ${currentPage === page
                          ? 'bg-green-100 text-green-700 font-myIranSansFaNumBold'
                          : 'hover:bg-gray-100'
                          }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllAttractions;