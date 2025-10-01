import React from 'react';
import { MapPinIcon, ClockIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import insta from "../assets/icons/Social Icons.svg";
import phone from "../assets/icons/phone-call-01.svg";

interface Restaurant {
address?: string;
opening_hours: string;
phone?: string;
website?: string;
instagram?: string;
mealTime?: string[];
food_types?: string[];
sub_category: string;
}

interface RestaurantInfoProps {
restaurant: Restaurant;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ restaurant }) => {
return ( <div className="mt-4 sm:mt-12"> <div className="space-y-4 text-sm sm:text-base font-myYekanFaNumRegular">

    {/* Phone */}
    {restaurant.phone && (
      <div className="flex items-center">
        <img
          src={phone}
          alt="phone"
          className="h-5 w-5 ml-2 flex-shrink-0 transform -scale-x-100"
        />
        <a href={`tel:${restaurant.phone}`} className="hover:underline">
          {restaurant.phone}
        </a>
      </div>
    )}

    {/* Opening Hours */}
    {restaurant.opening_hours && (
      <div className="flex items-center" dir="rtl">
        <ClockIcon className="h-5 w-5 ml-1 flex-shrink-0" />
        <span>{restaurant.opening_hours}</span>
      </div>
    )}

    {/* Address */}
    {restaurant.address && (
      <div className="flex items-start">
        <MapPinIcon className="h-5 w-5 ml-1 mt-1 flex-shrink-0" />
        <span>{restaurant.address}</span>
      </div>
    )}

    {/* Socials and Website */}
    <div className="flex flex-row items-center gap-4">
      {restaurant.instagram && (
        <div className="flex items-center">
          <img src={insta} alt="instagram" className="h-4 w-4 ml-2" />
          <a
            href={
              restaurant.instagram.startsWith('http')
                ? restaurant.instagram
                : `https://instagram.com/${restaurant.instagram.replace(/^@/, '')}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            اینستاگرام
          </a>
        </div>
      )}

      {restaurant.website && (
        <div className="flex items-center">
          <GlobeAltIcon className="h-5 w-5 ml-2" />
          <a
            href={restaurant.website.startsWith('http') ? restaurant.website : `https://${restaurant.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            وبسایت
          </a>
        </div>
      )}
    </div>
  </div>
</div>


);
};

export default RestaurantInfo;
