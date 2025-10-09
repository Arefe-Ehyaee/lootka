import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import heart from "../assets/icons/heart-rounded.svg";
import starGreen from "../assets/icons/StarGreen.svg";
import NoImg from "../assets/images/no-image-icon-23485.png";

interface PlaceCardProps {
  place: {
    id: string;
    name: string;
    Rate: number;
    ImgName?: string;
    address?: string;
    opening_hours?: string;
    description?: string;
  };
  getImageUrl?: (img: string) => string;
  type?: "restaurant" | "attraction";
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, getImageUrl, type }) => {
  const getCurrentImage = () => {
    if (!place.ImgName || place.ImgName === 'NaN') {
      return getImageUrl ? getImageUrl('NaN') : NoImg;
    }
    return getImageUrl ? getImageUrl(place.ImgName) : place.ImgName;
  };

  // ✅ Helper: valid opening hours check
  const hasOpeningHours =
    place.opening_hours &&
    place.opening_hours.toLowerCase() !== "string";

  return (
    <Link
      to={`/places/${place.id}`}
      className={`group rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 bg-white ${type === "restaurant" || type === "attraction"
        ? "w-64 sm:w-72 md:w-80 flex-shrink-0"
        : "w-full"
        }`}
    >

      <div className="overflow-hidden relative">
        {/* Image Section */}
        <div className="relative">
          <img
            src={getCurrentImage()}
            alt={place.name}
            className="w-full h-48 sm:h-52 md:h-[250px] border border-b-none object-cover rounded-lg rounded-b-none transition-opacity duration-300 group-hover:brightness-75"
          />
          <img src={heart} alt="" className="absolute top-3 right-1" />
        </div>

        {/* Mobile */}
        <div
          className={`md:hidden p-[16px] text-black rounded-lg rounded-t-none border border-t-0 ${hasOpeningHours ? "h-[150px]" : "h-[130px]"
            }`}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-myYekanDemibold line-clamp-1">
              {place.name}
            </h3>
            <div className="text-[#1BA75E] font-myYekanFaNumRegular rounded-lg text-sm flex items-center gap-1">
              <img src={starGreen} alt="" className="w-4 h-4 pb-1" />
              {place.Rate}
            </div>
          </div>

          {/* 🔹 Opening hours (only if valid) */}
          {hasOpeningHours && (
            <div className="flex items-center text-xs mt-2" dir="rtl">
              <ClockIcon className="h-3 w-3 ml-1 " />
              <div className="line-clamp-1 font-myYekanFaNumRegular truncate">
                {place.opening_hours}
              </div>
            </div>
          )}

          {/* 🔹 Address */}
          {place.address && (
            <div className="flex items-start text-xs mt-1">
              <MapPinIcon className="h-3 w-3 ml-1 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1 font-myYekanFaNumRegular">
                {place.address}
              </span>
            </div>
          )}

          {/* 🔹 Description */}
          <div className="text-[8px] pb-1 mt-2">
            <p className="text-justify font-myIranSansMedium line-clamp-3">
              <ReactMarkdown>{place.description || ""}</ReactMarkdown>
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div
          className={`hidden md:block p-[16px] text-black rounded-lg rounded-t-none border border-t-0 ${hasOpeningHours ? "h-[170px]" : "h-[150px]"
            }`}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-[18px] font-myYekanDemibold line-clamp-1">
              {place.name}
            </h3>
            <div className="text-[#1BA75E] font-myYekanFaNumRegular rounded-lg text-base flex items-center gap-1 px-1">
              <img src={starGreen} alt="" className="w-4 h-4 pb-1" />
              {place.Rate}
            </div>
          </div>

          {/* 🔹 Opening hours (only if valid) */}
          {hasOpeningHours && (
            <div
              className="flex items-start text-sm mt-4 font-myYekanFaNumRegular"
              dir="rtl"
            >
              <ClockIcon className="h-4 w-4 ml-1 flex-shrink-0" />
              <div className="truncate w-full">{place.opening_hours}</div>
            </div>
          )}


          {/* 🔹 Address */}
          {place.address && (
            <div className="flex items-start text-sm mt-1">
              <MapPinIcon className="h-4 w-4 ml-1 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1 font-myYekanFaNumRegular">
                {place.address}
              </span>
            </div>
          )}

          {/* 🔹 Description */}
          <div className="text-[10px] pb-2 mt-2 flex items-end justify-between font-myYekanFaNumRegular">
            <p className="text-justify line-clamp-3">
              <ReactMarkdown>{place.description || ""}</ReactMarkdown>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
