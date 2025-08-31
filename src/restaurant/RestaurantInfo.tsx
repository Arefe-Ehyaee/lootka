import React from 'react';
import { MapPinIcon, ClockIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import insta from "../assets/icons/Social Icons.svg";
import phone from "../assets/icons/phone-call-01.svg";
import check from "../assets/icons/check.svg";

interface OpeningHours {
    monday?: string | null;
    tuesday?: string | null;
    wednesday?: string | null;
    thursday?: string | null;
    friday?: string | null;
    saturday?: string | null;
    sunday?: string | null;
    all_day: string | null;
}

interface Restaurant {
    address?: string;
    opening_hours: OpeningHours;
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
    return (
        <div className="flex flex-row gap-1 mb-6">
            <div className="">
                <div className="text-sm sm:text-base font-myYekanFaNumRegular">
                    <h2 className="text-lg sm:text-xl font-myYekanFaNumDemiBold mb-3 sm:mb-4">در یک نگاه</h2>

                    <div className='flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-14'>
                        <div className=''>
                            {restaurant.address && (
                                <div className="flex items-start mb-2 sm:mb-3">
                                    <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 ml-1 mt-1 flex-shrink-0" />
                                    <span className="text-sm sm:text-base">{restaurant.address}</span>
                                </div>
                            )}

                            {restaurant.opening_hours.all_day && (
                                <div className="flex items-center mb-2 sm:mb-3" dir='rtl'>
                                    <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 ml-1 flex-shrink-0" />
                                    <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 font-myYekanFaNumRegular'>
                                        <div className="text-sm sm:text-base">ساعت کاری:</div>
                                        <div className="text-sm sm:text-base"> {restaurant.opening_hours.all_day} </div>
                                    </div>
                                </div>
                            )}

                            {restaurant.phone && (
                                <div className="flex items-center mb-2 sm:mb-3">
                                    <img src={phone} alt="" className="h-4 w-4 sm:h-5 sm:w-5 ml-2 flex-shrink-0 transform -scale-x-100" />
                                    <a href={`tel:${restaurant.phone}`} className="hover:underline text-sm sm:text-base">
                                        {restaurant.phone}
                                    </a>
                                </div>
                            )}

                            <div className='flex flex-col sm:flex-row sm:items-center justify-start gap-2 sm:gap-4'>
                                {restaurant.instagram && (
                                    <div className="flex items-center mb-2 sm:mb-3">
                                        <img src={insta} alt="" className='h-3 w-3 sm:h-4 sm:w-4 ml-2' />
                                        <a
                                            href={
                                                restaurant.instagram.startsWith('http')
                                                    ? restaurant.instagram
                                                    : `https://instagram.com/${restaurant.instagram.replace(/^@/, '')}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-sm sm:text-base"
                                        >
                                            Instagram
                                        </a>
                                    </div>
                                )}

                                {restaurant.website && (
                                    <div className="flex items-center mb-2 sm:mb-3">
                                        <GlobeAltIcon className='h-4 w-4 sm:h-5 sm:w-5 ml-2'></GlobeAltIcon>
                                        <a
                                            href={restaurant.website.startsWith('http') ? restaurant.website : `https://${restaurant.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-sm sm:text-base"
                                        >
                                            Website
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="">

                            <div className='flex flex-row gap-2 mb-3 sm:mb-4'>
                                <button className='border rounded-full border-black px-2 py-1 font-myYekanFaNumRegular text-sm desktop:w-[80px]'>تماس</button>
                                <button className='border rounded-full border-black px-2 py-1 font-myYekanFaNumRegular text-sm desktop:w-[80px]'>مسیریابی</button>
                            </div>
                            {/* Meal Times */}
                            {restaurant.mealTime && restaurant.mealTime.length > 0 && (
                                <div>
                                    <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                                        <img src={check} alt="" className='w-3 h-3 sm:w-4 sm:h-4 mt-0.5' />
                                        {restaurant.mealTime.map((meal, index) => (
                                            <span key={index} className="text-black text-sm sm:text-base">
                                                {meal}
                                                {index < restaurant.mealTime!.length - 1 && <span className="mx-1">-</span>}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Food Types */}
                            {restaurant.food_types && restaurant.food_types.length > 0 && (
                                <div className="">
                                    <div className="flex flex-wrap gap-2">
                                        <img src={check} alt="" className='w-3 h-3 sm:w-4 sm:h-4 mt-0.5' />
                                        {restaurant.food_types.map((type, index) => (
                                            <span key={index} className="text-black text-sm sm:text-base">
                                                {type}
                                                {index < restaurant.food_types!.length - 1 && <span className="mx-1">-</span>}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default RestaurantInfo;