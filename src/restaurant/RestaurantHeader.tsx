import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import edit from "../assets/icons/pencil-01.svg";
import share from "../assets/icons/share-01.svg";

interface Restaurant {
  name: string;
  rate?: number;
  sub_category: string;
}

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center ml-2">
        {/* {[1, 2, 3, 4, 5].map((star) => {
          if (star <= Math.floor(rating)) {
            return (
              <StarIconSolid key={star} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
            );
          } else if (star === Math.ceil(rating) && rating % 1 !== 0) {
            return (
              <div key={star} className="relative h-4 w-4 sm:h-5 sm:w-5">
                <StarIcon className="absolute h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
                <div className="absolute overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                  <StarIconSolid className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                </div>
              </div>
            );
          } else {
            return (
              <StarIcon key={star} className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
            );
          }
        })} */}


         <StarIconSolid className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
      </div>
      <span className="font-myYekanFaNumMedium text-sm sm:text-base">{rating}/5</span>
    </div>
  );
};

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurant }) => {
  return (
    <div className="mb-3">
      <div className="flex flex-row flex-row justify-between sm:items-center gap-3">
        <div className='flex flex-row justify-between items-center'>
          <h1 className="desktop:text-3xl tablet:text-xl text-[20px] font-myYekanFaNumDemiBold text-black">
            {restaurant.name}
          </h1>
          <div className="flex items-center mr-3 text-xs sm:text-lg">
            {restaurant.rate && <StarRating rating={restaurant.rate} />}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-1 space-x-reverse text-xs sm:text-sm font-myYekanFaNumMedium">
          <button className="flex items-center text-black px-1 sm:px-2 py-1">
            <img src={share} alt="" className='w-4 h-4 ml-1' />
            <span className='hidden sm:block'>اشتراک گذاری</span>
          </button>

          <button className="flex items-center text-black px-1 sm:px-2 py-1">
            <img src={edit} alt="" className='w-4 h-4 ml-1' />
            <span className='hidden sm:block'>ثبت نظر</span>
          </button>

          <button className="flex items-center text-black">
            <HeartIcon className="h-4 w-4 ml-1" />
            <span className='hidden sm:block'>افزودن به علاقه‌مندی‌</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;