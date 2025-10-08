import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import NoImg from "../assets/images/no-image-icon-23485.png";
import { useQuery } from "@tanstack/react-query";
import PlaceCard from "./PlaceCard"; 

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Hostel {
  id: string;
  name: string;
  Rate: number;
  ImgName: string;
  Category?: string;
  OurDescription: string;
  UsersDescription?: string;
  rating?: number;
  reviews?: number;
  address?: string;
  opening_hours?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  Menu?: any[];
  food_types?: string[];
  subCategory?: string[];
  mealTime?: string[];
  Cuisine?: string;
  price_range?: string;
  latitude?: number;
  longitude?: number;
  map_url: string;
  review_summary: string;
  description: string;
}

interface BackendResponse {
  data: any[];
  total_items: number;
  total_pages: number;
}

type CategoryType = "همه" | "فست فود" | "غذای محلی" | "کافه" | "فود تراک";

const categories: CategoryType[] = ["همه", "فست فود", "غذای محلی", "کافه", "فود تراک"];
const pageSize = 10;

// ✅ Fetch only the first image
const fetchFirstImageForHostel = async (placeId: string): Promise<string> => {
  try {
    const res = await fetch(`${BASE_URL}/entity_images/place/${placeId}`);
    if (!res.ok) return "";

    const imageMeta = await res.json();
    if (!imageMeta.length) return "";

    const firstImgId = imageMeta[0].image_id;
    const response = await fetch(`${BASE_URL}/images/${firstImgId}`);
    if (!response.ok) return "";

    return `${BASE_URL}/images/${firstImgId}`;
  } catch (error) {
    console.error("Error fetching first image:", error);
    return "";
  }
};

// Fetch hostels with only first image
const fetchHostels = async (): Promise<Hostel[]> => {
  const res = await fetch(
    `${BASE_URL}/places/?page=1&limit=${pageSize}&sub_category=${encodeURIComponent(
      "اقامتگاه"
    )}`
  );
  const data: BackendResponse = await res.json();

  return Promise.all(
    data.data.map(async (item) => {
      const firstImage = await fetchFirstImageForHostel(item.place_id);

      const randomCategory =
        categories[Math.floor(Math.random() * (categories.length - 1)) + 1];

      return {
        id: item.place_id,
        name: item.name,
        Rate: item.rate || 0,
        ImgName: firstImage || "", // only first image
        Category: item.food_types?.[0] || randomCategory,
        OurDescription: item.OurDescription,
        UsersDescription: item.UsersDescription,
        rating: item.rate,
        reviews: item.reviews,
        address: item.address,
        opening_hours: item.opening_hours,
        phone: item.phone,
        website: item.website,
        instagram: item.instagram,
        Menu: item.Menu,
        food_types: item.food_types,
        subCategory: item.subCategory,
        mealTime: item.mealTime,
        Cuisine: item.Cuisine,
        price_range: item.price_range,
        latitude: item.latitude,
        longitude: item.longitude,
        map_url: item.map_url,
        review_summary: item.review_summary,
        description: item.description,
      };
    })
  );
};

const PopularHostels: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("همه");
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  const getImageUrl = (img: string) => (img ? img : NoImg);

  const { data: hostels = [], isLoading, error } = useQuery<Hostel[], Error>({
    queryKey: ["hostels"],
    queryFn: fetchHostels,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const filteredHostels = useMemo(() => {
    return selectedCategory === "همه"
      ? hostels
      : hostels.filter((r) => r.Category === selectedCategory);
  }, [selectedCategory, hostels]);

  useEffect(() => {
    mobileScrollRef.current?.scrollTo({ left: 0 });
    desktopScrollRef.current?.scrollTo({ left: 0 });
  }, [selectedCategory]);

  const scrollDesktopNext = () =>
    desktopScrollRef.current?.scrollBy({ left: -600, behavior: "smooth" });
  const scrollDesktopPrev = () =>
    desktopScrollRef.current?.scrollBy({ left: 600, behavior: "smooth" });

  if (isLoading)
    return <div className="text-center py-20">در حال بارگذاری...</div>;
  if (error)
    return <div className="text-red-500 text-center">{error.message}</div>;

  return (
    <div className="py-12 px-0 desktop:px-16">
      <div className="flex justify-between items-center mb-4 desktop:px-20 px-[16px]">
        <h2 className="text-xl tablet:text-2xl desktop:text-3xl font-myYekanDemibold">
          اقامتگاه بومگردی
        </h2>
        <Link
          to="/hostels"
          className="flex flex-row gap-1 items-center text-sm text-gray-800 font-myYekanRegular"
        >
          مشاهده همه
          <ChevronLeftIcon className="h-4 w-4" />
        </Link>
      </div>

      {/* Mobile */}
      <div className="md:hidden relative px-0">
        <div
          ref={mobileScrollRef}
          className="flex overflow-x-auto pb-6 space-x-2 rtl:space-x-reverse scroll-smooth px-2 scrollbar-hide"
        >
          {filteredHostels.map((h) => (
            <PlaceCard
              key={h.id}
              place={h}
              getImageUrl={getImageUrl}
              type="attraction"
            />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block relative px-12">
        <div className="relative flex items-center">
          <button
            onClick={scrollDesktopPrev}
            className="z-10 w-10 h-10 flex items-center justify-center"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          <div
            ref={desktopScrollRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide space-x-2 rtl:space-x-reverse scroll-smooth flex-1"
          >
            {filteredHostels.map((h) => (
              <PlaceCard
                key={h.id}
                place={h}
                getImageUrl={getImageUrl}
                type="attraction"
              />
            ))}
          </div>

          <button
            onClick={scrollDesktopNext}
            className="z-10 w-10 h-10 flex items-center justify-center"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default PopularHostels;
