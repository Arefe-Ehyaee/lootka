import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import RestaurantHeader from '../restaurant/RestaurantHeader';
import ImageGallery from '../restaurant/ImageGallary';
import NavigationTabs from '../restaurant/NavigationTabs';
import RestaurantInfo from '../restaurant/RestaurantInfo';
import ReviewsSection from '../restaurant/ReveiwSection';
import MapComponent from '../restaurant/MapComponent';
import DeleteButton from './DeleteButton';
import ReactMarkdown from 'react-markdown';
import Footer from './Footer';
import { UseHostelData } from '../hostel/UseHostelData';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const HostelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { hostel, loading, error } = UseHostelData(id);
  const [activeTab, setActiveTab] = useState<string>('overview');

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

  if (error || !hostel) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-myIranSansFaNumBold text-gray-900">Hostel not found</h1>
          <p className="text-gray-600 mt-2">{error}</p>
          <Link to="/hostels" className="text-lootka-green hover:underline mt-4 inline-block">
            Back to Hostels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* hostel Header */}
        <RestaurantHeader restaurant={hostel} />

        {/* Image Gallery */}
        <ImageGallery
          images={hostel.image_names || []}
          restaurantName={hostel.name}
          baseUrl={BASE_URL}
        />

        {/* Navigation Tabs */}
        <NavigationTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Restaurant Information */}
        <RestaurantInfo restaurant={hostel} />
        <div className="mb-6">
          <h2 className="text-xl font-myIranSansFaNumBold mb-4">درباره اقامتگاه</h2>
          <p className="text-gray-700 text-justify leading-relaxed font-myIranSansRegular">
            <ReactMarkdown>{hostel.description}</ReactMarkdown>
          </p>
        </div>


        <div className="flex flex-col md:flex-row justify-between gap-2">

          {/* About Restaurant */}

          {/* Reviews Section */}

        </div>


        {/* Map Component */}
        <MapComponent
          mapUrl={hostel.map_url}
          latitude={hostel.latitude}
          longitude={hostel.longitude}
          name={hostel.name}
        />

        {/* Delete Button */}
        {/* {id && <DeleteButton hostelId={id} />} */}
      </div>

            <Footer />
    </div>
  );
};

export default HostelDetail;