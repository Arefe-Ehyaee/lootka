import { StarIcon, MapPinIcon, ClockIcon, PhoneIcon, GlobeAltIcon, ChatBubbleLeftIcon, CurrencyDollarIcon, ShareIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// StarRating Component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center">
        <div className="flex items-center ml-2">
          {[1, 2, 3, 4, 5].map((star) => {
            // For full star
            if (star <= Math.floor(rating)) {
              return (
                <StarIconSolid key={star} className="h-5 w-5 text-yellow-400" />
              );
            }
            // For half star
            else if (star === Math.ceil(rating) && rating % 1 !== 0) {
              return (
                <div key={star} className="relative h-5 w-5">
                  <StarIcon className="absolute h-5 w-5 text-gray-300" />
                  <div className="absolute overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                    <StarIconSolid className="h-5 w-5 text-yellow-400" />
                  </div>
                </div>
              );
            }
            // For empty star
            else {
              return (
                <StarIcon key={star} className="h-5 w-5 text-gray-300" />
              );
            }
          })}
        </div>
        <span className="font-myIranSansFaNumMedium">{rating}</span>
      </div>
    );
  };
// Main Comment Component
const UserComment = () => {
  const rating = 4.5;

  return (
    <div className="">
      {/* Example Comment Card */}
      <div className="border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 border rounded-full ml-2"
            />
            <div>
              <p className="font-myIranSansMedium">صادق هدایت</p>
            </div>
          </div>

          <StarRating rating={rating} />

        </div>

        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
          منوی شورکولی بسیار کامل است و علاوه بر غذاهای محلی گیلان، گزینه‌های متنوعی برای گیاه‌خواران نیز ارائه می‌شود. غذاهایی نظیر «میرزا قاسمی»، «کوکو»، و «پلا کباب» برای این دسته از مشتریان مناسب هستند.
        </p>

        {/* Review Images */}
        <div className="flex gap-2 mb-3">
          <img src="/path-to-img1.jpg" className="w-24 h-24 rounded-lg object-cover" />
          <img src="/path-to-img2.jpg" className="w-24 h-24 rounded-lg object-cover" />
        </div>
      </div>
    </div>
  );
};

export default UserComment;
