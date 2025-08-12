// Optional: Create a reusable RatingCircles component
// Save this as a new file: src/components/RatingCircles.tsx

import React from 'react';

interface RatingCirclesProps {
  rating: number | undefined;
  showValue?: boolean;
}

const RatingCircles: React.FC<RatingCirclesProps> = ({ rating, showValue = true }) => {
  const ratingValue = rating || 0;
  
  return (
    <div className="flex items-center">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => {
          if (i <= Math.floor(ratingValue)) {
            // Full circle for whole numbers
            return <div key={i} className="h-3 w-3 bg-lootka-blue rounded-full ml-1" />;
          } else if (i === Math.ceil(ratingValue) && ratingValue % 1 !== 0) {
            // Partial circle for decimal part - LEFT TO RIGHT direction
            const decimalPart = ratingValue % 1;
            return (
              <div key={i} className="h-3 w-3 relative ml-1">
                {/* Background circle (empty) */}
                <div className="absolute inset-0 bg-gray-300 rounded-full"></div>
                {/* Foreground circle (filled) with clip-path for partial filling - LTR direction */}
                <div
                  className="absolute inset-0 bg-lootka-blue rounded-full"
                  style={{
                    clipPath: `inset(0 ${100 - (decimalPart * 100)}% 0 0)`
                  }}
                ></div>
              </div>
            );
          } else {
            // Empty circle
            return <div key={i} className="h-3 w-3 bg-gray-300 rounded-full ml-1" />;
          }
        })}
      </div>
      {showValue && <span className='ml-1'>{ratingValue}</span>}
    </div>
  );
};

export default RatingCircles;