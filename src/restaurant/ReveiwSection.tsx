import React, { useEffect, useRef } from 'react';
import { StarIcon, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import user from "../assets/images/Frame 440.png";

interface Review {
  review_id: string;
  user_id: string | null;
  rate: number;
  comment: string;
  date: string;
}

interface ReviewsSectionProps {
  reviewSummary: string;
  reviews: Review[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-2">
      <img src={user} alt="user" />
      <div className="flex flex-col gap-1">
        <span className="font-myYekanFaNumDemiBold">کاربر سایت</span>
        <div className="flex items-center ml-2">
          {[1, 2, 3, 4, 5].map((star) => {
            if (star <= Math.floor(rating)) {
              return <StarIconSolid key={star} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />;
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
              return <StarIcon key={star} className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviewSummary,
  reviews,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentPage >= totalPages) return; // stop observing if no more pages

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onPageChange(currentPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4">
        <h3 className="text-xl font-myYekanFaNumDemiBold mb-4">نظرات کاربران</h3>

        <p className="text-gray-600 mb-6">{reviewSummary}</p>

        {reviews.length === 0 ? (
          <p className="text-gray-500 font-myYekanFaNumRegular">هنوز نظری ثبت نشده است.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.review_id}
                className="bg-white p-4 rounded-md border border-gray-200"
              >
                <div className="flex justify-between mb-2">
                  <div className="flex items-center mr-3">
                    <StarRating rating={review.rate} />
                  </div>
                </div>
                <p className="text-gray-800 leading-relaxed font-myYekanFaNumRegular">
                  {review.comment}
                </p>
              </div>
            ))}

            {/* Infinite scroll trigger */}
            {currentPage < totalPages && (
              <div ref={loaderRef} className="text-center py-4 text-gray-500">
                در حال بارگذاری...
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hidden md:block w-[409px]"></div>
    </div>
  );
};

export default ReviewsSection;
