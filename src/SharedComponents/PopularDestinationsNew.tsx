import React, { useState, useRef } from 'react';
import shahrdari from "../assets/images/20180615-205636-largejpg.jpg"
import baazar from "../assets/images/rasht-great-bazaar.jpg"
import mellat from "../assets/images/photo0jpg.jpg"
import saghalaksar from "../assets/images/saalaksar-dike-the-lake.jpg"
import parkeShahr from "../assets/images/Sights_Rasht_ParkeShahr_1.webp.jpg"
import sabzeMeydan from "../assets/images/Sights_Rasht_SabzeMeydan_1.jpg"
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import left from "../assets/icons/Icon.svg"

const destinations = [
  {
    id: 1,
    name: 'میدان شهرداری',
    image: shahrdari,
    rating: 4.5
  },
  {
    id: 2,
    name: 'بازار بزرگ رشت',
    image: baazar,
    rating: 4.7
  },
  {
    id: 3,
    name: 'پارک ملت',
    image: mellat,
    rating: 4.6
  },
  {
    id: 4,
    name: 'دریاچه سقالکسار',
    image: saghalaksar,
    rating: 4.6
  },
  {
    id: 5,
    name: 'پارک شهر',
    image: parkeShahr,
    rating: 4.6
  },
  {
    id: 6,
    name: 'سبز میدان',
    image: sabzeMeydan,
    rating: 4.6
  },
  {
    id: 7,
    name: 'سبز میدان',
    image: sabzeMeydan,
    rating: 4.6
  },
];

const PopularDestinationsNew = () => {
  // Properly type the ref as HTMLDivElement
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const destinationsPerPage = 6;
  const totalItems = destinations.length;

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1)); // Move one card back
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(totalItems - destinationsPerPage, prev + 1)); // Move one card forward
  };

  // Get the current visible destinations based on the current index
  const visibleDestinations = destinations.slice(currentIndex, currentIndex + destinationsPerPage);

  // Calculate if buttons should be shown
  const showPreviousButton = currentIndex > 0;
  const showNextButton = currentIndex < totalItems - destinationsPerPage;

  return (
    <div className="flex flex-col py-12">
      <div className="w-full px-4 sm:px-6 lg:px-1">
        {/* Mobile view with wrapper for positioning buttons */}
        <div className="relative md:hidden">
          {/* Previous button positioned on left side */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200 ml-2"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button positioned on right side */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200 mr-2"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable container with increased spacing */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide space-x-6 rtl:space-x-reverse scroll-smooth"
          >
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="group flex-shrink-0 w-40 sm:w-52 rounded-lg overflow-hidden"
              >

                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-60 sm:h-52 object-cover transition-opacity duration-300 rounded-lg group-hover:opacity-70"
                />


                <div className="pr-1 pt-0 text-black">
                  <h3 className="text-md font-myIranSansMedium group-hover:underline transition duration-300">
                    {destination.name}
                  </h3>
                  <div className="flex items-center">
                    <SolidStarIcon className="h-4 w-4 text-yellow-400" />
                    <SolidStarIcon className="h-4 w-4 text-yellow-400" />
                    <SolidStarIcon className="h-4 w-4 text-yellow-400" />
                    <SolidStarIcon className="h-4 w-4 text-yellow-400" />
                    <SolidStarIcon className="h-4 w-4 text-yellow-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop view with next/prev buttons similar to PopularRestaurants */}
        <div className='flex flex-row items-center justify-between'>
        <h2 className="text-3xl font-myIranSansFaNumBold mb-3">دیدنی های رشت</h2>
        <h2 className="flex flex-row items-center gap-1 text-md mb-1">مشاهده همه
        <img src={left} className='w-3 h-3'></img>
        </h2>
      </div>

        <div className="hidden md:block relative">
          {totalItems > destinationsPerPage && (
            <>
              {/* Only render the previous button if not at the first index */}
              {showPreviousButton && (
                <button
                  onClick={handlePrevious}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black text-black hover:bg-black hover:text-white"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              )}
              
              {/* Only render the next button if not at the last set of items */}
              {showNextButton && (
                <button
                  onClick={handleNext}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black text-black hover:bg-black hover:text-white"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
              )}
            </>
          )}

          {/* Changed from gap-0 to gap-8 to match restaurants component */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {visibleDestinations.map((destination) => (
              <div key={destination.id} className="group block">
                <div className="overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-60 object-cover transition duration-300 rounded-lg group-hover:brightness-75"
                  />
                  <div className="pt-1">
                    <h3 className="text-md font-myIranSansMedium group-hover:underline transition duration-300">
                      {destination.name}
                    </h3>
                    <div className="flex items-center">
                      <SolidStarIcon className="h-4 w-4 text-yellow-400" />
                      <SolidStarIcon className="h-4 w-4 text-yellow-400" />
                      <SolidStarIcon className="h-4 w-4 text-yellow-400" />
                      <SolidStarIcon className="h-4 w-4 text-yellow-400" />
                      <SolidStarIcon className="h-4 w-4 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='hidden md:block w-1/3'>
      </div>

      {/* Custom styling for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PopularDestinationsNew;