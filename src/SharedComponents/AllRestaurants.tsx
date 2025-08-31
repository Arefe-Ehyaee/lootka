import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import NoImg from '../assets/images/no-image-icon-23485.png';
import ReactMarkdown from 'react-markdown';
import Navbar from './Navbar';
import Footer from './Footer';
import starGreen from "../assets/icons/StarGreen.svg";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Restaurant {
    id: string;
    name: string;
    Rate: number;
    ImgName: string;
    address?: string;
    opening_hours: { all_day?: string | null };
    description: string;
    sub_category: string;
    image_ids?: string[];
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

const fetchRestaurants = async (page: number, pageSize: number) => {
    const res = await fetch(
        `${BASE_URL}/places?page=${page}&limit=${pageSize}&sub_category=${encodeURIComponent("رستوران")}`
    );
    
    if (!res.ok) {
        throw new Error('Failed to fetch restaurants');
    }
    
    const json = await res.json();
    
    // Fetch images for all restaurants in parallel
    const formatted: Restaurant[] = await Promise.all(
        json.data.map(async (item: any) => {
            const imageIds = await fetchImageFilenames(item.place_id);
            
            return {
                id: item.place_id,
                name: item.name,
                Rate: item.rate || 0,
                ImgName: item.image_names?.[0] || 'NaN',
                address: item.address,
                opening_hours: item.opening_hours,
                description: item.description,
                sub_category: item.sub_category,
                image_ids: imageIds,
            };
        })
    );
    
    return {
        restaurants: formatted,
        totalPages: json.total ? Math.ceil(json.total / pageSize) : 
                   (json.data.length === pageSize ? page + 1 : page)
    };
};

const getImageUrl = (idOrFilename: string) =>
    !idOrFilename || idOrFilename === 'NaN'
        ? NoImg
        : `${BASE_URL}/images/${idOrFilename}`;

/** RestaurantCard with image state management */
const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const imageList = restaurant.image_ids?.length
        ? restaurant.image_ids
        : [restaurant.ImgName];
    const imageCount = imageList.length;

    return (
        <Link
            to={`/places/${restaurant.id}`}
            className="group border rounded-lg overflow-hidden hover:shadow-lg transition"
        >
            <div className="relative">
                <img
                    src={getImageUrl(imageList[currentImage])}
                    alt={restaurant.name}
                    className="w-full h-60 object-cover group-hover:brightness-75 transition"
                />

                {imageCount > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentImage((prev) => (prev - 1 + imageCount) % imageCount);
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentImage((prev) => (prev + 1) % imageCount);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>

                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {imageList.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`w-2 h-2 rounded-full ${idx === currentImage ? 'bg-white' : 'bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="p-3">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-myIranSansMedium">{restaurant.name}</h2>
                    <div className='bg-[#EDF9F3] font-myIranSansFaNumRegular border border-green-100 text-[#1BA75E] rounded-lg text-base font-myIranSansFaNumRegular flex flex-row items-center gap-2 px-1'>
                        {restaurant.Rate}
                        <img src={starGreen} alt="" className='w-4 h-4' />
                    </div>
                </div>
                {restaurant.opening_hours?.all_day && (
                    <div className="flex items-center text-sm mt-2">
                        <ClockIcon className="h-4 w-4 ml-1" />
                        {restaurant.opening_hours.all_day}
                    </div>
                )}
                {restaurant.address && (
                    <div className="flex items-start mt-1 text-sm">
                        <MapPinIcon className="h-4 w-4 ml-1 mt-1" />
                        <span>{restaurant.address}</span>
                    </div>
                )}
                <div className="text-xs mt-3">
                    <p className="font-myIranSansFaNumBold text-xs mb-1">توضیحات</p>
                    <p className="line-clamp-2 text-justify">
                        <ReactMarkdown>{restaurant.description}</ReactMarkdown>
                    </p>
                </div>
            </div>
        </Link>
    );
};

const AllRestaurants: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // React Query for fetching restaurants
    const {
        data,
        isLoading,
        isError,
        error,
        isPlaceholderData
    } = useQuery({
        queryKey: ['restaurants', currentPage, pageSize],
        queryFn: () => fetchRestaurants(currentPage, pageSize),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
        placeholderData: (previousData) => previousData, // Keep previous data while fetching new page
        refetchOnWindowFocus: false, // Prevent unnecessary refetches
    });

    const restaurants = data?.restaurants || [];
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
                            خطا در بارگذاری رستوران‌ها: {error?.message}
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
                    <h1 className="text-xl font-myIranSansFaNumBold mb-6 mt-12">همه رستوران‌ها</h1>

                    {isLoading ? (
                        <div className="text-center py-20">در حال بارگذاری...</div>
                    ) : isPlaceholderData ? (
                        <div className="text-center py-20">
                            <div className="text-gray-500 text-lg">در حال بارگذاری صفحه جدید...</div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {restaurants.map(restaurant => (
                                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                                ))}
                            </div>

                            {restaurants.length === 0 && (
                                <div className="text-center py-20 text-gray-500">
                                    هیچ رستورانی یافت نشد
                                </div>
                            )}

                            {/* Pagination */}
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

export default AllRestaurants;