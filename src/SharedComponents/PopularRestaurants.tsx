import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import NoImg from '../assets/images/no-image-icon-23485.png';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import left from "../assets/icons/Icon.svg"
// const BASE_URL = process.env.FRONT_API_URL;
const BASE_URL = "http://91.216.104.26:5000";

interface Restaurant {
  id: string;
  Name: string;
  OurDescription: string;
  Rate: number;
  Reviews: number;
  Address: string;
  Hours: string;
  Phone: string;
  Website: string;
  ImgName: string;
  Menu: any[];
  Cuisine: string;
  Price: string;
  Latitude: number;
  Longitude: number;
  sub_category: string;
}

const PopularRestaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Track the starting index of the visible cards
  const restaurantsPerPage = 6;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/restaurants`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }

        const data = await response.json();
        setRestaurants(data.response || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching restaurants');
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const totalCards = restaurants.length;

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1)); // Move one card back
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(totalCards - restaurantsPerPage, prev + 1)); // Move one card forward
  };

  // Calculate if buttons should be shown
  const showPreviousButton = currentIndex > 0;
  const showNextButton = currentIndex < totalCards - restaurantsPerPage;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lootka-green"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
      </div>
    );
  }

  // Get the current visible restaurants based on the current index
  const visibleRestaurants = restaurants.slice(currentIndex, currentIndex + restaurantsPerPage);

  return (
    <div className="mt-10">
      <div className='flex flex-row items-center justify-between'>
        <h2 className="text-3xl font-myIranSansFaNumBold mb-6">خوردنی‌</h2>
        <h2 className="flex flex-row items-center gap-1 text-md mb-1">مشاهده همه
          <img src={left} className='w-3 h-3'></img>
        </h2>
      </div>
      <div className="relative">
        {totalCards > restaurantsPerPage && (
          <>
            {/* Only show previous button when not at the first index */}
            {showPreviousButton && (
              <button
                onClick={handlePrevious}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 flex items-center justify-center w-10 h-10 rounded-full  bg-white border border-black text-black hover:bg-black hover:text-white"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            )}

            {/* Only show next button when not at the last set of items */}
            {showNextButton && (
              <button
                onClick={handleNext}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 flex items-center justify-center w-10 h-10 rounded-full  bg-white border border-black text-black hover:bg-black hover:text-white"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
            )}
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {visibleRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/restaurant/${encodeURIComponent(restaurant.Name)}`}
              className="block group"
            >
              <div className="overflow-hidden">
                <img
                  src={
                    restaurant.ImgName && restaurant.ImgName !== 'NaN'
                      ? `${BASE_URL}/images/${restaurant.ImgName}`
                      : NoImg
                  }
                  alt={restaurant.Name}
                  className="w-full h-60 object-cover transition rounded-lg duration-300 group-hover:brightness-75"
                />
                <div className="p-1">
                  <h3 className="text-md font-myIranSansMedium mb-1 group-hover:underline">{restaurant.Name}</h3>
                  <div className='flex flex-row items-center gap-1'>
                    <span className=' text-sm'>{restaurant.Rate}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => {
                        const rating = restaurant.Rate || 0;
                        if (i <= Math.floor(rating)) {
                          // Full circle for whole numbers
                          return <div key={i} className="h-3 w-3 bg-lootka-blue rounded-full ml-1" />;
                        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                          // Partial circle for decimal part
                          const decimalPart = rating % 1;
                          return (
                            <div key={i} className="h-3 w-3 relative ml-1">
                              {/* Background circle (empty) */}
                              <div className="absolute inset-0 bg-gray-300 rounded-full"></div>
                              {/* Foreground circle (filled) with clip-path for partial filling - RTL direction */}
                              <div
                                className="absolute inset-0 bg-lootka-blue rounded-full"
                                style={{
                                  clipPath: `inset(0 0 0 ${100 - (decimalPart * 100)}%)`
                                }}
                              ></div>
                            </div>
                          );
                        } else {
                          // Empty circle
                          return <div key={i} className="h-3 w-3 bg-gray-300 rounded-full ml-1" />;
                        }
                      })}
                    </div>
                  </div>

                  {/* <p className="text-gray-600 text-sm mb-2 text-justify truncate">{restaurant.OurDescription}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{restaurant.Price}</span>
                    <span className="text-gray-600">{restaurant.Cuisine}</span>
                  </div> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularRestaurants;