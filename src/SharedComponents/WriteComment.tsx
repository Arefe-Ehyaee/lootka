import React, { useState } from "react";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import userComment from "../assets/icons/User Speak.svg";
import letter from "../assets/icons/Letter.svg";

interface WriteCommentProps {
  className?: string;
  error?: boolean;
}

const WriteComment: React.FC<WriteCommentProps> = ({ className = "", error = false }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="w-full mt-[16px]">
      {/* Name and Email Row */}
      <div className="flex flex-row gap-[16px]">
        {/* Name Input */}
        <div className="relative mb-[16px] w-full">
          <input
            type="text"
            id="name"
            name="name"
            className={`bg-[#F6FDFE] w-full h-[64px] px-8 pr-[56px] rounded-lg 
              font-myYekanFaNumRegular text-[14px] font-normal font-isf 
              placeholder-grey-400 placeholder-start
              ${className} ${error ? "border border-red-500" : ""}`}
            dir="rtl"
            placeholder="نام و نام خانوادگی"
          />
          <img
            src={userComment}
            alt="icon"
            className="h-[36px] w-[36px] absolute top-1/2 right-3 transform -translate-y-1/2"
          />
        </div>

        {/* Email Input */}
        <div className="relative mb-[16px] w-full">
          <input
            type="email"
            id="email"
            name="email"
            className={`bg-[#F6FDFE] w-full h-[64px] px-8 pr-[56px] rounded-lg 
              font-myYekanFaNumRegular text-[14px] font-normal font-isf 
              placeholder-grey-400 placeholder-start
              ${className} ${error ? "border border-red-500" : ""}`}
            dir="rtl"
            placeholder="ایمیل"
          />
          <img
            src={letter}
            alt="icon"
            className="h-[36px] w-[36px] absolute top-1/2 right-3 transform -translate-y-1/2"
          />
        </div>
      </div>

      {/* Comment Textarea */}
      <div className="relative mb-4 w-full">
        <textarea
          id="comment"
          name="comment"
          rows={5}
          className={`bg-[#F6FDFE] w-full h-[180px] px-8 py-4 pr-[16px] rounded-lg resize-none
            font-myYekanFaNumRegular text-[14px] font-normal font-isf 
            placeholder-grey-400 placeholder-start
            ${className} ${error ? "border border-red-500" : ""}`}
          dir="rtl"
          placeholder="درباره تجربه خود بنویسید..."
        />

        {/* Bottom-left actions (Stars + Button) */}
        <div className="absolute bottom-3 left-3 flex items-center gap-4">
          {/* Star Rating */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                {star <= rating ? (
                  <StarSolid className="h-6 w-6 text-yellow-400" />
                ) : (
                  <StarOutline className="h-6 w-6 text-gray-400 hover:text-yellow-400" />
                )}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#4793A8] hover:bg-[#387487] text-white text-sm font-myYekanFaNumDemiBold px-4 py-2 rounded-full"
          >
            ثبت دیدگاه
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteComment;
