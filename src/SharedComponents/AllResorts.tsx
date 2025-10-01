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

interface Hostel {
  id: string;
  name: string;
  Rate: number;
  ImgName: string;
  image_names?: string[]; // multiple photos
  address?: string;
  opening_hours: { all_day?: string | null };
  description: string;
}

// React Query functions
const fetchImagesForHostel = async (placeId: string): Promise<string[]> => {
  try {
    const res = await fetch(`${BASE_URL}/entity_images/place/${placeId}`);
    if (!res.ok) throw new Error('Failed to fetch images');
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

const fetchHostels = async (page: number, pageSize: number) => {
  const res = await fetch(
    `${BASE_URL}/places/?page=${page}&limit=${pageSize}&sub_category=${encodeURIComponent("اقامتگاه")}`
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch hostels');
  }
  
  const json = await res.json();
  
  // Fetch images for all hostels in parallel
  const formatted: Hostel[] = await Promise.all(
    json.data.map(async (item: any) => {
      const images = await fetchImagesForHostel(item.place_id);
      
      return {
        id: item.place_id,
        name: item.name,
        Rate: item.rate || 0,
        ImgName: images[0] || 'NaN',
        image_names: images,
        address: item.address,
        opening_hours: item.opening_hours,
        description: item.description,
      };
    })
  );
  
  return {
    hostels: formatted,
    totalPages: json.total ? Math.ceil(json.total / pageSize) : 
               (json.data.length === pageSize ? page + 1 : page)
  };
};

const HostelCard: React.FC<{ hostel: Hostel }> = ({ hostel }) => {
  const getImage = () => {
    if (hostel.image_names?.length) {
      return hostel.image_names[0];
    }
    return hostel.ImgName === 'NaN' ? NoImg : hostel.ImgName;
  };

  return (
    <Link
      to={`/places/${hostel.id}`}
      className="group border rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      {/* Single Image Display */}
      <div className="relative">
        <img
          src={getImage()}
          alt={hostel.name}
          className="w-full h-60 object-cover group-hover:brightness-75 transition"
        />
      </div>

      {/* Card Info */}
      <div className="p-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-myYekanFaNumMedium">{hostel.name}</h2>
          <div className='font-myYekanFaNumRegular text-[#1BA75E] rounded-lg text-base flex flex-row items-center gap-2 px-1'>
            {hostel.Rate}
            <img src={starGreen} alt="" className='w-4 h-4 mb-1' />
          </div>
        </div>

        {hostel.address && (
          <div className="flex items-center mt-2 mb-2 text-sm font-myYekanFaNumRegular">
            <MapPinIcon className="h-4 w-4 ml-1 shrink-0" />
            <span className="line-clamp-1 grow">{hostel.address}</span>
          </div>
        )}

        <div className="text-[10px] pb-2 flex flex-row items-end justify-between font-myYekanFaNumRegular">
          <p className="text-justify line-clamp-3">
            <p className="font-myYekanFaNumDemiBold text-xs mb-1 mt-2">توضیحات</p>
            <ReactMarkdown>{hostel.description}</ReactMarkdown>
          </p>
          <button>
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

const AllResorts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // React Query for fetching hostels
  const {
    data,
    isLoading,
    isError,
    error,
    isPlaceholderData
  } = useQuery({
    queryKey: ['hostels', currentPage, pageSize],
    queryFn: () => fetchHostels(currentPage, pageSize),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
  });

  const hostels = data?.hostels || [];
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
              خطا در بارگذاری اقامتگاه‌ها: {error?.message}
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
          <h1 className="text-xl font-myYekanFaNumDemiBold mb-6 mt-12">همه اقامتگاه ها</h1>

          {isLoading ? (
            <div className="text-center py-20 font-myYekanFaNumMedium">در حال بارگذاری...</div>
          ) : isPlaceholderData ? (
            <div className="text-center py-20">
              <div className="text-gray-500 text-lg font-myYekanFaNumMedium">در حال بارگذاری صفحه جدید...</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hostels.map(h => (
                  <HostelCard key={h.id} hostel={h} />
                ))}
              </div>

              {hostels.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                  هیچ اقامتگاهی یافت نشد
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center font-myYekanFaNumDemiBold">
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
                          ? 'bg-green-100 text-green-700 font-myYekanFaNumDemiBold'
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

export default AllResorts;