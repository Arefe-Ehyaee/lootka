// src/pages/AllRestaurants.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import NoImg from '../assets/images/no-image-icon-23485.png';
import ReactMarkdown from 'react-markdown';
import Navbar from './Navbar';
import Footer from './Footer';
import starGreen from "../assets/icons/StarGreen.svg";
const BASE_URL = "http://82.115.25.241:2000";

interface Restaurant {
    id: string;
    name: string;
    Rate: number;
    ImgName: string;
    address?: string;
    opening_hours: { all_day?: string | null };
    description: string;
    sub_category: string;
}

const AllRestaurants: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const fetchRestaurants = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `${BASE_URL}/places?page=${currentPage}&limit=${pageSize}&sub_category=${encodeURIComponent("رستوران")}`
                );

                const json = await res.json();

                const formatted = json.data.map((item: any) => ({
                    id: item.place_id,
                    name: item.name,
                    Rate: item.rating || 0,
                    ImgName: item.image_names?.[1] || item.image_names?.[0] || 'NaN',
                    address: item.address,
                    opening_hours: item.opening_hours,
                    description: item.description,
                }));

                setRestaurants(formatted);

                if (json.total) {
                    setTotalPages(Math.ceil(json.total / pageSize));
                } else {
                    const hasMore = json.data.length === pageSize;
                    setTotalPages(hasMore ? currentPage + 1 : currentPage);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, [currentPage]);


    const getImageUrl = (img: string) =>
        !img || img === 'NaN' ? NoImg : `${BASE_URL}/download-image/${img}`;

    const handlePageChange = (newPage: number) => {
        window.scrollTo(0, 0);
        setCurrentPage(newPage);
    };

    // Generate page numbers for pagination
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

    return (
        <div className="min-h-screen min-w-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-3">
                <div className="p-4 md:p-10">
                    <h1 className="text-xl font-myIranSansFaNumBold mb-6">همه رستوران‌ها</h1>

                    {loading ? (
                        <div className="text-center py-20">در حال بارگذاری...</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {restaurants.map(restaurant => (
                                    <Link
                                        to={`/places/${restaurant.id}`}
                                        key={restaurant.id}
                                        className="group border rounded-lg overflow-hidden hover:shadow-lg transition"
                                    >
                                        <img
                                            src={getImageUrl(restaurant.ImgName)}
                                            alt={restaurant.name}
                                            className="w-full h-60 object-cover group-hover:brightness-75 transition"
                                        />
                                        <div className="p-3">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-lg font-myIranSansMedium">{restaurant.name}</h2>
                                                <div className='bg-[#EDF9F3] border border-green-100 text-[#1BA75E] rounded-lg text-base font-myIranSansFaNumRegular flex flex-row items-center gap-2 px-1'>
                                                    {(restaurant.Rate)}
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
                                ))}
                            </div>

                            {/* Pagination Controls */}
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
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AllRestaurants;