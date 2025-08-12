import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import home from "../assets/icons/resort_701348.png";
import special from "../assets/icons/boat_1728590.png";
import food from "../assets/icons/cutlery_308556.png";
import nature from "../assets/icons/forest_5919779.png";
import star from "../assets/icons/camera_11255911.png";

type Category = 'attractions' | 'hotels' | 'restaurants' | 'lootka-suggestions' | 'specials' | 'nearMe';

const SearchBar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('attractions');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // prevent floating point issues
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 150;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);
    }
    return () => {
      if (el) el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  return (
    <div className="relative px-5 mt-10 " dir="ltr">
      {/* Left Arrow (shown on right in RTL) */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1 z-10 block sm:hidden bg-white"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-500" />
        </button>
      )}

      {/* Right Arrow (shown on left in RTL) */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1 z-10 block sm:hidden bg-white"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">
        <div
          ref={scrollRef}
          className="mt-4 flex gap-10 overflow-x-auto whitespace-nowrap flex-nowrap lg:flex-wrap justify-center scrollbar-hide scroll-smooth"
        >
          {[
            // { id: 'nearMe', label: 'نزدیک من', icon: map },
            { id: 'lootka-suggestions', label: 'لوتکا سواری', icon: special },
            { id: 'specials', label: 'تجربه خاص', icon: star },
            { id: 'hotels', label: 'موندنی', icon: home },
            { id: 'attractions', label: 'گشتنی و دیدنی', icon: nature },
            { id: 'restaurants', label: 'خوردنی', icon: food },

          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(id as Category)}
              className={`text-gray-600 hover:text-lootka-lightGreen flex items-center gap-2 ${selectedCategory === id ? 'text-lootka-darkGreen font-myIranSansFaNumBold' : ''
                }`}
            >
              {label}
              <img src={icon} className="w-7 h-7" alt={label} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
