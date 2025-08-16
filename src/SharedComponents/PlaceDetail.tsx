import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import RestaurantHeader from '../restaurant/RestaurantHeader';
import NavigationTabs from '../restaurant/NavigationTabs';
import RestaurantInfo from '../restaurant/RestaurantInfo';
import MapComponent from '../restaurant/MapComponent';
import DeleteButton from './DeleteButton';
import { usePlaceData } from '../restaurant/UseRestaurantData';
import ReactMarkdown from 'react-markdown';
import Footer from './Footer';
import ReviewsSection from '../restaurant/ReveiwSection';

export interface Review {
  review_id: string;
  user_id: string | null;
  rate: number;
  comment: string;
  date: string;
}

export interface Image {
  image_id: string;
  filename: string;
  description?: string | null;
}

const BASE_URL = "http://91.212.174.72:2000";

interface ImageGalleryProps {
  images: Image[];
  restaurantName: string;
  baseUrl: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, restaurantName, baseUrl }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
      {images.map((img) => (
        <img
          key={img.image_id}
          src={`${baseUrl}/images/${img.image_id}`}
          alt={img.description || restaurantName}
          className="w-full h-64 object-cover rounded-lg shadow-md"
          loading="lazy"
        />
      ))}
    </div>
  );
};

const PlaceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { restaurant, loading, error } = usePlaceData(id);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewError, setReviewError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const reviewsPerPage = 4;

  useEffect(() => {
    if (!id) return;

    fetch(`${BASE_URL}/reviews/place/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then((data) => setReviews(data))
      .catch((err) => {
        console.error(err);
        setReviewError("خطا در دریافت نظرات کاربران.");
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lootka-green"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-myIranSansFaNumBold text-gray-900">Restaurant not found</h1>
          <p className="text-gray-600 mt-2">{error}</p>
          <Link to="/restaurant" className="text-lootka-green hover:underline mt-4 inline-block">
            Back to Restaurants
          </Link>
        </div>
      </div>
    );
  }

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mt-16">
        <RestaurantHeader restaurant={restaurant} />

        <ImageGallery
          images={restaurant.images || []}
          restaurantName={restaurant.name}
          baseUrl={BASE_URL}
        />

        <NavigationTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <RestaurantInfo restaurant={restaurant} />

        <div className="mb-6">
          <h2 className="text-xl font-myIranSansFaNumBold mb-4">
            {restaurant.sub_category === "رستوران" && "درباره رستوران"}
            {restaurant.sub_category === "اقامتگاه" && "درباره اقامتگاه"}
            {restaurant.sub_category === "جای دیدنی" && "درباره جای دیدنی"}
          </h2>
          <p className="text-gray-700 text-justify leading-relaxed font-myIranSansRegular">
            <ReactMarkdown>{restaurant.description}</ReactMarkdown>
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-2">
          <ReviewsSection
            reviewSummary={restaurant.review_summary}
            reviews={currentReviews}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        <MapComponent
          mapUrl={restaurant.map_url}
          latitude={restaurant.latitude}
          longitude={restaurant.longitude}
          name={restaurant.name}
        />
      </div>

      {id && <DeleteButton hostelId={id} />} 
      <Footer />
    </div>
  );
};

export default PlaceDetail;
