import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ClockIcon, MapPinIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import NoImg from '../assets/images/no-image-icon-23485.png';
import ReactMarkdown from 'react-markdown';
import Navbar from './Navbar';
import Footer from './Footer';
import starGreen from "../assets/icons/StarGreen.svg";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Cafe {
  id: string;
  name: string;
  Rate: number;
  address?: string;
  opening_hours?: any;
  description: string;
  image_ids?: string[];
  image_names?: string[];
}

// React Query functions
const fetchImageFilenames = async (placeId: string): Promise<string[]> => {
  try {
    const res = await fetch(`${BASE_URL}/entity_images/place/${placeId}`);
    if (!res.ok) throw new Error('Failed to fetch images');
    const data = await res.json();
    return data.map((img: any) => img.image_id);
  } catch (err) {
    console.error(`Error fetching images for ${placeId}:`, err);
    return [];
  }
};

const fetchCafes = async (page: number, pageSize: number) => {
  const res = await fetch(
    `${BASE_URL}/places/?page=${page}&limit=${pageSize}&sub_category=${encodeURIComponent("کافه")}`
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch cafes');
  }
  
  const json = await res.json();
  
  // Fetch images for all cafes in parallel
  const formatted: Cafe[] = await Promise.all(
    json.data.map(async (item: any) => {
      const imageIds = await fetchImageFilenames(item.place_id);
      
      return {
        id: item.place_id,
        name: item.name,
        Rate: item.rate || 0,
        address: item.address,
        opening_hours: item.opening_hours,
        description: item.description,
        image_ids: imageIds,
        image_names: item.image_names,
      };
    })
  );
  
  return {
    cafes: formatted,
    totalPages: json.total ? Math.ceil(json.total / pageSize) : 
               (json.data.length === pageSize ? page + 1 : page)
  };
};

const getImageUrl = (img: string) =>
  !img || img === 'NaN' ? NoImg : `${BASE_URL}/images/${img}`;

/** CafeCard with single image display */
const CafeCard: React.FC<{ cafe: Cafe }> = ({ cafe }) => {
  const getImage = () => {
    const images = cafe.image_ids?.length
      ? cafe.image_ids
      : cafe.image_names || [];
    
    return images.length > 0 ? images[0] : 'NaN';
  };

  return (
    <Link
      to={`/places/${cafe.id}`}
      className="group border rounded-lg overflow-hidden hover:shadow-lg transition relative"
    >
      <div className="relative">
        <img
          src={getImageUrl(getImage())}
          alt={cafe.name}
          className="w-full h-60 object-cover group-hover:brightness-75 transition"
        />
      </div>

      <div className="p-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-myIranSansMedium">{cafe.name}</h2>
          <div className="bg-[#EDF9F3] font-myIranSansFaNumRegular border border-green-100 text-[#1BA75E] rounded-lg text-base font-myIranSansFaNumRegular flex flex-row items-center gap-2 px-1">
            {cafe.Rate}
            <img src={starGreen} alt="" className="w-4 h-4" />
          </div>
        </div>
        {cafe.opening_hours?.all_day && (
          <div className="flex items-center text-sm mt-2">
            <ClockIcon className="h-4 w-4 ml-1" />
            {cafe.opening_hours.all_day}
          </div>
        )}
        {cafe.address && (
          <div className="flex items-start mt-1 text-sm">
            <MapPinIcon className="h-4 w-4 ml-1 mt-1" />
            <span>{cafe.address}</span>
          </div>
        )}
        <div className="text-xs mt-3">
          <p className="font-myIranSansFaNumBold text-xs mb-1">توضیحات</p>
          <p className="line-clamp-2 text-justify">
            <ReactMarkdown>{cafe.description}</ReactMarkdown>
          </p>
        </div>
      </div>
    </Link>
  );
};

const AllCafes: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // React Query for fetching cafes
  const {
    data,
    isLoading,
    isError,
    error,
    isPlaceholderData
  } = useQuery({
    queryKey: ['cafes', currentPage, pageSize],
    queryFn: () => fetchCafes(currentPage, pageSize),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
  });

  const cafes = data?.cafes || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(newPage);
  };

  // Pagination numbers
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
              خطا در بارگذاری کافه‌ها: {error?.message}
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
          <h1 className="text-xl font-myIranSansFaNumBold mb-6 mt-12">همه کافه‌ها</h1>

          {isLoading ? (
            <div className="text-center py-20">در حال بارگذاری...</div>
          ) : isPlaceholderData ? (
            <div className="text-center py-20">
              <div className="text-gray-500 text-lg">در حال بارگذاری صفحه جدید...</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cafes.map((cafe) => (
                  <CafeCard key={cafe.id} cafe={cafe} />
                ))}
              </div>

              {cafes.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                  هیچ کافه‌ای یافت نشد
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center font-myIranSansFaNumRegular">
                  <nav className="flex items-center gap-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>

                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === page
                            ? "bg-green-100 text-green-700 font-myIranSansFaNumBold"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
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

export default AllCafes;