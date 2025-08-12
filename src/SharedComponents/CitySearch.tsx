import { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const CitySearch = () => {

    const cities = ['رشت', 'بندرانزلی', 'ماسوله', 'لاهیجان'];
    const [cityIndex, setCityIndex] = useState(0);
    const [searchInput, setSearchInput] = useState('');

    return (
        <div className="hidden md:flex items-center flex-grow justify-center mx-10">
            <div className="relative w-full">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl py-2 px-4 pr-4 text-right text-black caret-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-lootka-green"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />

                {!searchInput && (
                    <div className="absolute right-4 top-2.5 text-gray-400 text-sm pointer-events-none h-6 overflow-hidden flex gap-1">
                        <span>جستجو شهر</span>
                        <div className="relative h-6 w-auto overflow-hidden">
                            <div
                                key={cityIndex}
                                className="animate-slide-up inline-block"
                            >
                                {cities[cityIndex]}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CitySearch;