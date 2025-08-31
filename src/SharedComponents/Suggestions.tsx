import React, { useState, useRef } from 'react';
import mikhak from "../assets/images/photo_2025-04-24_14-34-47.jpg";
import coolooche from "../assets/images/1683380710_43_شیرینی-های-استان-گیلان.png";
import special from "../assets/icons/boat_1728590.png";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import left from "../assets/icons/Icon.svg";

const destinations = [
  {
    id: 1,
    name: 'شیرینی میخک',
    image: mikhak,
    rating: 4.5,
  },
  ...Array.from({ length: 9 }, (_, i) => ({
    id: i + 2,
    name: 'کلوچه فومن',
    image: coolooche,
    rating: 4.7,
  })),
];

const Suggestions = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const destinationsPerPage = 6;
  const totalItems = destinations.length;

  const scrollPrev = () => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollNext = () => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(totalItems - destinationsPerPage, prev + 1));
  };

  const showPreviousButton = currentIndex > 0;
  const showNextButton = currentIndex < totalItems - destinationsPerPage;
  const visibleDestinations = destinations.slice(currentIndex, currentIndex + destinationsPerPage);

  const renderRating = (rating: number) => (
    <div className="flex items-center">
      <div className="flex flex-row-reverse">
        {[1, 2, 3, 4, 5].map((i) => {
          if (i <= Math.floor(rating)) {
            return <div key={i} className="h-3 w-3 bg-lootka-darkGreen rounded-full mr-1" />;
          } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            const decimalPart = rating % 1;
            return (
              <div key={i} className="h-3 w-3 relative mr-1">
                <div className="absolute inset-0 bg-gray-300 rounded-full"></div>
                <div
                  className="absolute inset-0 bg-lootka-darkGreen rounded-full"
                  style={{
                    clipPath: `inset(0 ${100 - decimalPart * 100}% 0 0)`,
                  }}
                ></div>
              </div>
            );
          } else {
            return <div key={i} className="h-3 w-3 bg-gray-300 rounded-full mr-1" />;
          }
        })}
      </div>
      <span className="mr-1 text-sm">{rating}</span>
    </div>
  );

  return (
    <div className="flex flex-col py-12">
      <div className="w-full px-4 sm:px-6 lg:px-1">
        {/* Header */}
        <div className="flex flex-row justify-between items-center mb-6">
          <span className="flex flex-row items-center gap-1">
            <img src={special} className="w-8 h-8" alt="Special icon" />
            <h2 className="desktop:text-3xl tablet:text-2xl text-base font-myIranSansFaNumBold">لوتکا سواری</h2>
          </span>
          <h2 className="flex flex-row items-center gap-1 font-myYekanRegular desktop:text-md tablet:text-base text-sm mb-1">
            مشاهده همه
            <img src={left} className="w-3 h-3" alt="Arrow" />
          </h2>
        </div>

        {/* Mobile view */}
        <div className="relative md:hidden">
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200 ml-2"
            aria-label="Previous"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 hover:bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200 mr-2"
            aria-label="Next"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide space-x-6 rtl:space-x-reverse scroll-smooth"
          >
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="group flex-shrink-0 w-40 sm:w-52 rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-60 sm:h-52 object-cover transition-opacity duration-300 rounded-lg group-hover:opacity-70"
                  />
                </div>
                <div className="pr-1 pt-1 text-black">
                  <h3 className="text-md font-myIranSansMedium group-hover:underline transition duration-300">
                    {destination.name}
                  </h3>
                  {renderRating(destination.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop view */}
        <div className="hidden md:block relative">
          {totalItems > destinationsPerPage && (
            <>
              {showPreviousButton && (
                <button
                  onClick={handlePrevious}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black text-black hover:bg-black hover:text-white"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              )}
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
                    {renderRating(destination.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hide scrollbars */}
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

export default Suggestions;
