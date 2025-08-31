import React, { useRef, useEffect } from "react";
import { Star } from "lucide-react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import user from "../assets/images/Frame 440.png";

// Using placeholder user image since we can't import the original
const userPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23e5e7eb'/%3E%3Cpath d='M20 20c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm0 2c-4.667 0-14 2.333-14 7v3h28v-3c0-4.667-9.333-7-14-7z' fill='%239ca3af'/%3E%3C/svg%3E";

const reviews = [
  {
    id: 1,
    name: "محمد",
    date: "28 مهر 1403",
    rating: 4.5,
    text: "رفتار پرسنل بسیار عالی، کیفیت غذا قابل قبول، کباب ترش بی‌نظیر. سپاس از کادر خوب رستوران.",
    place: "رستوران شورورکولی",
    userImage: userPlaceholder,
    placeImage: "/assets/place1.png",
  },
  {
    id: 2,
    name: "رضا",
    date: "28 مهر 1403",
    rating: 4.5,
    text: "کارکنان حرفه‌ای و خدمات باکیفیت، این هتل را به انتخابی ایده‌آل برای سفرهای خانوادگی یا دونفره تبدیل کرده‌اند.",
    place: "هتل دنسه",
    userImage: userPlaceholder,
    placeImage: "/assets/place2.png",
  },
  {
    id: 3,
    name: "محمد",
    date: "28 مهر 1403",
    rating: 4.5,
    text: "رفتار پرسنل بسیار عالی، کیفیت غذا قابل قبول، کباب ترش بی‌نظیر. سپاس از کادر خوب رستوران.",
    place: "رستوران شورورکولی",
    userImage: userPlaceholder,
    placeImage: "/assets/place1.png",
  },
  {
    id: 4,
    name: "محمد",
    date: "28 مهر 1403",
    rating: 4.5,
    text: "رفتار پرسنل بسیار عالی، کیفیت غذا قابل قبول، کباب ترش بی‌نظیر. سپاس از کادر خوب رستوران.",
    place: "رستوران شورورکولی",
    userImage: userPlaceholder,
    placeImage: "/assets/place1.png",
  },
  {
    id: 6,
    name: "محمد",
    date: "28 مهر 1403",
    rating: 4.5,
    text: "رفتار پرسنل بسیار عالی، کیفیت غذا قابل قبول، کباب ترش بی‌نظیر. سپاس از کادر خوب رستوران.",
    place: "رستوران شورورکولی",
    userImage: userPlaceholder,
    placeImage: "/assets/place1.png",
  },
  {
    id: 7,
    name: "محمد",
    date: "28 مهر 1403",
    rating: 4.5,
    text: "رفتار پرسنل بسیار عالی، کیفیت غذا قابل قبول، کباب ترش بی‌نظیر. سپاس از کادر خوب رستوران.",
    place: "رستوران شورورکولی",
    userImage: userPlaceholder,
    placeImage: "/assets/place1.png",
  },
  {
    id: 8,
    name: "محمد",
    date: "28 مهر 1403",
    rating: 4.5,
    text: "رفتار پرسنل بسیار عالی، کیفیت غذا قابل قبول، کباب ترش بی‌نظیر. سپاس از کادر خوب رستوران.",
    place: "رستوران شورورکولی",
    userImage: userPlaceholder,
    placeImage: "/assets/place1.png",
  },
  {
    id: 9,
    name: "محمد",
    date: "28 مهر 1403",
    rating: 4.5,
    text: "رفتار پرسنل بسیار عالی، کیفیت غذا قابل قبول، کباب ترش بی‌نظیر. سپاس از کادر خوب رستوران.",
    place: "رستوران شورورکولی",
    userImage: userPlaceholder,
    placeImage: "/assets/place1.png",
  },
];

const UserComments: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth < 768 ? 343 + 24 : (343 + 24); // card width + gap
      const cardsToScroll = window.innerWidth < 768 ? 1 : 4; // 1 card on mobile, 4 on desktop
      const scrollAmount = cardWidth * cardsToScroll;
      
      const currentScroll = scrollRef.current.scrollLeft;
      const newScroll = direction === "left" 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
        
      scrollRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  // scroll to end on mount so cards start from right
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  return (
    <section className="py-12 px-6 desktop:px-16 relative">
      <h2 className="text-2xl md:text-3xl font-myYekanDemibold text-center mb-8">
        نظرات کاربران
      </h2>

      {/* arrows */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-12 top-1/2 z-10 hover:text-gray-100 items-center justify-center transform -translate-y-1/2"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-16 top-1/2 z-10 hover:text-gray-100  items-center justify-center transform -translate-y-1/2"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* scrollable container */}
      <div
        ref={scrollRef}
        className="flex flex-row-reverse gap-6 overflow-x-auto scroll-smooth px-4 md:px-12 scrollbar-hide font-myYekanFaNumRegular"
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `
        }} />
        {reviews.map((review) => (
          <div
            key={review.id}
            className="min-w-[343px] w-[343px] h-[250px] rounded-2xl border border-gray-200 p-[16px] flex flex-col justify-between shadow-sm bg-white"
          >
            {/* user + rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user}
                  alt={review.name}
                  className="w-[54px] h-[54px] rounded-full object-cover"
                />
                <div className="text-[14px] flex flex-row items-center gap-[8px]">
                  <p className="text-[#222222]/80">{review.name}</p>
                  <p className="text-[#222222]/50 text-xs">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-[#1BA75E] fill-[#1BA75E]" />
                <span className="text-[#222222]/50">{review.rating}</span>
              </div>
            </div>

            {/* comment */}
            <p className="text-[14px] text-[#222222]/80 flex-1 leading-6 pt-[30px]">
              {review.text}
            </p>

            {/* place */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-[#222222]/80">{review.place}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserComments;