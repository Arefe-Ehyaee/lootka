import React, { useRef, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import toJalali from "../utils/Time";
import user from "../assets/images/Frame 440.png";
import razeghiImg from "../assets/images/Restaurant_Rasht_Razeghi_1.webp";
import shoorecooliImg from "../assets/images/Restaurant_Rasht_ShooreKooli_1.webp"

interface Review {
  id: string | number;
  name: string;
  date: string;
  rate: number;
  comment: string;
  place: string;
  img: string;
}

const UserComments: React.FC = () => {
  // two refs like PopularHostels (mobile & desktop)
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  // scrolling behavior (similar spirit to PopularHostels)
  const scrollMobileNext = () =>
    mobileScrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  const scrollMobilePrev = () =>
    mobileScrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  const scrollDesktopNext = () =>
    desktopScrollRef.current?.scrollBy({ left: -600, behavior: "smooth" });
  const scrollDesktopPrev = () =>
    desktopScrollRef.current?.scrollBy({ left: 600, behavior: "smooth" });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const urls = [
          "https://lootkatrip.ir/api/reviews/place/p_1753957441342_85ca2b46",
          "https://lootkatrip.ir/api/reviews/place/p_1753957437360_bb56f11d",
        ];

        const placeMap: Record<number, { name: string; img: string }> = {
          0: { name: "رستوران رازقی", img: razeghiImg },
          1: { name: "رستوران شورکولی", img: shoorecooliImg },
        };

        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((res) => res.json()));

        const limited = data.flatMap((restaurantReviews, index) =>
          restaurantReviews.slice(0, 4).map((r: any) => ({
            id: r.id || `${index}-${Math.random()}`,
            name: r.user?.name || "کاربر",
            date: r.date || "",
            rate: r.rate || 0,
            comment: r.comment || "",
            place: r.placeName || placeMap[index]?.name || `رستوران ${index + 1}`,
            img: placeMap[index]?.img,
          }))
        );

        setReviews(limited);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-12 px-0 desktop:px-16">
      {/* Header: use same inner padding pattern as PopularHostels so titles align */}
      <div className="flex justify-between items-center mb-4 desktop:px-20 px-[16px]">
        <h2 className="text-xl tablet:text-2xl desktop:text-3xl font-myYekanDemibold text-center">
          نظرات کاربران
        </h2>
      </div>

      {/* Mobile view (no external arrows) */}
      <div className="md:hidden relative font-myYekanFaNumRegular ">
        <div className="px-0 relative">
          <div
            ref={mobileScrollRef}
            className="flex overflow-x-auto pb-6 space-x-6 rtl:space-x-reverse scroll-smooth px-2 scrollbar-hide"
          >
            {/* cards */}
            {reviews.map((review) => (
              <div
                key={review.id}
                className="min-w-[343px] w-[343px] h-[250px] rounded-2xl border border-gray-200 p-[16px] flex flex-col justify-between shadow-sm bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={user}
                      alt="User avatar"
                      className="w-[54px] h-[54px] rounded-full object-cover"
                    />
                    <div className="text-[14px] flex flex-row items-center gap-[8px]">
                      <p className="text-[#222222]/80">{review.name}</p>
                      <p className="text-[#222222]/50 text-xs">{toJalali(review.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-[#1BA75E] fill-[#1BA75E]" />
                    <span className="text-[#222222]/50">{review.rate}</span>
                  </div>
                </div>

                <p className="text-[14px] font-myYekanRegular text-[#222222]/80 flex-1 leading-6 pt-[20px] line-clamp-4 text-justify">
                  {review.comment}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    {review.img && (
                      <img
                        src={review.img}
                        alt={review.place}
                        className="w-6 h-6 rounded rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm text-[#222222]/80 font-myYekanFaNumDemiBold">
                      {review.place}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop view: arrows + scroll container (structure mirrors PopularHostels) */}
      <div className="hidden md:block relative px-12 font-myYekanFaNumRegular ">
        <div className="relative flex items-center">
          <button
            onClick={scrollDesktopPrev}
            className="z-10 w-10 h-10 flex items-center justify-center"
            aria-label="prev reviews"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          <div
            ref={desktopScrollRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide space-x-6 rtl:space-x-reverse scroll-smooth flex-1 px-2"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="min-w-[343px] w-[343px] h-[250px] rounded-2xl border border-gray-200 p-[16px] flex flex-col justify-between shadow-sm bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={user}
                      alt="User avatar"
                      className="w-[54px] h-[54px] rounded-full object-cover"
                    />
                    <div className="text-[14px] flex flex-row items-center gap-[8px]">
                      <p className="text-[#222222]/80">{review.name}</p>
                      <p className="text-[#222222]/50 text-xs">{toJalali(review.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-[#1BA75E] fill-[#1BA75E]" />
                    <span className="text-[#222222]/50">{review.rate}</span>
                  </div>
                </div>

                <p className="text-[14px] text-[#222222]/80 flex-1 leading-6 pt-[30px] line-clamp-4 text-justify">
                  {review.comment}
                </p>


                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    {review.img && (
                      <img
                        src={review.img}
                        alt={review.place}
                        className="w-6 h-6 rounded rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm text-[#222222]/80 font-myYekanFaNumDemiBold">
                      {review.place}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <button
            onClick={scrollDesktopNext}
            className="z-10 w-10 h-10 flex items-center justify-center"
            aria-label="next reviews"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* hide native scrollbar the same way as PopularHostels */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default UserComments;
