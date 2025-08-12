import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import edit from "../assets/icons/pencil-01.svg";
import share from "../assets/icons/share-01.svg";

interface Restaurant {
  name: string;
  rating?: number;
  sub_category: string;
}

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center ml-2">
        {[1, 2, 3, 4, 5].map((star) => {
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
        })}
      </div>
      <span className="font-myIranSansFaNumMedium text-sm sm:text-base">{rating}</span>
    </div>
  );
};

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurant }) => {
  return (
    <div className="mb-3">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className='flex flex-row justify-between items-center'>
          <h1 className="desktop:text-3xl tablet:text-xl text-xl font-myIranSansMedium text-black">
            {restaurant.name}
          </h1>
          <div className="flex items-center mr-3">
            {restaurant.rating && <StarRating rating={restaurant.rating} />}
          </div>
        </div>

        <div className="flex items-center justify-center sm:justify-end space-x-1 space-x-reverse text-xs sm:text-sm font-myIranSansMedium">
          <button className="flex items-center text-black px-1 sm:px-2 py-1">
            <img src={share} alt="" className='w-3 h-3 sm:w-4 sm:h-4 ml-1' />
            <span>اشتراک گذاری</span>
          </button>

          <button className="flex items-center text-black px-1 sm:px-2 py-1">
            <img src={edit} alt="" className='w-3 h-3 sm:w-4 sm:h-4 ml-1' />
            <span>ثبت نظر</span>
          </button>

          <button className="flex items-center bg-white text-black hover:bg-gray-100 border border-gray-300 rounded-full px-1 sm:px-2 py-1">
            <HeartIcon className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
            <span>ذخیره</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;