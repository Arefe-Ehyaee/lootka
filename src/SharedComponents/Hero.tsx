import React, { useState } from 'react';
import heroAboutUs from '../assets/images/30669.webp';
import { ReactComponent as Magnifier } from "../assets/icons/Minimalistic Magnifer.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onAdventureClick?: () => void;
}

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Hero: React.FC<HeroProps> = ({ onAdventureClick }) => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    const queries = searchText
      .split(' ')
      .map((q) => q.trim())
      .filter(Boolean);

    if (queries.length === 0) return;

    setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/search/places_list/`, {
        params: { queries },
        paramsSerializer: (params) =>
          Object.entries(params)
            .map(([key, value]) =>
              Array.isArray(value)
                ? value.map((v) => `${key}=${encodeURIComponent(v)}`).join('&')
                : `${key}=${encodeURIComponent(value as string)}`
            )
            .join('&'),
      });

      const results = response.data || [];

      // Navigate to search results page with state
      navigate('/search-results', { state: { places: results } });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="relative w-full desktop:h-[693px] h-[283px]">
      {/* Hero Image */}
      <img
        src={heroAboutUs}
        alt="لوتکا، اولین پلتفرم بومی سفر به گیلان"
        className="w-full h-full object-cover"
        fetchpriority="high"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 flex flex-col justify-center items-center">
        <h1 className="text-[#000000] text-center desktop:text-[32px] tablet:text-[32px] text-[18px] font-myYekanMedium mb-4">
          لوتکا، اولین پلتفرم بومی سفر به گیلان
        </h1>

        {/* Search Input */}
        <div className="mt-4 desktop:mt-6 flex justify-center items-center w-full text-center">
          <div className="relative desktop:w-[500px] tablet:w-[500px] w-[300px]">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="جستجوی جاذبه‌های دیدنی، رستوران و اقامتگاه"
              className="w-full h-10 desktop:h-12 font-myYekanRegular text-[#222222] desktop:text-[14px] text-xs pr-10 pl-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
            />

            {/* Magnifier Icon as Search Button */}
            <Magnifier
              onClick={handleSearch}
              className={"absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer text-gray-400"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
